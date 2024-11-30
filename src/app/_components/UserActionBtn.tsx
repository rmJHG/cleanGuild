import { auth } from "@/auth";
import Link from "next/link";
import UserProfile from "./UserProfile";

export default async function UserActionBtn() {
  const session = await auth();
  console.log("UserActionBtn session", session);

  return !session ? (
    <div>
      <Link href="/signin">Login</Link>
    </div>
  ) : (
    <div>
      <UserProfile session={session} />
    </div>
  );
}
