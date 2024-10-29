"use client";

import { signOut } from "next-auth/react";

export default function Logout() {
  return (
    <button
      onClick={async () => {
        const fetched = await fetch(
          `https://kauth.kakao.com/oauth/logout?client_id=64d5748894dee25a2ce3116df9a73751&logout_redirect_uri=http://www.localhost:3000/signout}`
        );
        const json = await fetched.json();
        console.log(json);
        signOut({ callbackUrl: "/", redirect: true });
      }}
    >
      <p>로그아웃</p>
    </button>
  );
}
