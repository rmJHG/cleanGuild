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

  const { character_name, world_name } = data!;
  const route = useRouter();
  const [state, formAction] = useFormState(postMainCharAction, null);
  const { pending } = useFormStatus();

  const currentUserData = {
    handsData: { character_name, world_name },
    userEmail: session.data?.user?.email,
  };

  return state === "done" ? (
    <div>유저정보가 저장되었습니다.</div>
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
            YES
          </button>
          <button
            onClick={() => {
              route.push("/user-auth");
              setInterval(() => {
                window.location.reload();
              }, 100);
            }}
          >
            NO
          </button>
        </form>
      </div>
    </div>
  );
}
