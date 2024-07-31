import { QueryKey } from "@tanstack/react-query";

export default async function getCharData({ queryKey }: { queryKey: QueryKey }) {
  const [_1, guild_member_name] = queryKey;
  try {
    const response = await fetch(`/fetchData?character_name=${guild_member_name}&dataType=charData`, {
      method: "GET",
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const json = await response.json();
    return json;
  } catch (error) {
    throw new Error("error");
  }
}
