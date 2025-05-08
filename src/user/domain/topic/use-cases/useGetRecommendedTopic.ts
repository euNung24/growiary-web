import { getRecommendedTopic } from '@user/topic/infra/topicApi.client';
import { useQuery } from '@tanstack/react-query';

const useGetRecommendedTopic = () => {
  return useQuery({
    queryKey: ['recommendedTopic'],
    queryFn: getRecommendedTopic,
  });
};

export default useGetRecommendedTopic;
