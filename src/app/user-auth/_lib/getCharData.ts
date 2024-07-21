export default async function getCharData({ dataType, character_name }: { dataType: string; character_name: string }) {
  console.log(dataType, character_name);
  const getOcidData = await fetch(`https://open.api.nexon.com/maplestory/v1/id?character_name=${character_name}`, {
    method: "GET",
    headers: {
      "x-nxopen-api-key": process.env.NEXT_PUBLIC_API_KEY as string,
    },
  });
  const ocidJson = await getOcidData.json();
  if (ocidJson.error) return null;

  if (dataType === "charInfo") {
    const getCharData = await fetch(`https://open.api.nexon.com/maplestory/v1/character/basic?ocid=${ocidJson.ocid}`, {
      headers: {
        "x-nxopen-api-key": process.env.NEXT_PUBLIC_API_KEY as string,
      },
    });
    const charJson = await getCharData.json();
    return charJson;
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
          "x-nxopen-api-key": process.env.NEXT_PUBLIC_API_KEY as string,
        },
      }
    );
    const mainCharJson = await getMainCharData.json();

    return mainCharJson;
  }
}
