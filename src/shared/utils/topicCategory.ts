import CreativeIcon from '@/shared/components/icons/CreativeIcon';
import RemembranceIcon from '@/shared/components/icons/RemembranceIcon';
import ThinkIcon from '@/shared/components/icons/ThinkIcon';
import SelfExplorationIcon from '@/shared/components/icons/SelfExplorationIcon';
import { TopicCategory } from '@/domain/user/topic/type';
import UnCategoriedIcon from '@/shared/components/icons/UnCategoriedIcon';

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
