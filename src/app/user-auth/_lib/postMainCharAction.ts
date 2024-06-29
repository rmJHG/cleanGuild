"use server";

import { db } from "@/firebase/fireconfig";
import { UserData } from "@/type/userData";
import { doc, setDoc } from "firebase/firestore";

export default async function postMainCharAction(preState: any, formData: FormData) {
  const { character_name, world_name } = JSON.parse(formData.get("currentMainCharData") as string);
  const { id, info }: UserData = JSON.parse(formData.get("currentUserData") as string);

  const newUserData = {
    ...info,
    handsData: { mainChar_name: character_name, world_name: world_name },
  };

  await setDoc(doc(db, "userData", id), newUserData);
  return "done";
}
