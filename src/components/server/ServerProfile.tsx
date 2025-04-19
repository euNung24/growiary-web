import { PropsWithChildren } from 'react';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { getProfile } from '@/apis/profile/server';
import UserProvider from '@/components/providers/UserProvider';

const ServerProfile = async ({ children }: PropsWithChildren) => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['profile'],
    queryFn: getProfile,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <UserProvider>{children}</UserProvider>
    </HydrationBoundary>
  );
};

export default ServerProfile;
