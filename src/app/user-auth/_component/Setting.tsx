"use client";
import CharComponent from "@/app/_component/CharComponent";
import { Char } from "@/type/char";
import { redirect, useRouter } from "next/navigation";
import { useFormState, useFormStatus } from "react-dom";
import postMainCharAction from "../_lib/postMainCharAction";
import { useSession } from "next-auth/react";
import { useUserData } from "@/zustand/userDataState";
import classes from "./setting.module.css";
type Props = {
  data: Char;
};

export default function Setting({ data }: Props) {
  const session = useSession();
  !session && redirect("/");
  const { userData, setUserData } = useUserData();
  const { character_name, world_name, character_image, character_guild_name } = data!;
  const route = useRouter();
  const [state, formAction] = useFormState(postMainCharAction, null);
  const { pending } = useFormStatus();

  const currentUserData = {
    handsData: { character_name, world_name, character_image, character_guild_name },
    userEmail: session.data?.user?.email,
  };

  return (
    <div className={classes.container}>
      {state === "done" ? (
        <div className={classes.infoSavedContainer}>
          <div>
            <p>유저 정보가 저장되었습니다.</p>
          </div>
          <div>
            <button
              onClick={() => {
                window.location.reload();
                route.push("/");
              }}
            >
              <p>홈으로</p>
            </button>
          </div>
        </div>
      ) : (
        <div>
          <CharComponent data={data} />

          <div className={classes.userCheckContainer}>
            <div>
              <p>본인의 메인캐릭터가 맞으신가요? 신중하게 선택해주세요.</p>
            </div>
            <form
              action={(formData: FormData) => {
                formData.append("currentUserData", JSON.stringify(currentUserData));
                formAction(formData);
              }}
            >
              <button type="submit" disabled={pending}>
                <p>맞아요^-^</p>
              </button>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  route.push("/user-auth");
                  setInterval(() => {
                    window.location.reload();
                  }, 100);
                }}
              >
                <p>아니요..</p>
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
