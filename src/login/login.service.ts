import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class LoginService {
  // async kakaoLogin(apikey: string, redirectUri: string, code: string) {
  //   const config = {
  //     grant_type: 'authorization_code',
  //     client_id: apikey,
  //     redirect_uri: redirectUri,
  //     code,
  //   };
  //   const params = new URLSearchParams(config).toString();
  // 	const tokenHeaders = {
  //     'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
  //   };
  //   const tokenUrl = `https://kauth.kakao.com/oauth/token?${params}`;
    

  //   const res = await firstValueFrom(
  //     this.http.post(tokenUrl, '', { headers: tokenHeaders }),
  //   );
  //   console.log(res.data);
  
  	// url을 다음과 같이 바꾸면 아래의 요청방식 3가지 중 하나로 요청할 수 있다.
	// const tokenUrl = `https://kauth.kakao.com/oauth/token?`  
  
	//아래의 3가지 방법은 2번째 인자로 ''(빈문자열)이 아닌 params를 받는다.  
    //2번 const res = await firstValueFrom(
    // this.http.post(tokenUrl, params, { headers: tokenHeaders }),
    // );

    //3번 const res = await this.http.post(tokenUrl, params, { headers: tokenHeaders }).toPromise()

    //4번 await axios.post(tokenUrl, params, { headers: tokenHeaders }).then((res) => {
    //   console.log(res.data);
    // });
}

