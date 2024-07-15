import { auth } from "@/auth";
import classes from "./main.module.css";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await auth();
  session && !session.user.handsData && redirect("/user-auth");

  return (
    <div className={classes.description}>
      <p>메이플 인게임 내에서 길드 관련해서</p>
      <p>뉴비분들이 좀 더 편하게 찾기 위해 만들었습니다.</p>
    </div>
  );
}
