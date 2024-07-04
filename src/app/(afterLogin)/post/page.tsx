"use client";

import { useUserData } from "@/zustand/userDataState";
import { postAction } from "./_lib/postAction";

export default function Page() {
  const { userData } = useUserData();
  console.log(userData);
  return (
    <div>
      <form
        action={async (formData: FormData) => {
          formData.append("userData", JSON.stringify(userData));
          await postAction(formData);
        }}
      >
        <input type="text" name="guild_name" />
        <button type="submit">
          <p>BTN</p>
        </button>
      </form>
    </div>
  );
}
