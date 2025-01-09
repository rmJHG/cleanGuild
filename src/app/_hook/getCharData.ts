import { QueryKey } from '@tanstack/react-query';

export default async function getCharData({ queryKey }: { queryKey: QueryKey }) {
  const [_1, charNames] = queryKey;

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/char/searchCharData`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        charNames,
      }),
    }
  );
  const data = await response.json();
  return data;
}
