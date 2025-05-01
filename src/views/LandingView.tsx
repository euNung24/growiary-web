import Image from 'next/image';
import logo from '@assets/icons/logo/wide_white.png';
import labtop from '@assets/images/landing_screen.png';
import { PropsWithChildren } from 'react';

const LandingView = ({ children }: PropsWithChildren) => {
  return (
    <>
      <main className="relative bg-primary-900 w-screen h-screen sm:h-auto flex justify-center overflow-hidden">
        <div
          className="absolute w-[960px] h-[960px] mt-[22px] rounded-full opacity-[0.2]"
          style={{
            background:
              'linear-gradient(180deg, rgba(255, 255, 255, 0.8) 0%, rgba(255, 255, 255, 0) 75.5%)',
          }}
        ></div>
        <section className="flex flex-col items-center gap-y-8 text-white-0 mt-8 text-center z-10">
          <h1 className="hidden">그루어리</h1>
          <Image
            className="mt-[98px] w-[114px] h-auto"
            src={logo}
            alt="logo"
            width={114}
            height={27.5}
            priority
          />
          <div>
            <h2 className="font-r22 mb-2.5">기록하며 성장하는 어른들을 위한 노트</h2>
            <p className="text-gray-100 font-r14">
              나만의 생각과 경험, 일상을 기록하고 데이터로 확인하세요
            </p>
          </div>
          {children}
          <Image
            className="flex mb-5 sm:w-[80%]"
            src={labtop}
            alt="laptop"
            width={2188 / 3}
            height={1322 / 3}
            priority
          />
        </section>
      </main>
      <footer className="bg-[#002861] opacity-50">
        <div className="pt-[54px] pl-[157px] pb-[21px] text-gray-100 flex flex-col gap-y-3 font-r14 sm:pl-7">
          <Image
            className="w-[112.49px] h-auto"
            src="/assets/icons/logo/wide_white.png"
            alt="logo"
            width={112.49}
            height={25.64}
            priority
          />
          <div className="flex gap-x-[76px] gap-y-3 flex-wrap">
            <div className="flex flex-col">
              <span className="font-sb14">베러플레이스</span>
              <dl className="flex [&>*]:flex flex-wrap sm:flex-col">
                <div>
                  <dt>대표자 : &nbsp;</dt>
                  <dd className='after:content-["|"] after:mx-1 sm:after:hidden'>
                    배건우
                  </dd>
                </div>
                <div>
                  <dt>사업자등록번호 : &nbsp;</dt>
                  <dd>493-06-02707</dd>
                </div>
              </dl>
              <dl className="flex [&>*]:flex flex-wrap sm:flex-col">
                <div>
                  <dt>대표번호 : &nbsp;</dt>
                  <dd className='after:content-["|"] after:mx-1 sm:after:hidden'>
                    0507-0178-0372
                  </dd>
                </div>
                <div>
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
