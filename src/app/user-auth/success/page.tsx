"use client";
import { redirect, useRouter } from "next/navigation";
import classes from "./page.module.css";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Loading from "@/app/_component/Loading";

export default function Page() {
  const [isLoading, setIsLoading] = useState(false);
  const { data: session } = useSession();
  session && redirect("/");
  const route = useRouter();
  const ref = document.referrer;
  useEffect(() => {
    // if (
    //   ref !== "http://cleanguild.kr/user-auth" &&
    //   ref !== "http://localhost:3000/user-auth" &&
    //   ref !== "http://192.168.0.4:3000/user-auth"
    // ) {
    //   route.push("/");
    // }
    // setIsLoading(false);
  }, []);

  {
    return isLoading ? (
      <Loading />
    ) : (
      <div className={classes.authFinishContainer}>
        <div>
          <p>{ref}</p>
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
}
