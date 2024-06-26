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
        {userData.info.server !== "" ? (
          <Link href={`/find/${userData.info.server}`}>길드찾기</Link>
        ) : (
          <Link href="/find">길드찾기</Link>
        )}
      </li>
      {userData.info.userName && (
        <li>
          <Link href="/post">길드홍보</Link>
        </li>
      )}
    </ul>
  );
}
