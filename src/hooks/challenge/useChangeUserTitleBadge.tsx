import { updateUserTitleBadge } from '@/apis/profile';
import { useMutation } from '@tanstack/react-query';
import { BadgeKeyType } from '@/types/challengeTypes';

const useChangeUserTitleBadge = () => {
  return useMutation({
    mutationKey: ['titleBadge'],
    mutationFn: (badgeKey: BadgeKeyType) => updateUserTitleBadge(badgeKey),
  });
};

export default useChangeUserTitleBadge;
