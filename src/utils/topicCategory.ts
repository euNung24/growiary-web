import CreativeIcon from '@/components/icons/CreativeIcon';
import RemembranceIcon from '@/components/icons/RemembranceIcon';
import ThinkIcon from '@/components/icons/ThinkIcon';
import SelfExplorationIcon from '@/components/icons/SelfExplorationIcon';
import { TopicCategory } from '@/types/topicTypes';
import UnCategoriedIcon from '@/components/icons/UnCategoriedIcon';

export type IconProps = {
  color?: string,
  width?: number | string,
  height?: number | string,
}

type CategoryInfo = {
  Icon: ({ color, width, height }: IconProps) => JSX.Element;
};

export const topicCategory: Record<TopicCategory, CategoryInfo> = {
  '회고': {
    Icon: RemembranceIcon,
  },
  '하루생각': {
    Icon: ThinkIcon,
  },
  '자아탐험': {
    Icon: SelfExplorationIcon,
  },
  '크리에이티브': {
    Icon: CreativeIcon,
  },
  '자유': {
    Icon: UnCategoriedIcon
  }
};

export const checkIsTopicCategory = <T>(category: string, callback: (category: TopicCategory) => T) => {
  if(Object.keys(topicCategory).includes(category)) {
    return callback(category as TopicCategory);
  }
}
