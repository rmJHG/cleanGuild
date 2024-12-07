import { QueryKey } from '@tanstack/react-query';

export default async function getCooltime({ queryKey }: { queryKey: QueryKey }) {
  const [_1, world_name, guild_name] = queryKey;
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/guild/getGuildRecruitmentPosterCooltime`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        guild_name: guild_name,
        world_name: world_name,
      }),
    }
  );

  console.log(response);
  const data = await response.json();
  return data;
}
