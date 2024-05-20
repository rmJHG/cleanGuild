import { auth } from "@/auth";
import { Login } from "../_component/Login";
import Logout from "../_component/Logout";

export default async function Page() {
  const session = await auth();
  if (session !== null) {
    return (
      <div>
        <Logout />
      </div>
    );
  }
  return (
    <div>
      <Login />
    </div>
  );
}
