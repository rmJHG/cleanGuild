import Post from "./_component/Post";
import { GuildPostData } from "@/types/guildPostData";

type Props = {
  params: {
    server: string;
    postId: string;
  };
};
export default async function Page({ params }: Props) {
  const { server, postId } = params;
  const decodedServer = decodeURIComponent(server);

  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/guild/getGuildRecruitmentPoster`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json", // 헤더 추가
    },
    body: JSON.stringify({
      world_name: decodedServer,
      _id: postId,
    }),
  });
  const data: GuildPostData = await res.json();
  console.log(data);
  return (
    <>
      <Post data={data} />
    </>
  );
}
