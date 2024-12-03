import { GuildPostData } from "@/types/guildPostData";
import { QueryKey } from "@tanstack/react-query";

export const getPostData = async ({ queryKey }: { queryKey: QueryKey }) => {
  const [_1, decodedServer] = queryKey;
  const dataArr: GuildPostData[] = [];
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/guild/getGuildRecruitments`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json", // 헤더 추가
    },
    body: JSON.stringify({
      world_name: decodedServer,
    }),
  });
  const data = await res.json();
  data.forEach((e: GuildPostData) => {
    dataArr.push({ ...e, postId: e._id });
  });
  console.log(dataArr);
  return dataArr;
};
