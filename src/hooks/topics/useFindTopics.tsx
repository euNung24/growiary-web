import { useMutation } from '@tanstack/react-query';
import { findTopic } from '@/apis/topics';
import { FindTopicType } from '@/types/topicTypes';
const useFindTopic = (id: FindTopicType['id']) => {
  const mutation = useMutation({
    mutationKey: ['topic', id],
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
