import { Controller, Get, Header, Query, Res } from '@nestjs/common';
import { Response } from 'express'
import { LoginService } from './login.service';

@Controller('login')
export class LoginController {
  @Get('kakao-login-page')
  @Header('Content-Type', 'text/html')
  async kakaoRedirect(@Res() res:Response): Promise<void> {
    const Rest_api_key='676fceb5e807f864a04f35f7f7cd403c' //REST API KEY
    const redirect_uri = 'http://localhost:3000/kakaoOauth' //Redirect URI
    
    const url = `https://kauth.kakao.com/oauth/authorize?client_id=${Rest_api_key}&redirect_uri=${redirect_uri}&response_type=code`;
    res.redirect(url);
  }
  // @Get('kakao')
  // async getKakaoInfo(@Query() query: { code }) {
  //   const apikey = '676fceb5e807f864a04f35f7f7cd403c';
  //   const redirectUri = 'http://localhost:3000/kakaoOauth';
  //   await LoginService.kakaoLogin(apikey, redirectUri, query.code);
  // }
}
