import { auth } from "@/auth";
import Link from "next/link";
import UserProfile from "./UserProfile";

export default async function UserActionBtn() {
  const session = await auth();

  return !session ? (
    <div>
      <Link href="/signin">
        <p>로그인</p>
      </Link>
    </div>
  ) : (
    <div>
      <UserProfile session={session} />
    </div>
  );
}
