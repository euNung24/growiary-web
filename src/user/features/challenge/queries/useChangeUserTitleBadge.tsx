import { useMutation } from '@tanstack/react-query';

import { updateUserTitleBadge } from '@/shared/apis/profile/client';
import { BadgeKeyType } from '@/user/features/challenge/constants/badges';

const useChangeUserTitleBadge = () => {
  return useMutation({
    mutationFn: (badgeKey: BadgeKeyType) => updateUserTitleBadge(badgeKey),
  });
};

export default useChangeUserTitleBadge;
