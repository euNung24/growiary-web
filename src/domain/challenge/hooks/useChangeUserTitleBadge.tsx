import { updateUserTitleBadge } from '@/domain/profile/api/client';
import { useMutation } from '@tanstack/react-query';
import { BadgeKeyType } from '@/domain/challenge/type';

const useChangeUserTitleBadge = () => {
  return useMutation({
    mutationKey: ['titleBadge'],
    mutationFn: (badgeKey: BadgeKeyType) => updateUserTitleBadge(badgeKey),
  });
};

export default useChangeUserTitleBadge;
