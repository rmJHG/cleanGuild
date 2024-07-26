import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
  const url = new URL(req.url as string);
  const character_name = url.searchParams.get("character_name");
  const dataType = url.searchParams.get("dataType");
  const currentDt = url.searchParams.get("currentDt");

  const API_KEY = process.env.NEXT_PUBLIC_API_KEY as string;

  try {
    const ocidResponse = await fetch(`https://open.api.nexon.com/maplestory/v1/id?character_name=${character_name}`, {
      method: "GET",
      cache: "no-cache",
      headers: {
        "x-nxopen-api-key": API_KEY,
      },
    });
    if (!ocidResponse.ok) {
      throw new Error(`ocid정보를 가져오는데 실패했습니다.`);
    }

    const ocidJson = await ocidResponse.json();

    if (dataType === "charData") {
      const getCharData = await fetch(
        `https://open.api.nexon.com/maplestory/v1/character/basic?ocid=${ocidJson.ocid}`,
        {
          headers: {
            "x-nxopen-api-key": API_KEY,
          },
        }
      );
      if (!getCharData.ok) throw new Error("랜덤캐릭터 정보가 없습니다.");
      const charJson = await getCharData.json();

      return NextResponse.json({ ...charJson, ocid: ocidJson.ocid });
    } else if (dataType === "mainCharInfo") {
      const dt = new Date();
      const currentMonth: string = dt.getMonth() + 1 < 10 ? `0` + (dt.getMonth() + 1) : "" + dt.getMonth() + 1;
      const currentDay = dt.getDay() < 10 ? "0" + dt.getDay() : "" + dt.getDay();
      const currentDt = dt.getFullYear() + "-" + currentMonth + "-" + currentDay;

      const getMainCharData = await fetch(
        `https://open.api.nexon.com/maplestory/v1/ranking/union?ocid=${ocidJson.ocid}&date=${currentDt}&page=1`,
        {
          method: "GET",
          headers: {
            "x-nxopen-api-key": API_KEY,
          },
        }
      );
      const mainCharJson = await getMainCharData.json();

      return NextResponse.json(mainCharJson);
    }
  } catch (error) {
    throw new Error("실패했습니다..");
  }
}
