import { SAMPLE_DATA } from '@/utils/sampleData';
import { cn } from '@/lib/utils';
import Chip from '@/components/Chip';
import Link from 'next/link';
import { CardChip } from '@/components/ui/card';
import { topicCategory } from '@/utils/topicCategory';
import { getStringDateAndTime, getTwoFormatDate } from '@/utils';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Ellipsis } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTitleIcon,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import useProfileContext from '@/hooks/profile/useProfileContext';
import { ResPostType } from '@/types/postTypes';
import { deletePost } from '@/apis/post';
import { toast } from '@/components/ui/use-toast';
import { tracking } from '@/utils/mixPanel';
import { sendGAEvent } from '@next/third-parties/google';
import { useRecoilValue } from 'recoil';
import { TodayState } from '@/store/todayStore';
import { Dispatch, SetStateAction } from 'react';

type PostHistoryProps = {
  posts: { [key: string]: ResPostType[] };
  setPosts: Dispatch<SetStateAction<{ [key: string]: ResPostType[] }>>;
  assignRef: (index: string) => (element: HTMLDivElement) => void;
};
const PostHistory = ({ posts, setPosts, assignRef }: PostHistoryProps) => {
  const {
    date: { year, month, date: todayDate },
  } = useRecoilValue(TodayState);
  const { isLogin, profile } = useProfileContext();
  const today = `${year}-${getTwoFormatDate(month)}-${getTwoFormatDate(todayDate)}`;

  const handleDeletePost = async (id: string, date: string) => {
    await deletePost(id).then(res => {
      if (!res) return;
      toast({
        description: '기록이 삭제되었습니다',
      });
      const filteredPosts = {
        ...posts,
        [date]: [...(posts?.[date]?.filter(post => post.id !== id) || [])],
      };
      if (filteredPosts[date] && !filteredPosts[date].length) {
        delete filteredPosts[date];
      }
      setPosts(filteredPosts);
    });
  };

  const handleClickDetailLink = () => {
    tracking('세부 기록 선택');
    sendGAEvent({ event: '세부 기록 선택' });
  };

  return (isLogin === 'LOGIN' ? Object.keys(posts) : Object.keys(SAMPLE_DATA))
    .toSorted((a, b) => (+a.slice(-2) > +b.slice(-2) ? -1 : 1))
    .map(date => (
      <div ref={assignRef(date)} id={date} key={date}>
        <div className="mb-3">
          <span className={cn('mr-2 text-gray-500', today === date && 'text-gray-900')}>
            {+date.split('-')[1]}월 {+date.split('-')[2]}일
          </span>
          {today === date && <Chip variant="gray">오늘</Chip>}
        </div>
        <div key={date} className="space-y-3">
          {(isLogin === 'LOGIN' ? posts[date] : SAMPLE_DATA[date])
            .toSorted((a, b) => (new Date(a.writeDate) > new Date(b.writeDate) ? -1 : 1))
            .map(post => (
              <div key={post.id} className="relative">
                <Link
                  href={profile ? `/history/${post.id}` : ''}
                  onClick={handleClickDetailLink}
                  className={cn(
                    'block',
                    !profile && 'cursor-default pointer-events-none',
                  )}
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
                            typeof op.insert === 'string' && op.insert !== '\n'
                              ? op.insert
                              : '',
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
                <Popover>
                  <PopoverTrigger
                    className={cn(
                      'absolute right-6 top-6',
                      !profile && 'cursor-default pointer-events-none',
                    )}
                  >
                    <Ellipsis width={24} height={24} color="#747F89" />
                  </PopoverTrigger>
                  <PopoverContent className="flex flex-col justify-center overflow-hidden bg-white-0 w-auto p-0 [&>*]:py-2.5 [&>*]:px-10 [&>*]:block [&>*]:font-r14">
                    <Button asChild variant="ghostGrayHover">
                      <Link href={`/history/${post.id}/edit`}>수정하기</Link>
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="ghostGrayHover">삭제하기</Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitleIcon
                            src="/assets/icons/info.png"
                            width={32}
                            height={32}
                            alt="info"
                          />
                          <AlertDialogTitle>
                            기록을 정말 삭제하시겠습니까?
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            삭제된 글은 복원할 수 없습니다.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel
                            onClick={() => handleDeletePost(post.id, date)}
                          >
                            확인
                          </AlertDialogCancel>
                          <AlertDialogAction>취소</AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </PopoverContent>
                </Popover>
              </div>
            ))}
        </div>
      </div>
    ));
};

export default PostHistory;
