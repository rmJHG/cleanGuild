import { GuildPostData } from '@/types/guildPostData';
import { QueryKey } from '@tanstack/react-query';

export const getPostData = async (
  { queryKey }: { queryKey: QueryKey },
  { page }: { page: number }
) => {
  const [_1, decodedServer] = queryKey;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/guild/getGuildRecruitments`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', // 헤더 추가
      },
      body: JSON.stringify({
        world_name: decodedServer,
        page: page - 1,
      }),
    }
  );

  const data = await res.json();

  const result = {
    recruitments: [],
    totalPages: data.totalPages,
  };

  if (data.recruitments) {
    result.recruitments = data.recruitments.map((recruitment: GuildPostData) => {
      return {
        ...recruitment,
      };
    });
  }

  return result;
};
