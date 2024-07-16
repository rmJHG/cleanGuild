"use client";
import { redirect, useRouter } from "next/navigation";
import classes from "./page.module.css";
import { useSession } from "next-auth/react";
export default function Page() {
  const { data: session } = useSession();
  session && redirect("/");
  const route = useRouter();

  return (
    <div className={classes.authFinishContainer}>
      <div>
        <p>유저 정보가 저장되었습니다 다시 로그인 해주세요!</p>
      </div>
      <div>
        <button
          onClick={() => {
            route.push("/");
          }}
        >
          <p>홈으로</p>
        </button>
      </div>
    </div>
  );
}
