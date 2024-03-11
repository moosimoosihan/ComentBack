import { Controller, Get, Header, Query, Res } from '@nestjs/common';
import { Response } from 'express'
import { LoginService } from './login.service';

@Controller('login')
export class LoginController {
  @Get('kakao-login-page')
  @Header('Content-Type', 'text/html')
  async kakaoRedirect(@Res() res:Response): Promise<void> {
    const Rest_api_key='b18a55ea373df95fa3136d22d2e3fa7f' //REST API KEY
    const redirect_uri = 'http://localhost:8000/login/kakao' //Redirect URI
    
    const url = `https://kauth.kakao.com/oauth/authorize?client_id=${Rest_api_key}&redirect_uri=${redirect_uri}&response_type=code`;
    res.redirect(url);
  }
  @Get('kakao')
  async getKakaoInfo(@Query() query: { code }) {
    const apikey = 'b18a55ea373df95fa3136d22d2e3fa7f';
    const redirectUri = 'http://localhost:8000/login/kakao';
    await LoginService.kakaoLogin(apikey, redirectUri, query.code);
  }
}
