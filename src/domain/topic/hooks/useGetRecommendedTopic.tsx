import { getRecommendedTopic } from '@/domain/topic/api/client';
import { useQuery } from '@tanstack/react-query';

const useGetRecommendedTopic = () => {
  return useQuery({
    queryKey: ['recommendedTopic'],
    queryFn: getRecommendedTopic,
  });
};

export default useGetRecommendedTopic;
