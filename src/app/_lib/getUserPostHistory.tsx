import { QueryKey } from '@tanstack/react-query';
import customFetch from './customFetch';

export default function getUserPostHistory(
  { queryKey }: { queryKey: QueryKey },
  { session, update }: { session: any; update: any }
) {
  const [_1, email] = queryKey;

  try {
    const res = customFetch({
      url: `/api/v1/guild/getUserPostHistory?email=${email}`,
      method: 'GET',
      token: session.user.accessToken,
      loginType: session.user.loginType,
      update,
    });

    return res;
  } catch (error) {
    console.error(error);
    throw error;
  }

  return;
}
