import { db } from "@/firebase/fireconfig";
import { collection, getDocs, query } from "firebase/firestore";
import Guild from "../_component/Guild";
import ServerList from "../_component/ServerList";
import classes from "./page.module.css";
import Link from "next/link";
type Props = {
  params: {
    server: string;
  };
};
export default async function DataTable({ params }: Props) {
  const { server } = params;
  const decodedServer = decodeURIComponent(server);
  const dataArr: any[] = [];
  const q = query(collection(db, "guild", "post", decodedServer));
  const data = await getDocs(q);
  data.forEach((e) => {
    dataArr.push({ ...e.data(), postId: e.id });
  });

  return (
    <div className={classes.container}>
      <div>
        <ServerList />
      </div>
      <ul className={classes.guildPostList}>
        {dataArr.map((e) => {
          return (
            <li key={e.id}>
              <Link href={`/find/${server}/${e.postId}`}>
                <Guild data={e} />
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
