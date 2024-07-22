import { db } from "@/firebase/fireconfig";
import { QueryKey } from "@tanstack/react-query";
import { collection, doc, getDoc, getDocs, query } from "firebase/firestore";

export const getGuildData = async ({ queryKey }: { queryKey: QueryKey }) => {
  const [_1, world_name, guild_name] = queryKey;

  if (world_name && guild_name) {
    const getGuildOcid = await fetch(
      `https://open.api.nexon.com/maplestory/v1/guild/id?guild_name=${guild_name}&world_name=${world_name}`,
      {
        method: "GET",
        headers: {
          "x-nxopen-api-key": process.env.NEXT_PUBLIC_API_KEY as string,
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
          "x-nxopen-api-key": process.env.NEXT_PUBLIC_API_KEY as string,
        },
      }
    );
    const dataJson = await guilData.json();
    if (dataJson.error) return null;
    return dataJson;
  }
};
