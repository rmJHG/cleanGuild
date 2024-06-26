import Link from "next/link";
import Logout from "./Logout";
import { auth } from "@/auth";

export default async function UserProfile() {
  const session = await auth();

  return (
    <div>
      <ul>
        <li>
          <Logout />
        </li>
        <li>
          <Link href="/user-auth">인증</Link>
        </li>
      </ul>
    </div>
  );
}
