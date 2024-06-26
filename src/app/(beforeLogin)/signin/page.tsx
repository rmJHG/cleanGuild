import { signInWithKaKao } from "@/app/_component/authActions";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await auth();
  return !session ? (
    <div>
      <form action={signInWithKaKao}>
        <button type="submit">KAKAO</button>
      </form>
    </div>
  ) : (
    redirect("/")
  );
}
