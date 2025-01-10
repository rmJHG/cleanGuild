import { QueryKey } from '@tanstack/react-query';

export const getGuildData = async ({ queryKey }: { queryKey: QueryKey }) => {
  const [_1, world_name, guild_name] = queryKey;
  try {
    const API_KEY = process.env.NEXT_PUBLIC_API_KEY as string;
    if (world_name && guild_name) {
      const getGuildOcid = await fetch(
        `https://open.api.nexon.com/maplestory/v1/guild/id?guild_name=${guild_name}&world_name=${world_name}`,
        {
          method: 'GET',
          headers: {
            'x-nxopen-api-key': API_KEY,
          },
        }
      );
      const ocidJson = await getGuildOcid.json();
      console.log(ocidJson);
      if (ocidJson.error || !ocidJson.oguild_id) return null;

      const guildData = await fetch(
        `https://open.api.nexon.com/maplestory/v1/guild/basic?oguild_id=${ocidJson.oguild_id}`,
        {
          method: 'GET',
          headers: {
            'x-nxopen-api-key': API_KEY,
          },
        }
      );
      const dataJson = await guildData.json();
      if (dataJson.error) {
        throw new Error(dataJson.error);
      }
      return dataJson;
    }
  } catch (error) {
    return error;
  }
};
