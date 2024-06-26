"use client";
import CharComponent from "@/app/_component/CharComponent";
import { Char } from "@/type/char";

import { useRouter } from "next/navigation";
import { useFormState, useFormStatus } from "react-dom";
import postMainCharAction from "../_lib/postMainCharAction";
import { useUserData } from "@/zustand/userDataState";
type Props = {
  data: Char;
};
export default function Setting({ data }: Props) {
  const { userData } = useUserData();
  const route = useRouter();
  const [state, formAction] = useFormState(postMainCharAction, null);
  const { pending } = useFormStatus();

  return (
    <div>
      <CharComponent data={data} />
      {pending ? (
        <div>데이터처리중.</div>
      ) : (
        <div>
          <div>
            <p>you?</p>
          </div>

          <form
            action={async (formData: FormData) => {
              formData.append("currentMainCharData", JSON.stringify(data));
              formData.append("currentUserData", JSON.stringify(userData));
              await formAction(formData);
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
      )}
    </div>
  );
}
