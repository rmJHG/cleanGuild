"use server";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "./firebase/fireconfig";

export const getUserDataDetail = async (userEmail: string) => {
  const q = query(collection(db, "userData"), where("userEmail", "==", userEmail));
  const getData = await getDocs(q);

  if (!getData.empty) {
    const data = { id: getData.docs[0].id, handsData: getData.docs[0].data().handsData };
    return data;
  } else {
    return null;
  }
};
