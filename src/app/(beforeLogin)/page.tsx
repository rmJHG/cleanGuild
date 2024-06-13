import SearchBar from "../_component/SearchBar";
import DataTable from "./_component/DataTable";
import { auth } from "@/auth";

export default async function Page() {
  const session = await auth();
  if (session !== null) {
    console.log(session);
  }
  return (
    <div>
      <SearchBar />
      <DataTable />
    </div>
  );
}
