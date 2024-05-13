import { updateUserTitleBadge } from '@/apis/profile';
import { useMutation } from '@tanstack/react-query';
import { BadgeKeyType } from '@/types/challengeTypes';
import { getNewAccessToken } from '@/utils/api';

const useChangeUserTitleBadge = () => {
  return useMutation({
    mutationKey: ['titleBadge'],
    mutationFn: (badgeKey: BadgeKeyType) => updateUserTitleBadge(badgeKey),
    onSuccess: ({ data }) => {
      console.log(data);
    },
    onError: async error => {
      await getNewAccessToken(error);
      console.log(error.message);
    },
  });
};

export default useChangeUserTitleBadge;
