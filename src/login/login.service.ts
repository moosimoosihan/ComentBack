import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import axios from 'axios';
import { Model } from 'mongoose';
import { firstValueFrom, from } from 'rxjs';
import { User, UserDocument } from 'src/feed/schemas/user.schema';

@Injectable()
export class LoginService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}
  async kakaoLogin(apikey: string, code: string): Promise<UserDocument>{
    const config = {
      grant_type: 'authorization_code',
      client_id: apikey,
      code,
    };
    const params = new URLSearchParams(config).toString();
    const tokenHeaders = {
      'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
    };
    const tokenUrl = `https://kauth.kakao.com/oauth/token?`

    const user =await axios.post(tokenUrl, params, { headers: tokenHeaders }).then(async (res) => {
      const userInfoUrl = `https://kapi.kakao.com/v2/user/me`;
      const userInfoHeaders = {
        Authorization: `Bearer ${res.data.access_token}`,
      };
      const { data } = await firstValueFrom(
        from(axios.get(userInfoUrl, { headers: userInfoHeaders })),
      );
      return data;
    });
    return this.login(user);
  }
  async login(data: any) : Promise<UserDocument> {
    if(this.userModel.findOne({ email: data.kakao_account.email, socialType: 'kakao'})) {
      return this.userModel.findOne({ email: data.kakao_account.email, socialType: 'kakao'});
    } else {
      const user = new this.userModel({
        email: data.kakao_account.email,
        nickname: data.kakao_account.profile.nickname,
        socialType: 'kakao',
      });
      return user.save();
    }
  }
}

