import { handleError } from '@/apis/token/server';
import { ProfileType } from '@/types/profileTypes';
import { fetchOnServer } from '@/utils/fetchOnServer';

const profileApiUrl = process.env.NEXT_PUBLIC_API + '/profile';

export const getProfile = async (): Promise<ProfileType | undefined> => {
  const profileApi = fetchOnServer(profileApiUrl);

  try {
    return await profileApi();
  } catch (error) {
    await handleError(error, profileApi);
  }
};
