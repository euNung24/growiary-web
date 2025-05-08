import { ProfileType } from '@/shared/types/profile';
import { fetchOnServer } from '@/shared/utils/fetchOnServer';

const profileApiUrl = process.env.NEXT_PUBLIC_API + '/profile';

export const getProfile = fetchOnServer<ProfileType>(profileApiUrl);
