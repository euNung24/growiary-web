import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';

const LoginDialog = () => {
  const termsStyle = 'font-sb12 text-gray-700';
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">로그인</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <Image
            src={'/assets/icons/logo/wide.png'}
            alt="logo"
            width={133.84}
            height={32}
            className="mb-6 ml-auto mr-auto pt-4"
          />
          <DialogTitle>그루어리에 오신 것을 환영합니다</DialogTitle>
          <DialogDescription>
            그루어리의 다양한 기능을 이용하기 위해 로그인해 주세요.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-3 items-center mt-[104px] mb-4">
          <Image
            src="/assets/icons/login_kakao.png"
            alt="kakao_login"
            width={308}
            height={52}
          />
          <Image
            src="/assets/icons/login_google.png"
            alt="google_login"
            width={308}
            height={52}
          />
        </div>
        <DialogFooter>
          계속 진행하면 Growiary{' '}
          <b>
            <Link href="" className={termsStyle}>
              서비스 약관
            </Link>
          </b>
          에 동의하고
          <br />
          <b>
            <Link href="" className={termsStyle}>
              개인정보처리방침
            </Link>
          </b>
          을 읽었음을 인정하는 것으로 간주됩니다.
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default LoginDialog;
