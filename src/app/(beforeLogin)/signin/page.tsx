import { signInWithKaKao } from "@/app/_component/authActions";

export default async function Page() {
  return (
    <div>
      <form action={signInWithKaKao}>
        <button type="submit">KAKAO</button>
      </form>
    </div>
  );
}
