"use server";

import { db } from "@/firebase/fireconfig";
import { UserData } from "@/type/userData";
import { collection, doc, setDoc } from "firebase/firestore";

export const postAction = async (formData: FormData) => {
  const dt = new Date();

  const userData: UserData = JSON.parse(formData.get("userData") as string);
  const { info } = userData;
  const { world_name } = info.handsData;
  const { character_guild_name } = info.handsData;
  const guildPostData = {
    postData: {
      title: formData.get("title"),
      description: formData.get("description"),
      guildName: character_guild_name,
      guildType: formData.get("guildType"),
      currentNoblePoint: Number(formData.get("currentNoblePoint")),
      suroPoint: Number(formData.get("suroPoint")),
      limitedLevel: Number(formData.get("limitedLevel")),
      postDate: dt.getTime(),
    },
    publisherData: { ...userData },
  };
  const coolTimeRef = doc(db, "guild", "postCooltime", world_name, character_guild_name);

  const ref = doc(collection(db, "guild", "post", world_name));
  await setDoc(coolTimeRef, { postCoolTime: Date.now() });
  await setDoc(ref, guildPostData);
};
