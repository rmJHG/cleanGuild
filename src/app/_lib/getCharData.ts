import { QueryKey } from '@tanstack/react-query';

export default async function getCharData({ queryKey }: { queryKey: QueryKey }) {
  const [_1, charName] = queryKey;
  console.log(charName, 'charName');
  const response = await fetch(`/fetchData`, {
    method: 'POST',
    body: JSON.stringify({
      character_name: charName,
    }),
  });

  const data = await response.json();
  return data;
}
