import { signInWithKaKao } from "@/app/_components/authActions";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import classes from "./page.module.css";
export default async function Page() {
  const session = await auth();
  return !session ? (
    <div className={classes.signIn}>
      <form action={signInWithKaKao}>
        <button type="submit">
          <p>카카오 로그인</p>
        </button>
      </form>
    </div>
  ) : (
    redirect("/")
  );
}
