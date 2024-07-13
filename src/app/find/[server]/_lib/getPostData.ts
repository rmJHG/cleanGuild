import { db } from "@/firebase/fireconfig";
import { QueryKey } from "@tanstack/react-query";
import { collection, getDocs, query } from "firebase/firestore";

export const getPostData = async ({ queryKey }: { queryKey: QueryKey }) => {
  const [_1, decodedServer] = queryKey;
  const dataArr: any[] = [];
  const q = query(collection(db, "guild", "post", decodedServer as string));
  const data = await getDocs(q);
  data.forEach((e) => {
    dataArr.push({ ...e.data(), postId: e.id });
  });
  console.log("데이터 요청");
  return dataArr;
};
