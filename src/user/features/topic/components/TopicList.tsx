import { TopicCategory, TopicType } from '@/user/features/topic/types/topic';
import TopicItem from '@user/topic/components/TopicItem';

type TopicListProps = {
  category: TopicCategory;
  topics: TopicType[];
  recommendedTopic: TopicType;
  hidden: boolean;
};

const TopicList = ({ recommendedTopic, category, topics, hidden }: TopicListProps) => {
  return (
    <ul
      className="hidden flex-col gap-6 mt-9 data-[hidden=false]:flex"
      role="tabpanel"
      id={`panel-${category}`}
      aria-labelledby={`tab-${category}`}
      data-hidden={hidden}
      aria-hidden={hidden}
    >
      {topics.map(topic => (
        <TopicItem key={topic.id} topic={topic} best={recommendedTopic.id === topic.id} />
      ))}
    </ul>
  );
};

export default TopicList;
