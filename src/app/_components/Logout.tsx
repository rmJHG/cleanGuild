"use client";

import { signOut } from "next-auth/react";

import { useSession } from "next-auth/react";

export default function Logout() {
  const { data: session } = useSession();
  return (
    <button
      onClick={async () => {
        try {
          if (session?.user.loginType === "kakao") {
            // 카카오 계정 완전 로그아웃을 위한 URL
            await fetch(
              `https://kauth.kakao.com/oauth/logout?client_id=${process.env.NEXT_PUBLIC_AUTH_KAKAO_ID}&logout_redirect_uri=${process.env.NEXT_PUBLIC_AUTH_KAKAO_LOGOUT_REDIRECT_URI}&state=${process.env.NEXT_PUBLIC_AUTH_KAKAO_STATE}`
            );
            // 추가: 카카오 계정 연결 해제
            await fetch("https://kapi.kakao.com/v1/user/unlink", {
              headers: {
                Authorization: `Bearer ${session.user.accessToken}`,
              },
            });

            await signOut({
              redirect: true,
              callbackUrl: "/signOut",
            });
          }
          await signOut({
            redirect: true,
            callbackUrl: "/signOut",
          });
        } catch (error) {
          console.error("로그아웃 중 오류 발생:", error);
        }
      }}
    >
      <p>로그아웃</p>
    </button>
  );
}