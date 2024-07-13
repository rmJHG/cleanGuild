"use client";
import { useSession } from "next-auth/react";
import classes from "./main.module.css";
import { useUserData } from "@/zustand/userDataState";
import { redirect } from "next/navigation";

export default function Page() {
  const session = useSession();
  const { userData } = useUserData();
  session.data && userData.id === "" && redirect("/user-auth");

  return (
    <div className={classes.description}>
      <p>메이플 인게임 내에서 길드 관련해서</p>
      <p>뉴비분들이 좀 더 편하게 찾기 위해 만들었습니다.</p>
    </div>
  );
}
