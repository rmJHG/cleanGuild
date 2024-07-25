"use server";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "./firebase/fireconfig";

export const getUserDataDetail = async (userEmail: string) => {
  const q = query(collection(db, "userData"), where("userEmail", "==", userEmail));
  const getData = await getDocs(q);

  if (!getData.empty) {
    const { ocid } = getData.docs[0].data();
    if (!ocid) return null;
    const getCharData = await fetch(`https://open.api.nexon.com/maplestory/v1/character/basic?ocid=${ocid}`, {
      headers: {
        "x-nxopen-api-key": process.env.NEXT_PUBLIC_API_KEY as string,
      },
    });
    const { character_name, character_image, character_guild_name, world_name } = await getCharData.json();

    const handsData = {
      character_name,
      character_image,
      character_guild_name,
      world_name,
    };

    return { id: getData.docs[0].id, handsData, ocid: ocid };
  } else {
    return null;
  }
};
