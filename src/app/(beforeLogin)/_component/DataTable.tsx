import { db } from "@/firebase/fireconfig";
import { collection, getDocs } from "firebase/firestore";
import Data from "./Data";

export default async function DataTable() {
  const dataArr: any[] = [];
  const query = await getDocs(collection(db, "hello"));
  query.forEach((e) => dataArr.push(e.data() as object));

  return (
    <ul>
      {dataArr.map((e, i) => {
        return <Data key={i} userName={e.name as string} age={e?.age as number} />;
      })}
    </ul>
  );
}
