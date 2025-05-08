import { useMutation } from '@tanstack/react-query';
import { findTopic } from '@/topic/api/client';
import { FindTopicType } from '@/topic/type';

const useFindTopic = (id: FindTopicType['id']) => {
  return useMutation({
    mutationKey: ['topic', id],
    mutationFn: () => findTopic(id),
  });
};

export default useFindTopic;
