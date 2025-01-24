'use client';

import { signOut, useSession } from 'next-auth/react';

export default function Logout() {
  const { data: session } = useSession();
  return (
    <button
      onClick={async () => {
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
        signOut({ redirect: true, callbackUrl: '/signOut' });
      }}
    >
      <p>로그아웃</p>
    </button>
  );
}
