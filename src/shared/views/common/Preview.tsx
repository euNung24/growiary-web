'use client';

import useGetProfile from '@/profile/hooks/useGetProfile';

const Preview = () => {
  const { data } = useGetProfile();

  return (
    !data && (
      <div className="fixed top-0 inset-0 bg-gray-700/50 !mt-0 z-20 !mx-0 animate-fade-out">
        <div className="fixed bottom-1/2 right-1/3 z-[100] flex max-h-screen flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]">
          <div className="group pointer-events-auto relative flex w-full items-center space-x-4 overflow-hidden rounded-md shadow-lg transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full text-center bg-secondary-50 font-r18 justify-center px-[72px] py-3">
            <div className="font-r18 text-gray-900">
              그루어리 서비스 소개를 위한 예시 화면입니다.
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default Preview;
