import Link from "next/link";
import classes from "./navigation.module.css";
import { auth } from "@/auth";
import { Session } from "next-auth";
import { redirect } from "next/navigation";

export default async function Navigation() {
  const session = (await auth()) as Session;
  if (!session) return null;
  const handsData = session.user.handsData;

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

      <li>
        <Link href="/post" prefetch={false}>
          <p>길드홍보</p>
        </Link>
      </li>
    </ul>
  );
}
