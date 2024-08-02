"use server";

import { auth } from "@/auth";
import { db } from "@/firebase/fireconfig";
import { HandsData } from "@/types/userData";
import { collection, doc, setDoc } from "firebase/firestore";
import { Session } from "next-auth";

export const postAction = async (formData: FormData) => {
  const dt = new Date();
  const session = (await auth()) as Session;
  const { user, expires } = session;
  const { character_guild_name, world_name } = user.handsData as HandsData;

  const guildPostData = {
    postData: {
      title: formData.get("title"),
      description: JSON.parse(formData.get("description") as string),
      guildName: character_guild_name,
      guildType: formData.get("guildType"),
      currentNoblePoint: Number(formData.get("currentNoblePoint")),
      suroPoint: Number(formData.get("suroPoint")),
      limitedLevel: Number(formData.get("limitedLevel")),
      postDate: dt.getTime(),
      childGuild: formData.get("childGuild") === "무",
      managerNameArr: JSON.parse(formData.get("managerNameArr") as string),
      openKakaotalkLink: formData.get("openKakaotalkLink"),
      guildLevel: Number(formData.get("guild_level")),
      guildMemberCount: Number(formData.get("guild_member_count")),
    },
    publisherData: { ...user },
  };
  const coolTimeRef = doc(db, "guild", "postCooltime", world_name, character_guild_name);

  const ref = doc(collection(db, "guild", "post", world_name));
  await setDoc(coolTimeRef, { postCooltime: Date.now() + 30 * 60 * 1000 });
  await setDoc(ref, guildPostData);
};
