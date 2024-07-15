import { auth } from "@/auth";
import Link from "next/link";
import UserProfile from "../(afterLogin)/component/UserProfile";

export default async function UserActionBtn() {
  const session = await auth();
  return !session ? (
    <div>
      <Link href="/signin">Login</Link>
    </div>
  ) : (
    <div>
      <UserProfile />
    </div>
  );
}
