import { ResPostType } from '@/post/types';
import { TopicCategory } from '@/types/topicTypes';

export const SAMPLE_CATEGORY_DATA: Record<TopicCategory, number> = {
  하루생각: 8,
  회고: 10,
  자아탐험: 4,
  크리에이티브: 4,
  자유: 12,
};

export const SAMPLE_DATA: {
  [key: string]: (Pick<ResPostType, 'title' | 'tags' | 'id' | 'writeDate'> & {
    content: string;
    topic: {
      category: TopicCategory;
    };
    index: number;
  })[];
} = {
  '2024-04-28': [
    {
      index: 37,
      id: 'zxcvzxcvzcxv',
      topic: { category: '하루생각' },
      title: '새벽 운동과 부상',
      content:
        '감기에서 적당히 회복된 것 같고 마침 기온도 조금 오른 것 같아서 새벽 운동을 나갔다. 그리고 뭔가 호흡이 평소보다 가빴는데, 그냥 감기가 덜 나은 탓이려니 하고  계속 뛰었고 그게 탈이 났다. 운동을 다녀오고',
      tags: ['운동', '부상', '건강', '일상'],
      writeDate: new Date(2024, 3, 28, 11, 44, 0).toISOString(),
    },
  ],
  '2024-04-29': [
    {
      index: 38,
      id: '123123123',
      topic: { category: '하루생각' },
      title: '요즘 나의 최대 걱정거리',
      content:
        '요즘 내 마음이 너무 뒤숭숭하다. 가족들에게도 투정을 많이 부리고 있다. 일단 투정부터 부린 다음 뒤늦게 후회하고 사과를 드리는 일이 많아졌는데, 그래도 개선된 모습을 만들어나가고 싶어서 짜증이 날 때면 참거나 다른 생각을 하며 리프레시하는 연습을 한다.',
      tags: ['걱정', '생각', '개선', '투정'],
      writeDate: new Date(2024, 3, 29, 15, 22, 0).toISOString(),
    },
  ],
};
