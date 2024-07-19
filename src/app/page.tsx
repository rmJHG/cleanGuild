import { auth } from "@/auth";
import classes from "./main.module.css";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await auth();
  session && !session.user.handsData && redirect("/user-auth");

  return (
    <div className={classes.description}>
      <p>메이플 인 게임 내에서 길드 관련 기능이</p>
      <p>
        <span style={{ color: "red" }}>부족</span>하다고 느껴
      </p>
      <p>
        뉴비분들이 좀 더 <span style={{ color: "#208fff" }}>편하게</span> 자신이 원하는
      </p>
      <p>길드를 쉽게 찾도록 하기 위해</p>
      <p>제작하였습니다.</p>
    </div>
  );
}
