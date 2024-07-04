"use client";
import { useUserData } from "@/zustand/userDataState";
import Link from "next/link";
import classes from "./navigation.module.css";
export default function Navigation() {
  const { userData } = useUserData();

  return (
    <ul className={classes.navigationContainer}>
      <li>
        <Link href="/">메인</Link>
      </li>
      <li>
        {userData.info.handsData?.world_name !== "" ? (
          <Link href={`/find/${userData.info.handsData?.world_name}`}>길드찾기</Link>
        ) : (
          <Link href="/find">길드찾기</Link>
        )}
      </li>
      {userData.info.handsData?.character_name && (
        <li>
          <Link href="/post">길드홍보</Link>
        </li>
      )}
    </ul>
  );
}
