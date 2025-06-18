import { PropsWithChildren } from 'react';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { getProfile } from '@/shared/apis/profile/server';
import ServerTopics from '@/shared/layouts/server/ServerTopics';
import UserLayoutWrapper from '@/shared/layouts/UserLayoutWrapper';

const ServerProfile = async ({ children }: PropsWithChildren) => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['profile'],
    queryFn: getProfile,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <UserLayoutWrapper>
        <ServerTopics>{children}</ServerTopics>
      </UserLayoutWrapper>
    </HydrationBoundary>
  );
};

export default ServerProfile;
