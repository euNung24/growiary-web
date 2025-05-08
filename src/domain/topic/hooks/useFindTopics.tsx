import { useMutation } from '@tanstack/react-query';
import { findTopic } from '@/domain/topic/api/client';
import { FindTopicType } from '@/domain/topic/type';

const useFindTopic = (id: FindTopicType['id']) => {
  return useMutation({
    mutationKey: ['topic', id],
    mutationFn: () => findTopic(id),
  });
};

export default useFindTopic;
