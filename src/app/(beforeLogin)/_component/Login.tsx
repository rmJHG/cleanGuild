import { signInWithNaver, signinWithGoogle } from "@/app/_component/authActions";

export function Login() {
  return (
    <>
      <form action={signInWithNaver}>
        <button type="submit">네이버로그인</button>
      </form>

      <form action={signinWithGoogle}>
        <button type="submit">GOOGLE</button>
      </form>
    </>
  );
}
