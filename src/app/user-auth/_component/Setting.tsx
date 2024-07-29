"use client";
import CharComponent from "@/app/_components/CharComponent";
import { Char } from "@/types/char";
import { redirect, useRouter } from "next/navigation";
import { useFormState, useFormStatus } from "react-dom";
import postMainCharAction from "../_lib/postMainCharAction";
import { signOut, useSession } from "next-auth/react";
import classes from "./setting.module.css";
import { successModal } from "@/app/_lib/successModal";
import { errorModal } from "@/app/_lib/errorModal";
import { useEffect } from "react";

type Props = {
  data: Char;
};

export default function Setting({ data }: Props) {
  const session = useSession();
  !session && redirect("/");

  const { ocid } = data!;
  const route = useRouter();
  const [state, formAction] = useFormState(postMainCharAction, null);
  const { pending } = useFormStatus();

  const currentUserData = {
    userEmail: session.data?.user?.email,
    ocid,
  };
  useEffect(() => {
    if (state === "success") successModal("성공적으로 저장됐습니다 다시 로그인 해주세요!");
    if (state === "error") errorModal("저장에 실패했습니다!");
  }, [state]);

  useEffect(() => {});
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
            setTimeout(async () => {
              await signOut();
            }, 3000);
          }}
        >
          {pending ? (
            <p>^_^</p>
          ) : (
            <>
              <button type="submit">
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
            </>
          )}
        </form>
      </div>
    </div>
  );
}
