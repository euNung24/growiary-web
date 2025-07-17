import { getRecommendedTopic } from '@/user/features/topic/apis/topicApi.client';
import { useQuery } from '@tanstack/react-query';
import { topicKeys } from '@/user/features/topic/queries/topicKeys';

const useGetRecommendedTopic = () => {
  return useQuery({
    queryKey: topicKeys.recommendation,
    queryFn: getRecommendedTopic,
  });
};

export default useGetRecommendedTopic;
