import { QueryKey } from "@tanstack/react-query";

export default async function getCharData({ queryKey }: { queryKey: QueryKey }) {
  const [_1, userName] = queryKey;
  console.log(userName, "charName");
  const getOcidData = await fetch(`https://open.api.nexon.com/maplestory/v1/id?character_name=${userName}`, {
    method: "GET",
    headers: {
      "x-nxopen-api-key": process.env.NEXT_PUBLIC_API_KEY as string,
    },
  });
  const ocidRes = await getOcidData.json();

  const getCharData = await fetch(`https://open.api.nexon.com/maplestory/v1/character/basic?ocid=${ocidRes.ocid}`, {
    headers: {
      "x-nxopen-api-key": process.env.NEXT_PUBLIC_API_KEY as string,
    },
  });
  const getCharPopData = await fetch(
    `https://open.api.nexon.com/maplestory/v1/character/popularity?ocid=${ocidRes.ocid}`,
    {
      headers: {
        "x-nxopen-api-key": process.env.NEXT_PUBLIC_API_KEY as string,
      },
    }
  );
  const popRes = await getCharPopData.json();
  const charRes = await getCharData.json();
  const data = {
    popularity: popRes.popularity,
    ...charRes,
  };
  return data;
}
