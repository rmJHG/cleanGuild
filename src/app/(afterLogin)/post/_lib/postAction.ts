"use server";

import { db } from "@/firebase/fireconfig";
import { HandsData, UserData } from "@/type/userData";
import { collection, doc, setDoc } from "firebase/firestore";

export const postAction = async (formData: FormData) => {
  const userData: UserData = JSON.parse(formData.get("userData") as string);
  const guildName = formData.get("guild_name");
  const { id } = userData;
  const { world_name } = userData.info.handsData;
  const inputData = { guildName: guildName, ...userData };
  const ref = doc(collection(db, "guild", "post", world_name));
  await setDoc(ref, inputData);
};
