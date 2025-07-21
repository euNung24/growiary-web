import { TopicCategory, TopicType } from '@/user/features/topic/types/topic';
import TopicItem from '@user/topic/components/TopicItem';

type TopicListProps = {
  category: TopicCategory;
  topics: TopicType[];
  recommendedTopic: TopicType;
  hidden: boolean;
};

const TopicList = ({ recommendedTopic, category, topics, hidden }: TopicListProps) => {
  const bestTopic = recommendedTopic;
  const nonBestTopics =
    bestTopic && topics ? topics?.filter(topic => topic.id !== bestTopic.id) : [];

  const prioritizedTopics =
    bestTopic && Object.keys(bestTopic).length
      ? [bestTopic, ...nonBestTopics]
      : nonBestTopics;

  return (
    <ul
      className="hidden flex-col gap-6 mt-9 data-[hidden=false]:flex"
      role="tabpanel"
      id={`panel-${category}`}
      aria-labelledby={`tab-${category}`}
      data-hidden={hidden}
    >
      {prioritizedTopics.map((topic, i) => (
        <TopicItem key={topic.id} topic={topic} best={i === 0} />
      ))}
    </ul>
  );
};

export default TopicList;
