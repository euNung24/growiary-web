import { topicCategory } from '@/utils/topicCategory';
import { TopicCategory } from '@/domain/topic/type';
import { SAMPLE_CATEGORY_DATA } from '@/utils/sampleData';
import useProfileContext from '@/profile/hooks/useProfileContext';

type CategoryHistoryProps = {
  selectedMonth: number;
  categories: Record<TopicCategory, number>;
};
const CategoryHistory = ({ selectedMonth, categories }: CategoryHistoryProps) => {
  const { isLogin } = useProfileContext();
  const totalPostCount = Object.values(categories).reduce((f, v) => f + v, 0);

  return (
    <div className="mx-4">
      <h4 className="text-gray-900 font-r12 py-3">카테고리</h4>
      <div>
        {(Object.keys(topicCategory) as TopicCategory[]).map(category => (
          <div
            key={category}
            className="flex items-center justify-between font-r12 py-2.5"
          >
            <div className="flex items-center gap-x-1">
              {topicCategory[category].Icon({
                color: '#002861',
                width: 14,
                height: 14,
              })}
              <span>{category}</span>
            </div>
            <span>
              {isLogin === 'LOGIN'
                ? categories[category] || 0
                : SAMPLE_CATEGORY_DATA[category]}
              개
            </span>
          </div>
        ))}
      </div>
      <div className="flex justify-between text-gray-500 font-r12 mt-2">
        <span>{selectedMonth}월에 작성한 글</span>
        <span>{isLogin === 'LOGIN' ? totalPostCount : 38}개</span>
      </div>
    </div>
  );
};

export default CategoryHistory;
