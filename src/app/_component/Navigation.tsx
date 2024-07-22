import Link from "next/link";
import classes from "./navigation.module.css";
import { auth } from "@/auth";
import { Session } from "next-auth";

export default async function Navigation() {
  const session = (await auth()) as Session;
  const handsData = session?.user.handsData || null;

  return (
    <ul className={classes.navigationContainer}>
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
      {handsData?.character_guild_name ? (
        <li>
          <Link href="/post">
            <p>길드홍보</p>
          </Link>
        </li>
      ) : (
        <div></div>
      )}
    </ul>
  );
}
