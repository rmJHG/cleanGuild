import { QueryKey } from '@tanstack/react-query';
import customFetch from './customFetch';
import { Session } from 'next-auth';

export default async function getGuildManager(
  { queryKey }: { queryKey: QueryKey },
  { session, update }: { session: Session; update: any }
) {
  const [_1, world_name, guild_name] = queryKey;

  try {
    const response = await customFetch({
      url: `/api/v1/guild/getGuildManager?world_name=${world_name}&guild_name=${guild_name}`,
      method: 'GET',
      token: session.user.accessToken,
      loginType: session.user.loginType,
      update,
    });
    console.log(response);

    if (response.message === '매니저 데이터를 가져오는데 실패했습니다.') {
      return null;
    }
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
