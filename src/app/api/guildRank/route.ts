import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
  const url = new URL(req.url as string);
  const date = url.searchParams.get("date");
  const ranking_type = url.searchParams.get("ranking_type");
  const world_name = url.searchParams.get("world_name");
  const guild_name = url.searchParams.get("guild_name");

  const API_KEY = process.env.NEXT_PUBLIC_API_KEY as string;

  try {
    if (guild_name) {
      const fetchedData = await fetch(
        `https://open.api.nexon.com/maplestory/v1/ranking/guild?date=${date}&ranking_type=${ranking_type}&guild_name=${guild_name}`,
        {
          headers: {
            "x-nxopen-api-key": API_KEY,
          },
        }
      );
      if (!fetchedData.ok) throw new Error(`길드정보를 가져오지 못했습니다.`);

      const json = await fetchedData.json();
      if (json) return NextResponse.json(json);
    } else {
      const fetchedData = await fetch(
        `https://open.api.nexon.com/maplestory/v1/ranking/guild?date=${date}&ranking_type=${ranking_type}&world_name=${world_name}`,
        {
          headers: {
            "x-nxopen-api-key": API_KEY,
          },
        }
      );
      if (!fetchedData.ok) throw new Error(`길드랭킹을 가져오지 못했습니다.`);

      const json = await fetchedData.json();
      if (json) return NextResponse.json(json);
    }
  } catch (e: any) {
    throw new Error(e);
  }
}
