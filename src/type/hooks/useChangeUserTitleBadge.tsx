import { updateUserTitleBadge } from '@/profile/api/client';
import { useMutation } from '@tanstack/react-query';
import { BadgeKeyType } from '@/challenge/type';

const useChangeUserTitleBadge = () => {
  return useMutation({
    mutationKey: ['titleBadge'],
    mutationFn: (badgeKey: BadgeKeyType) => updateUserTitleBadge(badgeKey),
  });
};

export default useChangeUserTitleBadge;
