import { db } from "@/firebase/fireconfig";
import { collection, getDocs, query, where } from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
  const url = new URL(req.url as string);
  const userEmail = url.searchParams.get("userEmail");

  try {
    const q = query(collection(db, "userData"), where("userEmail", "==", userEmail));
    const getData = await getDocs(q);
    if (getData.empty) return NextResponse.json(`${userEmail}와 관련된 데이터가 없습니다`);

    const { ocid } = getData.docs[0].data();
    if (!ocid) return NextResponse.json("ocid 데이터가 없습니다");

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

    return NextResponse.json({ id: getData.docs[0].id, handsData, ocid: ocid });
  } catch (e) {
    console.error(e);
    throw new Error("error");
  }
}
