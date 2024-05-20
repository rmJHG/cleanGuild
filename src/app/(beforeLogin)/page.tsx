import Link from "next/link";
import SearchBar from "../_component/SearchBar";
import { auth } from "@/auth";

export default async function Page() {
  const session = await auth();
  if (session !== null) {
    console.log(session.user?.email);
  }
  return (
    <div>
      <SearchBar />
      <Link href="/signin">LOGIN</Link>
    </div>
  );
}
