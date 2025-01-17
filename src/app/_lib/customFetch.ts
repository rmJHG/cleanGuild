import { signOut } from 'next-auth/react';
import { errorModal } from './errorModal';

export default async function customFetch({
  url,
  method,
  loginType,
  headers,
  body,
  token,
  update,
}: {
  url: string;
  method: string;
  loginType: string;
  headers?: HeadersInit;
  body?: BodyInit;
  token: string;
  update?: any;
}) {
  try {
    // 처음 요청 보내기
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}${url}`, {
      method,
      body,
      headers: {
        Authorization: `Bearer ${token}`,
        loginType,
        ...headers,
      },
      credentials: 'include',
    });

    const resJson = await res.json();
    console.log(resJson);
    if (resJson.success === false) {
      throw new Error(resJson.message);
    }
    // 만약 토큰 만료 오류가 발생했다면
    if (resJson.message === '토큰이 만료되었습니다.') {
      // 리프레시 토큰으로 새로운 액세스 토큰을 요청
      const refresh = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/user/${loginType}/refreshToken`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            loginType,
            ...headers,
          },
          credentials: 'include',
        }
      );
      console.log(refresh);
      const refreshJson = await refresh.json();
      console.log(refreshJson, 'refreshJson');
      if (refresh.status === 401) {
        signOut({
          callbackUrl: `/signin?error=${encodeURIComponent(
            '세션이 만료되었습니다. 다시 로그인해주세요.'
          )}`,
        });

        errorModal('세션이 만료되었습니다. 다시 로그인해주세요.');
        return refreshJson;
      }

      console.log(refreshJson);

      // 새로 발급받은 액세스 토큰이 있다면 업데이트
      if (refreshJson.accessToken) {
        const newAccessToken = refreshJson.accessToken; // 새 토큰을 변수에 저장

        console.log('토큰 갱신 완료');

        // 새 토큰을 사용하여 원래의 요청을 다시 보내기
        const retryRes = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}${url}`, {
          method,
          body,
          headers: {
            ...headers,
            loginType,
            Authorization: `Bearer ${newAccessToken}`,
          },
          credentials: 'include',
        });
        console.log('새로운 요청 성공');
        const retryJson = await retryRes.json();
        console.log(retryJson);
        await update({ accessToken: newAccessToken }); // 상태를 업데이트
        return retryJson;
      }
    }

    return resJson; // 정상적인 응답을 반환
  } catch (error) {
    console.error(error);
    throw error; // 에러를 던져서 호출한 쪽에서 처리할 수 있게 함
  }
}
