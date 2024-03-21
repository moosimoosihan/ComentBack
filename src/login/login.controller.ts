import { Body, Controller, Get, Header, HttpStatus, Post, Query, Req, Res } from '@nestjs/common';
import { Response } from 'express';
import { LoginService } from './login.service';

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

  @Get('naver-login-page')
  async naverRedirect(@Res() res: Response): Promise<void> {
    const client_id = 'AlNqH1WFQQhDt2rK1Qb8'; // 네이버 클라이언트 ID
    const client_secret = 'rX6nXDiBnl'; // 네이버 클라이언트 시크릿
    const redirect_uri_naver = 'http://localhost:8000/login/naverOath'; // 네이버 Redirect URI
    const naver_state_key = 'sATQj8Yv9yIXYLdAOa';

    const url = `https://nid.naver.com/oauth2.0/authorize?client_id=${client_id}&response_type=code&redirect_uri=${redirect_uri_naver}&state=${naver_state_key}`;
    res.redirect(url);
  }

  @Get('naverOath')
  async getNaverInfo(@Query('code') code: string, @Res() res: Response) {
    const clientId = 'AlNqH1WFQQhDt2rK1Qb8';
    const clientSecret = 'rX6nXDiBnl';
    try {
      // 네이버에서 받은 인증 코드로 처리를 진행합니다.
      const user = await this.loginService.naverLogin(clientId, clientSecret, code); // 코드 전달 추가
      // 성공 시 사용자 정보를 클라이언트에게 반환
      res.cookie('jwt', user._id, { httpOnly: false });
      res.location('http://localhost:3000/');
      res.status(HttpStatus.FOUND).send();
    } catch (error) {
      // 실패 시 적절한 에러 메시지를 클라이언트에게 반환
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: '네이버 로그인에 실패했습니다.' });
    }
}


  @Post('userInfo')
  async getUserInfo(@Req() req, @Res() res:Response) {
    const user = await this.loginService.getUserInfo(req.body.token);
    res.send(user);
  }
}