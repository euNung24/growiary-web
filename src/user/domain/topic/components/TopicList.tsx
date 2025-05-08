import { cn } from '@/shared/utils/cn';
import Link from 'next/link';
import Image from 'next/image';
import Chip from '@/shared/components/Chip';
import { Skeleton } from '@/shared/components/ui/skeleton';
import useGetTopicsByCategory from '@user/topic/hooks/useGetTopicsByCategory';
import { TopicCategory, TopicType } from '@user/topic/type';
import useGetRecommendedTopic from '@user/topic/hooks/useGetRecommendedTopic';
import { useEffect, useState } from 'react';

type TopicListProps = {
  currentCategory: TopicCategory;
};
const TopicList = ({ currentCategory }: TopicListProps) => {
  const { data: topics } = useGetTopicsByCategory();
  const { data } = useGetRecommendedTopic();
  const bestTopics = data?.category;
  const [currentTopics, setCurrentTopics] = useState<TopicType[]>([]);

  useEffect(() => {
    if (!bestTopics || !topics) return;
    const bestTopic = bestTopics[currentCategory];
    const filteredBestTopic = topics[currentCategory]?.filter(
      topic => topic.id !== bestTopic.id,
    );
    setCurrentTopics(
      Object.keys(bestTopic).length
        ? [bestTopic, ...filteredBestTopic]
        : filteredBestTopic,
    );
  }, [topics, bestTopics, currentCategory]);

  return (
    <>
      {topics && bestTopics
        ? currentTopics?.map((topic, i) => (
            <li
              key={i}
              className={cn(
                'group rounded-md hover:bg-primary-900 border border-gray-100 hover:shadow',
              )}
            >
              <Link
                href={`/post?topic=${topic.id}&category=${topic.category}`}
                className="px-6 py-4 font-r16 inline-block text-gray-700 group-hover:text-white-0 transition-colors duration-150"
              >
                <Image
                  src="/assets/icons/edit_white.png"
                  alt="icon"
                  width={22}
                  height={22}
                  className="hidden	group-hover:inline-block group-hover:mr-3"
                />
                {topic?.title?.replaceAll('/n ', '')}
                {i === 0 && (
                  <Chip className="ml-3 font-r12 group-hover:bg-gray-50 group-hover:text-gray-900">
                    Best
                  </Chip>
                )}
              </Link>
            </li>
          ))
        : [...Array(4)].map((card, i) => (
            <li
              key={i}
              className={cn(
                'group px-6 py-4 rounded-md hover:bg-primary-900 border border-gray-100',
              )}
            >
              <Skeleton className="w-1/4 h-6" />
            </li>
          ))}
    </>
  );
};

export default TopicList;
