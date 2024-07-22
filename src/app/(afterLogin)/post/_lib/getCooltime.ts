import { db } from "@/firebase/fireconfig";
import { QueryKey } from "@tanstack/react-query";
import { doc, getDoc } from "firebase/firestore";

const getCooltime = async ({ queryKey }: { queryKey: QueryKey }) => {
  const [_1, world_name, guild_name] = queryKey;
  const docRef = doc(db, "guild", "postCooltime", world_name as string, guild_name as string);
  const data = await getDoc(docRef);
  const postCooltime = data.data()!.postCooltime as number;
  if (!postCooltime) return null;

  return postCooltime;
};

export default getCooltime;
