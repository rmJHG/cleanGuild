"use server";

import { db } from "@/firebase/fireconfig";
import { addDoc, collection } from "firebase/firestore";

export const postAction = async (formData: FormData) => {
  const inputData = {
    guildName: formData.get("guildName"),
    server: formData.get("server"),
    userId: formData.get("userId"),
  };
  await addDoc(collection(db, "guild"), inputData);
};
