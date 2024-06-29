import Data from "@/app/(beforeLogin)/_component/Data";
import { db } from "@/firebase/fireconfig";
import { collection, doc, getDocs, query, where } from "firebase/firestore";
import Guild from "../_component/Guild";
import ServerList from "../_component/ServerList";

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
    dataArr.push(e.data());
  });

  return (
    <>
      <div>
        <ServerList />
      </div>
      <ul>
        {dataArr.map((e, i) => {
          return <Guild key={i} guild_name={e.guild_name} user_id={e.user_id} />;
        })}
      </ul>
    </>
  );
}
