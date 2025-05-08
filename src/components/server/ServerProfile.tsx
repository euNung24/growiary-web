import { PropsWithChildren } from 'react';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { getProfile } from '@/profile/api/server';
import UserProvider from '@/components/providers/UserProvider';
import ServerTopics from '@/components/server/ServerTopics';

const ServerProfile = async ({ children }: PropsWithChildren) => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['profile'],
    queryFn: getProfile,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <UserProvider>
        <ServerTopics>{children}</ServerTopics>
      </UserProvider>
    </HydrationBoundary>
  );
};

export default ServerProfile;
