import FeedbackModal from '@/views/common/FeedbackModal';
import { Button } from '@/components/ui/button';

type FooterFeedbackViewProps = {
  category: string;
  description: string;
};

const FooterFeedbackView = ({ description, category }: FooterFeedbackViewProps) => {
  return (
    <footer className="flex items-center flex-col gap-y-[15px] h-[183px] bg-gray-50 pt-9">
      <p className="text-gray-500 font-r16">{description}</p>
      <div>
        <FeedbackModal defaultCategory={category}>
          <Button variant="outlineGray" size="sm">
            의견 보내기
          </Button>
        </FeedbackModal>
      </div>
    </footer>
  );
};

export default FooterFeedbackView;
