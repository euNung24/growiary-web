import { useMutation } from '@tanstack/react-query';
import { findTopic } from '@/user/domain/topic/api/client';
import { FindTopicType } from '@/user/domain/topic/type';

const useFindTopic = (id: FindTopicType['id']) => {
  return useMutation({
    mutationKey: ['topic', id],
    mutationFn: () => findTopic(id),
  });
};

export default useFindTopic;
