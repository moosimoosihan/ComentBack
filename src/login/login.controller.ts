import { Body, Controller, Get, Header, HttpStatus, Post, Query, Req, Res } from '@nestjs/common';
import { Response } from 'express';
import { LoginService } from './login.service';
import { userInfo } from 'os';

@Controller('login')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Get('kakao-login-page')
  @Header('Content-Type', 'text/html')
  async kakaoRedirect(@Res() res:Response): Promise<void> {
    const Rest_api_key='b18a55ea373df95fa3136d22d2e3fa7f' //REST API KEY
    const redirect_uri = 'http://localhost:8000/login/kakao' //Redirect URI
    
    const url = `https://kauth.kakao.com/oauth/authorize?client_id=${Rest_api_key}&redirect_uri=${redirect_uri}&response_type=code`;
    res.redirect(url);
  }
  @Get('kakao')
  async getKakaoInfo(@Query() query: { code }, @Res() res:Response) {
    const apikey = 'b18a55ea373df95fa3136d22d2e3fa7f';
    const user = await this.loginService.kakaoLogin(apikey, query.code);
    res.cookie('jwt', user._id, { httpOnly: false });
    res.location('http://localhost:3000/');
    res.status(HttpStatus.FOUND).send();
  }

  @Post('userInfo')
  async getUserInfo(@Req() req, @Res() res:Response) {
    const user = await this.loginService.getUserInfo(req.body.token);
    res.send(user);
  }

  @Get('userInfo/:user_id')
  async getUserInfoById(@Req() req, @Res() res:Response) {
    const user = await this.loginService.getUserInfo(req.params.user_id);
    res.send(user);
  }
}
