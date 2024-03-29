import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { firstValueFrom, from } from 'rxjs';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../schemas/user.schema';

@Injectable()
export class LoginService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async kakaoLogin(apikey: string, code: string): Promise<UserDocument> {
    // 카카오 OAuth 인증을 위한 설정
    const config = {
      grant_type: 'authorization_code',
      client_id: apikey,
      code,
    };
    const params = new URLSearchParams(config).toString();
    const tokenHeaders = {
      'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
    };
    const tokenUrl = `https://kauth.kakao.com/oauth/token`;

    // 카카오로부터 액세스 토큰 요청
    const response = await axios.post(tokenUrl, params, { headers: tokenHeaders });
    const accessToken = response.data.access_token;

    // 액세스 토큰을 사용하여 카카오 유저 정보 요청
    const userInfoUrl = `https://kapi.kakao.com/v2/user/me`;
    const userInfoHeaders = {
      Authorization: `Bearer ${accessToken}`,
    };
    const { data } = await firstValueFrom(from(axios.get(userInfoUrl, { headers: userInfoHeaders })));

    return this.login(data);
  }

  async naverLogin(clientId: string, clientSecret: string, code: string): Promise<UserDocument> {
    // 네이버 OAuth 인증을 위한 설정
   const config = {
      grant_type: 'authorization_code',
      client_id: clientId,
      client_secret: clientSecret,
      code,
    };
    const params = new URLSearchParams(config).toString();
    const tokenHeaders = {
      'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
    };
    const tokenUrl = `https://nid.naver.com/oauth2.0/token`;
    

    // 네이버로부터 액세스 토큰 요청
    const response = await axios.post(tokenUrl, params, { headers: tokenHeaders });
    const accessToken = response.data.access_token;

    // 액세스 토큰을 사용하여 네이버 유저 정보 요청
    const userInfoUrl = 'https://openapi.naver.com/v1/nid/me';
    const userInfoHeaders = {
      Authorization: `Bearer ${accessToken}`,
    };
    const userInfoResponse = await axios.get(userInfoUrl, { headers: userInfoHeaders });
    const userData = userInfoResponse.data;

    // 네이버 유저 정보를 사용하여 유저 생성 또는 조회
    let user = await this.userModel.findOne({ email: userData.response.email });
    if (!user) {
      user = new this.userModel({
        email: userData.response.email,
        nickname: userData.response.nickname,
        socialType: 'naver',
      });
      await user.save();
      console.log(user)
    }
    return user;
  }

  async login(data: any): Promise<UserDocument> {
    // 만약 가입된 유저라면 해당 유저를 반환
    let user = await this.userModel.findOne({ email: data.kakao_account?.email || data.response.email });
    if (user) return user;

    // 유저가 가입되지 않았다면 새로운 유저를 생성하여 반환
    user = new this.userModel({
      email: data.kakao_account?.email || data.response.email,
      nickname: data.kakao_account?.profile.nickname || data.response.nickname,
      socialType: data.kakao_account ? 'kakao' : 'naver',
    });
    return user.save();
  }

  async getUserInfo(token: string): Promise<UserDocument> {
    return this.userModel.findOne({ _id: token });
  }
}


