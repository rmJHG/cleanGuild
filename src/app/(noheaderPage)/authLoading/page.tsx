"use client";

import Loading from "@/app/_components/layout/Loading";
import { errorModal } from "@/app/_lib/errorModal";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Page() {
  const { data: session, status, update } = useSession();
  console.log(session, status);
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/");
      localStorage.removeItem("authRetryCount");
    }

    if (status === "unauthenticated") {
      const retryCount = Number(localStorage.getItem("authRetryCount") || 0);

      if (retryCount >= 5) {
        localStorage.removeItem("authRetryCount");
        errorModal("서버 오류가 발생했습니다. 다시 시도해주세요.");
        router.push("/signin");
      } else {
        localStorage.setItem("authRetryCount", String(retryCount + 1));
        window.location.reload();
      }
    }
  }, [status, router]);
  return (
    <div>
      <Loading />
    </div>
  );
}
