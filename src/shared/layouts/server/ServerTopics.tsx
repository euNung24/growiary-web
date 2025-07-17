import { PropsWithChildren } from 'react';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { getAllTopics } from '@user/topic/apis/topicApi.server';
import { topicKeys } from '@user/topic/queries/topicKeys';

const ServerTopics = async ({ children }: PropsWithChildren) => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: topicKeys.lists(),
    queryFn: getAllTopics,
    staleTime: 60 * 60 * 1000,
  });

  return <HydrationBoundary state={dehydrate(queryClient)}>{children}</HydrationBoundary>;
};

export default ServerTopics;
