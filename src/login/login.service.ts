import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import axios from 'axios';
import { Model } from 'mongoose';
import { firstValueFrom, from } from 'rxjs';
import { User, UserDocument } from 'src/feed/schemas/user.schema';

@Injectable()
export class LoginService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}
  async kakaoLogin(apikey: string, redirectUri: string, code: string) {
    const config = {
      grant_type: 'authorization_code',
      client_id: apikey,
      redirect_uri: redirectUri,
      code,
    };
    const params = new URLSearchParams(config).toString();
    const tokenHeaders = {
      'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
    };
    const tokenUrl = `https://kauth.kakao.com/oauth/token?`

    await axios.post(tokenUrl, params, { headers: tokenHeaders }).then(async (res) => {
      const userInfoUrl = `https://kapi.kakao.com/v2/user/me`;
      const userInfoHeaders = {
        Authorization: `Bearer ${res.data.access_token}`,
      };
      const { data } = await firstValueFrom(
        from(axios.get(userInfoUrl, { headers: userInfoHeaders })),
      );
      this.login(data);
    });
  }
  async login(data: any) {
    if(this.userModel.findOne({ email: data.kakao_account.email, socialType: 'kakao'})) {
      this.userModel.findOne({ email: data.kakao_account.email, socialType: 'kakao'});
    } else {
      const user = new this.userModel({
        email: data.kakao_account.email,
        nickname: data.kakao_account.profile.nickname,
        socialType: 'kakao',
      });
      user.save();
    }
  }
}

