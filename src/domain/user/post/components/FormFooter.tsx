import LoginDialog from '@/shared/components/LoginDialog';
import { Button } from '@/shared/components/ui/button';
import useProfileContext from '@/domain/profile/hooks/useProfileContext';
import { cn } from '@/shared/utils/cn';
import { useFormContext } from 'react-hook-form';

const FormFooter = () => {
  const methods = useFormContext();
  const { profile } = useProfileContext();

  const [title, topicId, charactersCount] = methods.watch([
    'title',
    'topicId',
    'charactersCount',
  ]);

  return (
    <div className="flex justify-end items-center gap-x-[29px]">
      <div className="mr-auto font-r12 text-error-900">
        {title.length < 1
          ? '제목을 작성해주세요'
          : topicId === ''
            ? '주제를 선택해주세요'
            : charactersCount < 10
              ? '10자 이상의 기록을 작성해주세요'
              : ''}
      </div>
      <span className="text-gray-400 font-r12">
        <span className={cn(charactersCount < 10 && 'text-error-900')}>
          {charactersCount}
        </span>{' '}
        / 2000
      </span>
      <Button
        type="submit"
        size="sm"
        className={cn(!profile && 'hidden')}
        disabled={title.length < 1 || charactersCount < 10 || topicId === ''}
      >
        기록완료
      </Button>
      <LoginDialog>
        <Button
          type="submit"
          size="sm"
          className={cn(profile && 'hidden')}
          disabled={title.length < 1 || charactersCount < 10 || topicId === ''}
        >
          로그인
        </Button>
      </LoginDialog>
    </div>
  );
};

export default FormFooter;
