import { getRecommendedTopic } from '@/user/features/topic/apis/topicApi.client';
import { useQuery } from '@tanstack/react-query';
import { topicKeys } from '@/user/features/topic/queries/topicKeys';

const useGetWeeklyHotTopic = () => {
  return useQuery({
    queryKey: topicKeys.recommendation,
    queryFn: getRecommendedTopic,
    select: data => data.top,
  });
};

export default useGetWeeklyHotTopic;
