import Loading from "@/app/_components/layout/Loading";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
export default async function Page() {
  const session = await auth();

  if (session) {
    redirect("/");
  }
  return (
    <div>
      <Loading />
    </div>
  );
}
