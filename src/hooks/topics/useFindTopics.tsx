import { useMutation } from '@tanstack/react-query';
import { findTopic } from '@/apis/topics';
const useFindTopic = (id: FindTopicType['id']) => {
  const mutation = useMutation({
    mutationKey: ['allTopics', id],
    mutationFn: () => findTopic(id),
    onSuccess: ({ data }) => {
      console.log(data);
    },
    onError: error => {
      console.log(error.message);
    },
  });

  return mutation;
};

export default useFindTopic;
