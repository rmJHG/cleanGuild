'use client';

import { signOut } from 'next-auth/react';
import { useSession } from 'next-auth/react';

export default function Logout() {
  const { data: session } = useSession();
  return (
    <button
      onClick={async () => {
        console.log(session);
        try {
          if (session?.user.loginType === 'kakao') {
            await fetch(
              `https://kauth.kakao.com/oauth/logout?client_id=${process.env.NEXT_PUBLIC_AUTH_KAKAO_ID}&logout_redirect_uri=${process.env.NEXT_PUBLIC_AUTH_KAKAO_LOGOUT_REDIRECT_URI}&state=${process.env.NEXT_PUBLIC_AUTH_KAKAO_STATE}`
            );
            await fetch('https://kapi.kakao.com/v1/user/unlink', {
              headers: {
                Authorization: `Bearer ${session.user.accessToken}`,
              },
            });
          }

          // 서버 로그아웃 API 호출
          await fetch(`/api/auth/logout`, {
            method: 'POST',
            credentials: 'include',
          });

          await signOut({
            redirect: true,
            callbackUrl: '/signOut',
          });
        } catch (error) {
          console.error('로그아웃 중 오류 발생:', error);
        }
      }}
    >
      <p>로그아웃</p>
    </button>
  );
}
