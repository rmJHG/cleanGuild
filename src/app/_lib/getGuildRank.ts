import { QueryKey } from "@tanstack/react-query";

export default async function getGuildRank({ queryKey }: { queryKey: QueryKey }) {
  const [_1, ranking_type, world_name, guild_name] = queryKey;

  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);
  const date = today.getHours() < 9 ? yesterday.toLocaleDateString("en-CA") : today.toLocaleDateString("en-CA");

  console.log(ranking_type, world_name, guild_name);
  try {
    if (guild_name) {
      const fetchedData = await fetch(
        `/api/guildRank?ranking_type=${ranking_type}&date=${date}&guild_name=${guild_name}`
      );
      const res = fetchedData.json();
      return res;
    } else {
      const fetchedData = await fetch(
        `/api/guildRank?ranking_type=${ranking_type}&date=${date}&world_name=${world_name}`
      );
      const res = fetchedData.json();
      return res;
    }
  } catch (e) {
    console.log(e);
  }
}
