"use client";
import { useUserData } from "@/zustand/userDataState";
import Link from "next/link";

export default function Navigation() {
  const { data } = useUserData();

  return (
    <ul>
      <li>
        <Link href="/">Home</Link>
      </li>
      <li>
        {data.info.server !== "" ? (
          <Link href={`/find/${data.info.server}`}>길드찾기</Link>
        ) : (
          <Link href="/find">길드찾기</Link>
        )}
      </li>
      {data.info.userName && (
        <li>
          <Link href="/post">길드홍보</Link>
        </li>
      )}
    </ul>
  );
}
