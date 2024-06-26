"use server";

import { db } from "@/firebase/fireconfig";
import { UserData } from "@/type/userData";
import { doc, setDoc } from "firebase/firestore";

export default async function postMainCharAction(preState: any, formData: FormData) {
  const currentMainChar = JSON.parse(formData.get("currentMainCharData") as string);
  const currentUserData: UserData = JSON.parse(formData.get("currentUserData") as string);

  const newUserData = {
    ...currentUserData,
    handsData: {
      main_char: currentMainChar.character_name,
    },
  };
  await setDoc(doc(db, currentUserData.id), newUserData);
  return "done";
}
