import { PropsWithChildren } from 'react';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { getProfile } from '@/shared/apis/profile/server';
import UserLayoutWrapper from '@/shared/layouts/UserLayoutWrapper';
import { profileKeys } from '@/shared/queries/profile/profileKeys';

const ServerProfile = async ({ children }: PropsWithChildren) => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: profileKeys.all,
    queryFn: getProfile,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <UserLayoutWrapper>{children}</UserLayoutWrapper>
    </HydrationBoundary>
  );
};

export default ServerProfile;
