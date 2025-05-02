import { ProfileType } from '@/types/profileTypes';
import { fetchOnServer } from '@/utils/fetchOnServer';

const profileApiUrl = process.env.NEXT_PUBLIC_API + '/profile';

export const getProfile = async (): Promise<ProfileType | undefined> =>
  await fetchOnServer(profileApiUrl);
