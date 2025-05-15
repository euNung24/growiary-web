import { useMutation } from '@tanstack/react-query';
import { findTopic } from '@user/topic/apis/topicApi.client';
import { FindTopicType } from '@user/topic/types/topic';

const useFindTopic = (id: FindTopicType['id']) => {
  return useMutation({
    mutationKey: ['topic', id],
    mutationFn: () => findTopic(id),
  });
};

export default useFindTopic;
