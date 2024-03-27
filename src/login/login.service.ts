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

  async login(data: any) : Promise<UserDocument> {
    // 만약 가입된 유저라면 해당 유저를 반환
    let user = await this.userModel.findOne({ email: data.kakao_account.email, socialType: 'kakao' });
    if (!user) {
    user = new this.userModel({
      email: data.kakao_account.email,
      nickname: data.kakao_account.profile.nickname,
      socialType: 'kakao',
    });
    await user.save();

    const _idStr = user._id.toString(); // ObjectId를 문자열로 변환
    const nicknameWithId = `${user.nickname}#${_idStr.slice(-5)}`; // 뒤에서 5글자 추출하여 닉네임에 추가
    user.nickname = nicknameWithId; // 닉네임 업데이트
    await user.save(); // 변경된 닉네임으로 다시 저장
  }
  return user;
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
    return this.loginn(userData);  
  }
    async loginn(userData : any) : Promise<UserDocument> {
    // 네이버 유저 정보를 사용하여 유저 생성 또는 조회
    let user = await this.userModel.findOne({ email: userData.response.email, socialType: 'naver' });
    if (!user) {
      user = new this.userModel({
        email: userData.response.email,
        nickname: userData.response.nickname,
        socialType: 'naver',
      });
      await user.save();

      const _idStr = user._id.toString(); // ObjectId를 문자열로 변환
      const nicknameWithId = `${user.nickname}#${_idStr.slice(-5)}`; // 뒤에서 5글자 추출하여 닉네임에 추가
      user.nickname = nicknameWithId; // 닉네임 업데이트
      await user.save(); // 변경된 닉네임으로 다시 저장
    }
    return user;
  }

  async googleLogin(code: string, clientId: string, clientSecret: string, redirectUri: string): Promise<UserDocument> {
    const tokenConfig = {
      code: code,
      client_id: clientId,
      client_secret: clientSecret,
      redirect_uri: redirectUri,
      grant_type: 'authorization_code',
    };
    const tokenParams = new URLSearchParams(tokenConfig).toString();
    const tokenHeaders = {
      'Content-type': 'application/x-www-form-urlencoded',
    };
    const tokenUrl = 'https://oauth2.googleapis.com/token';

    const user = await axios.post(tokenUrl, tokenParams, { headers: tokenHeaders }).then(async (res) => {
      const userInfoUrl = 'https://www.googleapis.com/oauth2/v2/userinfo';
      const userInfoHeaders = {
        Authorization: `Bearer ${res.data.access_token}`,
      };
      const { data } = await firstValueFrom(
        from(axios.get(userInfoUrl, { headers: userInfoHeaders })),
      );
      return data;
    });

    return this.logins(user);
  }

  async logins(data: any): Promise<UserDocument> {
    // 만약 가입된 유저라면 해당 유저를 반환
    let user = await this.userModel.findOne({ email: data.email, socialType:'google' });
    if (!user) {
    // Google에서 제공하는 사용자 정보를 기반으로 새로운 유저 데이터 생성
    user = new this.userModel({
      email: data.email,
      nickname: data.name,
      socialType: 'google',
    });
    await user.save();

    const _idStr = user._id.toString(); // ObjectId를 문자열로 변환
    const nicknameWithId = `${user.nickname}#${_idStr.slice(-5)}`; // 뒤에서 5글자 추출하여 닉네임에 추가
    user.nickname = nicknameWithId; // 닉네임 업데이트
    await user.save(); // 변경된 닉네임으로 다시 저장
  }
  return user;
}

  async getUserInfo(token: string): Promise<UserDocument> {
    return this.userModel.findOne({ _id: token });
  }
}


