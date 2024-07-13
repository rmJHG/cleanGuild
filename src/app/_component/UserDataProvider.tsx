"use client";

import { useSession } from "next-auth/react";
import { ReactNode, useEffect, useState } from "react";
import { UserData } from "@/type/userData";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/firebase/fireconfig";
import { useUserData } from "@/zustand/userDataState";
import Loading from "./Loading";
type Props = {
  children: ReactNode;
};
export default function UserDataProvider({ children }: Props) {
  const { data: session } = useSession();
  const userEmail = session?.user!.email as string;
  const { userData, setUserData } = useUserData();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fn = async () => {
      setIsLoading(true);
      const currentUserData: UserData = {
        id: "",
        info: {
          userEmail: "",
          handsData: {
            character_image: "",
            character_guild_name: "",
            character_name: "",
            world_name: "",
          },
        },
      };
      try {
        const q = query(collection(db, "userData"), where("userEmail", "==", userEmail));
        const getData = await getDocs(q);

        getData.forEach((e) => {
          (currentUserData.id = e.id), (currentUserData.info = { ...e.data() } as UserData["info"]);
        });
      } catch (error) {
        console.log(error);
      }
      setUserData(currentUserData);
      setIsLoading(false);
    };
    userEmail && fn();
  }, []);

  if (isLoading) {
    return <Loading />;
  } else {
    return <>{children}</>;
  }
}
