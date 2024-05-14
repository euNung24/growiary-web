import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const LandingView = () => {
  return (
    <div className="relative bg-primary-900 w-screen h-screen flex justify-center overflow-hidden">
      <div
        className="absolute w-[960px] h-[960px] mt-[22px] rounded-full opacity-[0.2]"
        style={{
          background:
            'linear-gradient(180deg, rgba(255, 255, 255, 0.8) 0%, rgba(255, 255, 255, 0) 75.5%)',
        }}
      ></div>
      <div className="flex flex-col items-center gap-y-8 text-white-0 mt-8 text-center z-10">
        <h1 className="hidden">그루어리</h1>
        <Image
          className="mt-[98px]"
          src="/assets/icons/logo/wide_white.png"
          alt="logo"
          width={114}
          height={27.26}
        />
        <div>
          <h2 className="font-r22 mb-2.5">기록하며 성장하는 어른들을 위한 노트</h2>
          <p className="text-gray-100 font-r14">
            나만의 생각과 경험, 일상을 기록하고 데이터로 확인하세요
          </p>
        </div>
        <Button
          variant="secondary"
          size="sm"
          className="text-gray-900 bg-secondary-400"
          asChild
        >
          <Link href="/" className="font-m12">
            그루어리 시작하기
          </Link>
        </Button>
        <div
          className="flex-1 w-[200%]"
          style={{
            background: "no-repeat top/contain url('/assets/images/landing_screen.png')",
          }}
        ></div>
      </div>
    </div>
  );
};

export default LandingView;
