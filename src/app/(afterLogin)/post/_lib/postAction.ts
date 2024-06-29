"use server";

import { db } from "@/firebase/fireconfig";
import { collection, doc, setDoc } from "firebase/firestore";

export const postAction = async (formData: FormData) => {
  const server = formData.get("server") as string;
  const inputData = {
    guild_ame: formData.get("guild_name"),
    userId: formData.get("user_id"),
  };

  const ref = doc(collection(db, "guild", "post", server));
  await setDoc(ref, inputData);
};
