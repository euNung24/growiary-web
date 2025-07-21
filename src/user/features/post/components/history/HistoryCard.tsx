import Link from 'next/link';

import { cn } from '@/shared/utils/cn';
import { getStringDateAndTime } from '@/shared/utils';
import { topicCategory } from '@/shared/types/topicCategory';
import DeletePostPopover from '@user/post/components/history/DeletePostPopover';
import Chip from '@/shared/components/Chip';
import { CardChip } from '@/shared/components/ui/card';
import { ResPostType } from '@user/post/types/post';
import { trackingAnalytics } from '@/shared/utils/trackingAnalytics';
import useProfileContext from '@/shared/hooks/useProfileContext';
import { SamplePostType } from '@user/post/types/samplePost';
import { ROUTES } from '@/shared/constants/routes';

type HistoryCardProps = {
  post: ResPostType | SamplePostType;
  onDelete: () => void;
};

const HistoryCard = ({ post, onDelete }: HistoryCardProps) => {
  const { profile } = useProfileContext();

  const handleClickDetailLink = () => {
    trackingAnalytics('세부 기록 선택');
  };

  return (
    <div key={post.id} className="relative">
      <Link
        href={profile ? ROUTES.post.edit(post.id) : ''}
        onClick={handleClickDetailLink}
        className={cn('block', !profile && 'cursor-default pointer-events-none')}
      >
        <div className="p-6 flex flex-col rounded-2xl border border-gray-200 relative">
          <div className="flex justify-between items-center">
            <CardChip size="lg">
              {topicCategory[post.topic?.category || '자유'].Icon({
                width: 12,
                height: 12,
                color: 'currentColor',
              })}
              {post.topic?.category || '자유'}
            </CardChip>
          </div>
          <p className="font-sb22 text-gray-900 mt-4 mb-2">
            {post.title || '제목 타이틀'}
          </p>
          <div
            className="overflow-hidden text-ellipsis min-h-[54px] font-r16 text-gray-800"
            style={{
              display: '-webkit-box',
              WebkitBoxOrient: 'vertical',
              WebkitLineClamp: 6,
              maxHeight: '156px',
            }}
          >
            {typeof post.content !== 'string'
              ? post.content?.ops?.map(op =>
                  typeof op.insert === 'string' && op.insert !== '\n' ? op.insert : '',
                )
              : post.content}
          </div>
          <div className="mt-6 flex justify-between items-center">
            <div className="flex flex-wrap gap-x-3 max-w-[472px] lg:max-w-[402px] h-[22px] overflow-hidden">
              {post.tags?.map((tag, i) => (
                <Chip key={tag + i} variant="gray">
                  {tag}
                </Chip>
              ))}
            </div>
            <span className="text-gray-500 font-r14 tracking-tight shrink-0">
              {getStringDateAndTime(new Date(post.writeDate))}
            </span>
          </div>
          {post.topic && (
            <div className="absolute bottom-0 right-6 z-[-1]">
              {topicCategory[post.topic.category]?.Icon({
                width: 160,
                height: 160,
                color: '#EEF9E6',
              })}
            </div>
          )}
        </div>
      </Link>
      <DeletePostPopover postId={post.id} onDelete={onDelete} />
    </div>
  );
};

export default HistoryCard;
