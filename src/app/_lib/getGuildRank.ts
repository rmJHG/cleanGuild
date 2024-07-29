import { QueryKey } from "@tanstack/react-query";

export default async function getGuildRank({ queryKey }: { queryKey: QueryKey }) {
  const [_1, ranking_type, world_name, guild_name] = queryKey;

  const dt = new Date();
  const currentDt = dt.toLocaleDateString("en-CA");

  if (guild_name) {
    const fetchedData = await fetch(
      `/api/guildRank?ranking_type=${ranking_type}&currentDt=${currentDt}&guild_name=${guild_name}`
    );
    const res = fetchedData.json();
    return res;
  } else {
    const fetchedData = await fetch(
      `/api/guildRank?ranking_type=${ranking_type}&world_name=${world_name}&currentDt=${currentDt}`
    );
    const res = fetchedData.json();
    return res;
  }
}
