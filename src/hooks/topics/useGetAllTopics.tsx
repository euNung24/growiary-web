import { useQuery } from '@tanstack/react-query';
import { getAllTopics } from '@/apis/topics';

const useGetAllTopics = () => {
  const {
    data: data,
    isError,
    isPending,
    error,
  } = useQuery({
    queryKey: ['allTopics'],
    queryFn: getAllTopics,
    staleTime: Infinity,
  });

  if (isPending) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  return (
    <ul>
      {data.data.map(topic => (
        <li key={topic.id}>{topic.title}</li>
      ))}
    </ul>
  );
};

export default useGetAllTopics;
