'use client';

import Image from 'next/image';

const loginView = () => {
  const kakaoLogin = async () => {
    const url = 'https://kauth.kakao.com/oauth/authorize';
    const response_type = 'code';
    const kakaoURL = `${url}?client_id=${process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URL}&response_type=${response_type}`;

    window.location.assign(kakaoURL);
  };

  const googleLogin = () => {
    const url = 'https://accounts.google.com/o/oauth2/v2/auth';
    const response_type = 'code';
    const scope = 'https://www.googleapis.com/auth/userinfo.email';
    const access_type = 'offline';
    const include_granted_scopes = 'true';
    const state = 'state_parameter_passthrough_value';
    const prompt = 'consent';
    const googleURL = `${url}?client_id=${process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URL}&response_type=${response_type}&scope=${scope}&access_type=${access_type}&include_granted_scopes=${include_granted_scopes}&state=${state}&prompt=${prompt}`;

    window.location.assign(googleURL);
  };

  return (
    <section className="flex flex-col items-center justify-center mt-[100px] gap-y-3">
      <Image src="/assets/icons/logo/wide.png" width={114} height={27.26} alt="logo" />
      <h2 className="font-sb18">관리자 페이지 로그인</h2>
      <div className="flex flex-col gap-3 items-center mb-4">
        <Image
          src="/assets/icons/login_kakao.png"
          alt="kakao_login"
          width={308}
          height={52}
          className="cursor-pointer"
          onClick={kakaoLogin}
          priority
        />
        <Image
          src="/assets/icons/login_google.png"
          alt="google_login"
          width={308}
          height={52}
          className="cursor-pointer"
          onClick={googleLogin}
          priority
        />
      </div>
    </section>
  );
};

export default loginView;
