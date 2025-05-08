'use client';

import FeedbackModal from '@/shared/views/common/FeedbackModal';
import useProfileContext from '@/domain/profile/hooks/useProfileContext';
import { tracking } from '@/shared/utils/mixPanel';
import { sendGAEvent } from '@next/third-parties/google';
import { usePathname } from 'next/navigation';
import { menu } from '@/shared/utils';

const FooterFeedbackView = () => {
  const { profile } = useProfileContext();
  const pathname = usePathname();
  const menuIdx = menu.findIndex(v => v.href === pathname);

  return (
    profile &&
    menu[menuIdx]?.footer && (
      <footer className="shrink-0 flex items-center flex-col gap-y-[15px] h-[183px] bg-gray-50 pt-9 px-10 break-keep text-center">
        <p className="text-gray-500 font-r16">
          {menu[menuIdx].placeholder ||
            '궁금하거나 떠오르는 아이디어, 의견이 있다면 자유롭게 남겨주세요'}
        </p>
        <div>
          <FeedbackModal>
            <button
              className="text-gray-800 bg-white-0 rounded-md py-2 px-6 font-r12"
              onClick={() => {
                tracking(`의견 보내기`);
                sendGAEvent({ event: `의견 보내기` });
              }}
            >
              의견 보내기
            </button>
          </FeedbackModal>
        </div>
      </footer>
    )
  );
};

export default FooterFeedbackView;
