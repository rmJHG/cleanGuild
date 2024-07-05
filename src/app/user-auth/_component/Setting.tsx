"use client";
import CharComponent from "@/app/_component/CharComponent";
import { Char } from "@/type/char";

import { redirect, useRouter } from "next/navigation";
import { useFormState, useFormStatus } from "react-dom";
import postMainCharAction from "../_lib/postMainCharAction";

import { useSession } from "next-auth/react";
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

  return state === "done" ? (
    <div>
      <p>유저정보가 저장되었습니다.</p>
    </div>
  ) : (
    <div>
      <CharComponent data={data} />

      <div>
        <div>
          <p>you?</p>
        </div>
        <form
          action={(formData: FormData) => {
            formData.append("currentUserData", JSON.stringify(currentUserData));
            formAction(formData);
          }}
        >
          <button type="submit" disabled={pending}>
            <p>YES</p>
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
            <p>NO</p>
          </button>
        </form>
      </div>
    </div>
  );
}
