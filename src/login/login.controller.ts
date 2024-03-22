import { Body, Controller, Get, Header, HttpStatus, Post, Query, Req, Res } from '@nestjs/common';
import { Response } from 'express';
import { LoginService } from './login.service';
import { ConfigService } from '@nestjs/config';

@Controller('login')
export class LoginController {
  constructor(private readonly loginService: LoginService,
    private readonly configService: ConfigService) { }

  @Get('kakao-login-page')
  @Header('Content-Type', 'text/html')
  async kakaoRedirect(@Res() res: Response): Promise<void> {
    const Rest_api_key = this.configService.get('KAKAO_CLIENT_ID'); //REST API KEY
    const redirect_uri = 'http://localhost:8000/login/kakao' //Redirect URI

    const url = `https://kauth.kakao.com/oauth/authorize?client_id=${Rest_api_key}&redirect_uri=${redirect_uri}&response_type=code`;
    res.redirect(url);
  }
  @Get('kakao')
  async getKakaoInfo(@Query() query: { code }, @Res() res: Response) {
    const apikey = this.configService.get('KAKAO_CLIENT_ID');
    const user = await this.loginService.kakaoLogin(apikey, query.code);
    res.cookie('jwt', user._id, { httpOnly: false });
    res.location('http://localhost:3000/');
    res.status(HttpStatus.FOUND).send();
  }

  @Get('naver-login-page')
  async naverRedirect(@Res() res: Response): Promise<void> {
    const client_id = this.configService.get('NAVER_CLIENT_ID'); // 네이버 클라이언트 ID
    const redirect_uri_naver = 'http://localhost:8000/login/naverOath'; // 네이버 Redirect URI
    const naver_state_key = 'sATQj8Yv9yIXYLdAOa';

    const url = `https://nid.naver.com/oauth2.0/authorize?client_id=${client_id}&response_type=code&redirect_uri=${redirect_uri_naver}&state=${naver_state_key}`;
    res.redirect(url);
  }

  @Get('naverOath')
  async getNaverInfo(@Query('code') code: string, @Res() res: Response) {
    const clientId = this.configService.get('NAVER_CLIENT_ID');
    const clientSecret = this.configService.get('NAVER_CLIENT_SECTRET');
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

@Get('google-login-page')
@Header('Content-Type', 'text/html')
async googleRedirect(@Res() res: Response): Promise<void> {
  const client_id = this.configService.get('GOOGLE_CLIENT_ID');
  const redirect_uri = 'http://localhost:8000/login/googleOath'; // Redirect URI

  // Google OAuth 인증 페이지로 리다이렉트합니다.
  const url = `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&scope=email profile&client_id=${client_id}&redirect_uri=${redirect_uri}`;
  res.redirect(url);
}

@Get('googleOath')
async getGoogleOAuthInfo(@Query('code') code: string, @Res() res: Response) {
  const client_id = this.configService.get('GOOGLE_CLIENT_ID');
  const client_secret = this.configService.get('GOOGLE_CLIENT_SECRET');
  const redirect_uri = 'http://localhost:8000/login/googleOath';

  try {
    const user = await this.loginService.googleLogin(code, client_id, client_secret, redirect_uri);
    res.cookie('jwt', user._id, { httpOnly: false }); // httpOnly를 true로 설정하여 XSS 공격을 방지합니다.
    res.redirect('http://localhost:3000/'); // 사용자를 메인 페이지로 리다이렉트합니다.
    res.status(HttpStatus.FOUND).send();
  } catch (error) {
    console.error(error);
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).send();
  }
}

  @Post('userInfo')
  async getUserInfo(@Req() req, @Res() res: Response) {
    const user = await this.loginService.getUserInfo(req.body.token);
    res.send(user);
  }

  @Get('userInfo/:user_id')
  async getUserInfoById(@Req() req, @Res() res:Response) {
    const user = await this.loginService.getUserInfo(req.params.user_id);
    res.send(user);
  }
}
