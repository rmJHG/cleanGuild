import Link from "next/link";
import Logout from "./Logout";

export default function UserProfile() {
  return (
    <div>
      <ul>
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
