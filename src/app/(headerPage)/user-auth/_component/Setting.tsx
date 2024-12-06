"use client";
import CharComponent from "@/app/_components/CharComponent";
import { Char } from "@/types/char";
import { useRouter } from "next/navigation";
import { useFormState, useFormStatus } from "react-dom";
import postMainCharAction from "../_lib/postMainCharAction";
import { signOut } from "next-auth/react";
import classes from "./setting.module.css";
import { successModal } from "@/app/_lib/successModal";
import { errorModal } from "@/app/_lib/errorModal";
import { useEffect } from "react";

type Props = {
  data: Char;
  img: File;
};

export default function Setting({ data, img }: Props) {
  const route = useRouter();
  const [state, formAction] = useFormState(postMainCharAction, null);
  const { pending } = useFormStatus();
  console.log(data);
  useEffect(() => {
    console.log(state);
    if (state?.status === 200) {
      successModal("성공적으로 저장됐습니다 다시 로그인 해주세요!", 2000);
      setTimeout(async () => {
        await signOut({
          redirect: true,
          callbackUrl: "/signOut",
        });
      }, 3000);
    }
    if (state?.status === 400) {
      errorModal("저장에 실패했습니다!");
    }
    if (state?.status === 401) {
      errorModal("토큰이 만료되었습니다!");
    }
    if (state?.status === 500) {
      errorModal("서버 오류가 발생했습니다!");
    }
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
        <button onClick={() => console.log(state)}>status</button>
        <form
          action={(formData) => {
            formData.append("image", img);
            formData.append("ocid", data!.ocid);
            formAction(formData);
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
