"use client";
import { useUserData } from "@/zustand/userDataState";
import Link from "next/link";

export default function Navigation() {
  const { userData } = useUserData();

  return (
    <ul>
      <li>
        <Link href="/">Home</Link>
      </li>
      <li>
        {userData.info.handsData?.world_name !== "" ? (
          <Link href={`/find/${userData.info.handsData?.world_name}`}>길드찾기</Link>
        ) : (
          <Link href="/find">길드찾기</Link>
        )}
      </li>
      {userData.info.handsData?.mainChar_name && (
        <li>
          <Link href="/post">길드홍보</Link>
        </li>
      )}
    </ul>
  );
}
