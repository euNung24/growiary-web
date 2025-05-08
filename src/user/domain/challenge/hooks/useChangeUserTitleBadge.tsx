import { useMutation } from '@tanstack/react-query';

import { updateUserTitleBadge } from '@/user/profile/api/client';
import { BadgeKeyType } from '@user/challenge/type';

const useChangeUserTitleBadge = () => {
  return useMutation({
    mutationKey: ['titleBadge'],
    mutationFn: (badgeKey: BadgeKeyType) => updateUserTitleBadge(badgeKey),
  });
};

export default useChangeUserTitleBadge;
