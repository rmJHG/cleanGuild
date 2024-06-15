import Link from "next/link";
import Logout from "./Logout";
import Image from "next/image";
import { auth } from "@/auth";

export default async function UserProfile() {
  const session = await auth();
  const image = session?.user!.image as string;
  return (
    <div>
      <ul>
        <li>
          <Image src={image} alt="user profile image" width="50" height="50" />
        </li>
        <li>
          <Logout />
        </li>
        <li>
          <Link href="">인증</Link>
        </li>
      </ul>
    </div>
  );
}
