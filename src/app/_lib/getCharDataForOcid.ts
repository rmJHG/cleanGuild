import { QueryKey } from '@tanstack/react-query';

export default async function getCharDataForOcid(
  { queryKey }: { queryKey: QueryKey },
  { ocid }: { ocid: string }
) {
  const [_1] = queryKey;

  const response = await fetch(
    `https://open.api.nexon.com/maplestory/v1/character/basic?ocid=${ocid}`,
    {
      headers: {
        'x-nxopen-api-key': process.env.NEXT_PUBLIC_API_KEY as string,
      },
    }
  );
  const data = await response.json();
  return { ...data, ocid };
}
