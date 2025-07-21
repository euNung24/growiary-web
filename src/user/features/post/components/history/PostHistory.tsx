import { cn } from '@/shared/utils/cn';
import Chip from '@/shared/components/Chip';
import { toast } from '@/shared/components/ui/use-toast';

import useProfileContext from '@/shared/hooks/useProfileContext';
import { SAMPLE_DATA } from '@user/post/constant/sample';
import { deletePost } from '@/user/features/post/apis/postApi';
import { Dispatch, SetStateAction, useEffect, useMemo, useState } from 'react';
import { ResPostType } from '@user/post/types/post';
import TodayNewPost from '@user/post/components/history/TodayNewPost';
import { format } from 'date-fns';
import useGetMonthlyPosts from '@user/post/queries/useGetMonthlyPosts';
import { debounce } from '@/shared/utils/debounce';
import { TopicCategory } from '@user/topic/types/topic';
import HistoryCard from '@user/post/components/history/HistoryCard';

type PostHistoryProps = {
  assignRef: (index: string) => (element: HTMLDivElement) => void;
  date: Date;
  setCategories: Dispatch<SetStateAction<Record<TopicCategory, number>>>;
};

type HistoryPostType = {
  [key: string]: ResPostType[];
};

const PostHistory = ({ assignRef, date, setCategories }: PostHistoryProps) => {
  const [posts, setPosts] = useState<HistoryPostType>({});
  const [currentDate] = useState(() => new Date());

  const { isLogin } = useProfileContext();
  const mutation = useGetMonthlyPosts();

  const selectedYYYYMM = format(date, 'yyyy-MM');
  const today = format(currentDate, 'yyyy-MM-dd');
  const hasTodayPost =
    isLogin === 'NOT_LOGIN' ||
    (mutation.isSuccess && !posts[today] && today === format(date, 'yyyy-MM-dd'));

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

  const mutationFn = async (date: string) => {
    return mutation.mutateAsync(date).then(res => {
      if (!res) return;
      if (!('posts' in res.data)) {
        setPosts({});
        setCategories({} as Record<TopicCategory, number>);
        return;
      }
      const sortDataByDate = res.data.posts.reduce((f, v) => {
        const date = format(new Date(v.writeDate), 'yyyy-MM-dd');
        return {
          ...f,
          [date]: [...(f[date] || []), v],
        };
      }, {} as HistoryPostType);

      setPosts(sortDataByDate);
      setCategories(res.data.category);
    });
  };

  const debouncedMutation = useMemo(() => debounce(mutationFn), []);

  useEffect(() => {
    debouncedMutation(selectedYYYYMM);

    return () => {
      debouncedMutation.cancel();
    };
  }, [selectedYYYYMM]);

  return (
    <section className="flex flex-col gap-y-[72px] pb-5 mx-2.5 my-4 pt-3 mb-[300px]">
      {hasTodayPost && <TodayNewPost assignRef={assignRef} />}
      {(isLogin === 'LOGIN' ? Object.keys(posts) : Object.keys(SAMPLE_DATA))
        .slice()
        .sort((a, b) => (+a.slice(-2) > +b.slice(-2) ? -1 : 1))
        .map(postDate => (
          <div ref={assignRef(postDate)} id={postDate} key={postDate}>
            <div className="mb-3">
              <span
                className={cn(
                  'mr-2 text-gray-500',
                  today === postDate && 'text-gray-900',
                )}
              >
                {+postDate.split('-')[1]}월 {+postDate.split('-')[2]}일
              </span>
              {today === postDate && <Chip variant="gray">오늘</Chip>}
            </div>
            <div className="space-y-3">
              {(isLogin === 'LOGIN' ? posts[postDate] : SAMPLE_DATA[postDate])
                .slice()
                .sort((a, b) => (new Date(a.writeDate) > new Date(b.writeDate) ? -1 : 1))
                .map(post => (
                  <HistoryCard
                    key={post.id}
                    post={post}
                    onDelete={() => handleDeletePost(post.id, postDate)}
                  />
                ))}
            </div>
          </div>
        ))}
    </section>
  );
};

export default PostHistory;
