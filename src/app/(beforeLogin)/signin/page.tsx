import { signInWithGoogle, signInWithKaKao, signInWithNaver } from "@/app/_component/authActions";

export default async function Page() {
  return (
    <div>
      <form action={signInWithKaKao}>
        <button type="submit">KAKAO</button>
      </form>
      {/* <form action={signInWithNaver}>
        <button type="submit">Naver</button>
      </form>
      <form action={signInWithGoogle}>
        <button type="submit">google</button>
      </form> */}
    </div>
  );
}
