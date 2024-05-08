import { cn } from '@/lib/utils';
import Link from 'next/link';
import Image from 'next/image';
import Chip from '@/components/Chip';
import { Skeleton } from '@/components/ui/skeleton';
import useGetTopicsByCategory from '@/hooks/topics/useGetTopicsByCategory';
import { TopicCategory, TopicType } from '@/types/topicTypes';
import useGetRecommendedTopic from '@/hooks/topics/useGetRecommendedTopic';
import { useEffect, useState } from 'react';

type TopicListProps = {
  currentCategory: TopicCategory;
};
const TopicList = ({ currentCategory }: TopicListProps) => {
  const topics = useGetTopicsByCategory();
  const bestTopics = useGetRecommendedTopic()?.category;
  const [currentTopics, setCurrentTopics] = useState<TopicType[]>([]);

  useEffect(() => {
    if (!bestTopics || !topics) return;
    const bestTopic = bestTopics[currentCategory];
    const filteredBestTopic = topics[currentCategory].filter(
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
                className="px-6 py-4 inline-block text-gray-700 group-hover:text-white-0"
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
                  <Chip className="ml-3 group-hover:bg-gray-50 group-hover:text-gray-900">
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
