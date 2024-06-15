import { auth } from "@/auth";
import SearchBar from "./_component/SearchBar";
import { Session } from "next-auth";

export default async function Page() {
  const session = (await auth()) as Session;

  return (
    <div>
      <SearchBar />
    </div>
  );
}
