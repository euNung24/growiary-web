'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useRecoilState } from 'recoil';
import { UserState } from '@/store/userStore';
import { useEffect } from 'react';
import { tracking } from '@/utils/mixPanel';
import { sendGAEvent } from '@next/third-parties/google';

const LandingView = () => {
  const [userState, setUserState] = useRecoilState(UserState);

  const handleClickStart = () => {
    tracking(`메인 페이지`);
    sendGAEvent({ event: '메인 페이지' });
  };

  useEffect(() => {
    if (userState.isNotLoginAndFirst) {
      setUserState(v => ({ ...v, isNotLoginAndFirst: false }));
    }
  }, [userState]);

  return (
    <>
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
            <Link href="/" className="font-m12" onClick={handleClickStart}>
              그루어리 시작하기
            </Link>
          </Button>
          <div
            className="flex-1 w-[200%]"
            style={{
              background:
                "no-repeat top/contain url('/assets/images/landing_screen.png')",
            }}
          ></div>
        </div>
      </div>
      <footer className="bg-[#002861] opacity-50">
        <div className="pt-[54px] pl-[157px] pb-[21px] text-gray-100 flex flex-col gap-y-3 font-r14">
          <Image
            src="/assets/icons/logo/wide_white.png"
            alt="logo"
            width={112.49}
            height={25.64}
          />
          <div className="flex gap-x-[76px] gap-y-3 flex-wrap">
            <div className="flex flex-col">
              <span className="font-sb14">베러플레이스</span>
              <dl className="flex [&>*]:flex">
                <div>
                  <dt>대표자 : &nbsp;</dt>
                  <dd>배건우</dd>
                  &nbsp;|&nbsp;
                </div>
                <div>
                  <dt>사업자등록번호 : &nbsp;</dt>
                  <dd>493-06-02707</dd>
                </div>
              </dl>
              <dl className="flex [&>*]:flex">
                <div className="shrink-0">
                  <dt>대표번호 : &nbsp;</dt>
                  <dd>0507-0178-0372</dd>
                  &nbsp;|&nbsp;
                </div>
                <div className="shrink-0">
                  <dt>주소지 : &nbsp;</dt>
                  <dd>대구광역시 북구 중앙대로 118길 19, 302호</dd>
                </div>
              </dl>
            </div>
            <div>
              <span className="font-sb14">고객센터</span>
              <dl className="flex [&>*]:flex">
                <div>
                  <dt>이메일 문의 : &nbsp;</dt>
                  <dd>admin@growiary.com</dd>
                </div>
              </dl>
              (평일 09:30~18:00)
            </div>
          </div>
          &copy; 2024.그루어리 all rights reserved.
        </div>
      </footer>
    </>
  );
};

export default LandingView;
