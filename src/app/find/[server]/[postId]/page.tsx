import { db } from "@/firebase/fireconfig";
import { doc, getDoc } from "firebase/firestore";
import Post from "./_component/Post";
import { GuildPostData } from "@/type/guildPostData";

type Props = {
  params: {
    server: string;
    postId: string;
  };
};
export default async function Page({ params }: Props) {
  const { server, postId } = params;
  const decodedServer = decodeURIComponent(server);
  const docRef = doc(db, "guild", "post", decodedServer, postId);
  const data = (await getDoc(docRef)).data() as GuildPostData;

  return (
    <>
      <Post data={data} />
    </>
  );
}
