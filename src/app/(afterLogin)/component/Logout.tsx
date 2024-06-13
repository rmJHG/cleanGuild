import { signOutWithForm } from "@/app/_component/authActions";

export default function Logout() {
  return (
    <form action={signOutWithForm}>
      <button type="submit">LOGOUT</button>
    </form>
  );
}
