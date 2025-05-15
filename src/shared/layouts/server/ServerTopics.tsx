import { PropsWithChildren } from 'react';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { getAllTopics } from '@user/topic/apis/topicApi.server';

const ServerTopics = async ({ children }: PropsWithChildren) => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['allTopics'],
    queryFn: getAllTopics,
    staleTime: 60 * 60 * 1000,
  });

  return <HydrationBoundary state={dehydrate(queryClient)}>{children}</HydrationBoundary>;
};

export default ServerTopics;
