import Link from "next/link";
import classes from "./navigation.module.css";
import { auth } from "@/auth";

export default async function Navigation() {
  const session = await auth();
  const { handsData } = session!.user;

  return (
    <ul className={classes.navigationContainer}>
      <li>
        <Link href="/">
          <p>메인</p>
        </Link>
      </li>
      <li>
        {handsData?.world_name ? (
          <Link href={`/find/${handsData?.world_name}`}>
            <p>길드찾기</p>
          </Link>
        ) : (
          <Link href="/find">
            <p>길드찾기</p>
          </Link>
        )}
      </li>
      {handsData?.character_guild_name && (
        <li>
          <Link href="/post">
            <p>길드홍보</p>
          </Link>
        </li>
      )}
    </ul>
  );
}
