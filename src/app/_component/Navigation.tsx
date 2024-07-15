import Link from "next/link";
import classes from "./navigation.module.css";
import { auth } from "@/auth";

export default async function Navigation() {
  const session = await auth();

  return (
    <ul className={classes.navigationContainer}>
      <li>
        <Link href="/">메인</Link>
      </li>
      <li>
        {session?.user.handsData ? (
          <Link href={`/find/${session.user.handsData!.world_name}`}>길드찾기</Link>
        ) : (
          <Link href="/find">길드찾기</Link>
        )}
      </li>
      {session?.user.handsData && (
        <li>
          <Link href="/post">길드홍보</Link>
        </li>
      )}
    </ul>
  );
}
