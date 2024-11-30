import { QueryKey } from "@tanstack/react-query";

export const getSearchGuildsData = async ({ queryKey }: { queryKey: QueryKey }) => {
  const [_1, guild_name] = queryKey;
  const API_KEY = process.env.NEXT_PUBLIC_API_KEY as string;
  const world_name: string[] = [
    "스카니아",
    "베라",
    "루나",
    "제니스",
    "크로아",
    "유니온",
    "엘리시움",
    "이노시스",
    "레드",
    "오로라",
    "아케인",
    "노바",
    "리부트",
    "리부트2",
    "버닝",
    "버닝2",
    "버닝3",
  ];
  if (guild_name) {
    const getGuildOcid = await fetch(
      `https://open.api.nexon.com/maplestory/v1/guild/id?guild_name=${guild_name}&world_name=${world_name}`,
      {
        method: "GET",
        headers: {
          "x-nxopen-api-key": API_KEY,
        },
      }
    );
    const ocidJson = await getGuildOcid.json();
    if (ocidJson.error) return null;

    const guilData = await fetch(
      `https://open.api.nexon.com/maplestory/v1/guild/basic?oguild_id=${ocidJson.oguild_id}`,
      {
        method: "GET",
        headers: {
          "x-nxopen-api-key": API_KEY,
        },
      }
    );
    const dataJson = await guilData.json();
    console.log(dataJson);
    if (dataJson.error) return null;
    return dataJson;
  }
};
