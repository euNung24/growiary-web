import FeedbackModal from '@/views/common/FeedbackModal';
import { MenuType } from '@/types';
import useProfileContext from '@/hooks/profile/useProfileContext';
import { tracking } from '@/utils/mixPanel';

type FooterFeedbackViewProps = {
  category: MenuType;
  description: string;
};

const FooterFeedbackView = ({ description, category }: FooterFeedbackViewProps) => {
  const { profile } = useProfileContext();

  return (
    profile && (
      <footer className="flex items-center flex-col gap-y-[15px] mt-[72px] h-[183px] bg-gray-50 pt-9">
        <p className="text-gray-500 font-r16">{description}</p>
        <div>
          <FeedbackModal defaultCategory={category}>
            <button
              className="text-gray-800 bg-white-0 rounded-md py-2 px-6 font-r12"
              onClick={() => {
                tracking(`푸터 의견 보내기 클릭 / ${category}`);
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
