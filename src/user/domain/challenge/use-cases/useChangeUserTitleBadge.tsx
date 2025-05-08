import { useMutation } from '@tanstack/react-query';

import { updateUserTitleBadge } from '@/shared/apis/profile/client';
import { BadgeKeyType } from '@user/challenge/constants/badges';

const useChangeUserTitleBadge = () => {
  return useMutation({
    mutationKey: ['titleBadge'],
    mutationFn: (badgeKey: BadgeKeyType) => updateUserTitleBadge(badgeKey),
  });
};

export default useChangeUserTitleBadge;
