import { ProfileType } from '@/profile/type';
import { fetchOnServer } from '@/utils/fetchOnServer';

const profileApiUrl = process.env.NEXT_PUBLIC_API + '/profile';

export const getProfile = fetchOnServer<ProfileType>(profileApiUrl);
