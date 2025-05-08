import { useMutation } from '@tanstack/react-query';
import { findTopic } from '@/domain/user/topic/api/client';
import { FindTopicType } from '@/domain/user/topic/type';

const useFindTopic = (id: FindTopicType['id']) => {
  return useMutation({
    mutationKey: ['topic', id],
    mutationFn: () => findTopic(id),
  });
};

export default useFindTopic;
