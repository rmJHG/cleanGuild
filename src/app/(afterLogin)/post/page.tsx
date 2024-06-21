"use client";

import { useUserData } from "@/zustand/userDataState";
import { postAction } from "./_lib/postAction";

export default function Page() {
  const { data } = useUserData();
  return (
    <div>
      <form action={postAction}>
        <input type="text" name="guildName" />
        <input type="text" name="server" value={data.info.server} style={{ display: "none" }} readOnly />
        <input type="text" name="userId" value={data.id} style={{ display: "none" }} readOnly />
        <button type="submit">BTN</button>
      </form>
    </div>
  );
}
