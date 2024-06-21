import Data from "@/app/(beforeLogin)/_component/Data";
import { db } from "@/firebase/fireconfig";
import { collection, getDocs, query, where } from "firebase/firestore";
import Guild from "../_component/Guild";

type Props = {
  params: {
    server: string;
  };
};
export default async function DataTable({ params }: Props) {
  const { server } = params;
  const decodedServer = decodeURIComponent(server);
  const dataArr: any[] = [];
  const q = query(collection(db, "guild"), where("server", "==", decodedServer));
  const data = await getDocs(q);

  data.forEach((e) => {
    console.log("doc", e.data());
    dataArr.push(e.data());
  });

  return (
    <ul>
      {dataArr.map((e, i) => {
        return <Guild key={i} guildName={e.guildName} />;
      })}
    </ul>
  );
}
