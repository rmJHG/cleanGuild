"use client";

import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { UserData } from "@/type/userData";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/firebase/fireconfig";
import { useUserData } from "@/zustand/userDataState";

export default function GetUserData() {
  const { data: session } = useSession();
  const userEmail = session?.user!.email as string;
  const { setUserData } = useUserData();

  useEffect(() => {
    const fn = async () => {
      const currentUserData: UserData = {
        id: "",
        info: {
          userEmail: "",
          userName: "",
        },
      };
      const q = query(collection(db, "userData"), where("userEmail", "==", userEmail));
      const getData = await getDocs(q);
      getData.forEach((e) => {
        (currentUserData.id = e.id), (currentUserData.info = { ...e.data() });
      });
      setUserData(currentUserData);
    };
    userEmail && fn();
  }, [session]);

  return <></>;
}
