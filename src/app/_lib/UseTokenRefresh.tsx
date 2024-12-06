"use client";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

export default function useTokenRefresh() {
  const { data: session, update } = useSession();

  useEffect(() => {
    // 45분마다 세션 갱신 (토큰 만료 전에 미리 갱신)
    const interval = setInterval(async () => {
      console.log("token refresh");
      await update(); // 세션 강제 업데이트
    }, 45 * 60 * 1000);

    return () => clearInterval(interval);
  }, [update]);

  return null;
}
