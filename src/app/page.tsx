import { auth } from "@/auth";
import classes from "./main.module.css";
import { redirect } from "next/navigation";
import { Session } from "next-auth";
import { UserData } from "@/type/userData";

interface SessionType extends Session {
  userData?: UserData;
}
export default async function Page() {
  const session: SessionType | null = await auth();
  console.log(session);
  session && !session?.userData && redirect("/user-auth");

  return (
    <div className={classes.description}>
      <p>메이플 인게임 내에서 길드 관련해서</p>
      <p>뉴비분들이 좀 더 편하게 찾기 위해 만들었습니다.</p>
    </div>
  );
}
