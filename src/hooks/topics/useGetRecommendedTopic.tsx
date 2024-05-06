import { getRecommendedTopic } from '@/apis/topics';
import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';

const useGetRecommendedTopic = () => {
  const {
    data: data,
    isError,
    error,
  } = useQuery({
    queryKey: ['RecommendedTopic'],
    queryFn: getRecommendedTopic,
  });

  useEffect(() => {
    if (isError) {
      alert(error.message);
    }
  }, [data]);

  return data?.data;
};

export default useGetRecommendedTopic;
