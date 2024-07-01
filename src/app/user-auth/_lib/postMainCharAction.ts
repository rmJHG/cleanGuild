"use server";

import { db } from "@/firebase/fireconfig";

import { addDoc, collection, doc, setDoc } from "firebase/firestore";

export default async function postMainCharAction(preState: any, formData: FormData) {
  const currentUserData = JSON.parse(formData.get("currentUserData") as string);

  await addDoc(collection(db, "userData"), currentUserData);
  return "done";
}
