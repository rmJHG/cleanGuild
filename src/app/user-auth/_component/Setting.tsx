"use client";
import CharComponent from "@/app/_component/CharComponent";
import { Char } from "@/type/char";
import { redirect, useRouter } from "next/navigation";
import { useFormState, useFormStatus } from "react-dom";
import postMainCharAction from "../_lib/postMainCharAction";
import { signOut, useSession } from "next-auth/react";

import classes from "./setting.module.css";

type Props = {
  data: Char;
};

export default function Setting({ data }: Props) {
  const session = useSession();
  !session && redirect("/");

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
      <div>
        <CharComponent data={data} />
      </div>

      <div className={classes.userCheckContainer}>
        <div>
          <p>본인의 메인캐릭터가 맞으신가요? 신중하게 선택해주세요.</p>
        </div>
        <form
          action={async (formData: FormData) => {
            formData.append("currentUserData", JSON.stringify(currentUserData));
            formAction(formData);
            await signOut({ callbackUrl: "/user-auth/success", redirect: true });
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
            <p>아니요ㅠ_ㅠ</p>
          </button>
        </form>
      </div>
    </div>
  );
}
