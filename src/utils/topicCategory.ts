import { TopicCategory } from '@/types/topicTypes';
import CreativeIcon from '@/components/icons/CreativeIcon';
import RemembranceIcon from '@/components/icons/RemembranceIcon';
import ThinkIcon from '@/components/icons/ThinkIcon';
import SelfExplorationIcon from '@/components/icons/SelfExplorationIcon';

export type IconProps = {
  color?: string,
  width?: number,
  height?: number,
}

type CategoryInfo = {
  title: string;
  Icon: ({ color, width, height }: IconProps) => JSX.Element;
};

export const topicCategory: Record<TopicCategory, CategoryInfo> = {
  '회고': {
    title: '회고 : 성장을 위한 돌아보기',
    Icon: RemembranceIcon,
  },
  '하루생각': {
    title: '하루생각 : 하루를 기록하는 소소한 글쓰기',
    Icon: ThinkIcon,
  },
  '자아탐험': {
    title: '자아탐험 : 나를 알아가는 질문들',
    Icon: SelfExplorationIcon,
  },
  '크리에이티브': {
    title: '크리에이티브 : 창의성을 키우는 질문들',
    Icon: CreativeIcon,
  },
};
