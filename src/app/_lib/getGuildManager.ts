import { QueryKey } from '@tanstack/react-query';

export default async function getGuildManager({ queryKey }: { queryKey: QueryKey }) {
  const [_1, world_name, guild_name] = queryKey;
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/guild/getGuildManager?world_name=${world_name}&guild_name=${guild_name}`
  );

  const data = await response.json();
  console.log(data);
  return data;
}
