"use client";

import { useUserData } from "@/zustand/userDataState";
import { postAction } from "./_lib/postAction";

export default function Page() {
  const { userData } = useUserData();
  const { id, info } = userData;
  console.log(info);
  return (
    <div>
      <form
        action={async (formData: FormData) => {
          formData.append("user_id", id);
          formData.append("server", info.server as string);
          await postAction(formData);
        }}
      >
        <input type="text" name="guild_name" />

        <button type="submit">BTN</button>
      </form>
    </div>
  );
}
