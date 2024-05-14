'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import Image from 'next/image';
import { ReactNode } from 'react';
import ServiceTerm from '@/views/common/ServiceTerm';
import PrivateTerm from '@/views/common/PrivateTerm';
import { tracking } from '@/utils/mixPanel';

type LoginDialogProps = {
  children: ReactNode;
};

const LoginDialog = ({ children }: LoginDialogProps) => {
  const termsStyle = 'font-sb12 text-gray-700';
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
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <Image
            src="/assets/icons/logo/wide.png"
            alt="logo"
            width={133.84}
            height={32}
            className="mb-6 ml-auto mr-auto pt-4"
          />
          <DialogTitle>그루어리에 오신 것을 환영합니다</DialogTitle>
          <DialogDescription className="font-r12">
            그루어리의 다양한 기능을 이용하기 위해 로그인해 주세요.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-3 items-center mt-[104px] mb-4">
          <Image
            src="/assets/icons/login_kakao.png"
            alt="kakao_login"
            width={308}
            height={52}
            className="cursor-pointer"
            onClick={kakaoLogin}
          />
          <Image
            src="/assets/icons/login_google.png"
            alt="google_login"
            width={308}
            height={52}
            className="cursor-pointer"
            onClick={googleLogin}
          />
        </div>
        <DialogFooter>
          계속 진행하면 Growiary{' '}
          <ServiceTerm>
            <b
              className={termsStyle}
              onClick={() => {
                tracking(`서비스 이용약관`);
              }}
            >
              서비스 약관
            </b>
          </ServiceTerm>
          에 동의하고
          <br />
          <PrivateTerm>
            <b
              className={termsStyle}
              onClick={() => {
                tracking(`개인정보처리방침`);
              }}
            >
              개인정보처리방침
            </b>
          </PrivateTerm>
          을 읽었음을 인정하는 것으로 간주됩니다.
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default LoginDialog;
