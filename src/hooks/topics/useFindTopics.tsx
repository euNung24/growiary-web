import { useMutation } from '@tanstack/react-query';
import { findTopic } from '@/apis/topics';
import { FindTopicType } from '@/types/topicTypes';

const useFindTopic = (id: FindTopicType['id']) => {
  return useMutation({
    mutationKey: ['topic', id],
    mutationFn: () => findTopic(id),
  });
};

export default useFindTopic;
