import Logout from "@/app/_components/Logout";
import UserProfileButton from "@/app/_components/UserProfileButton";
import { Session } from "next-auth";

export default function UserProfile({ session }: { session: Session }) {
  if (!session?.user) return null;
  const { handsData } = session?.user;

  return (
    <>
      {session &&
        (handsData ? <UserProfileButton session={session} characterName={handsData.character_name} /> : <Logout />)}
    </>
  );
}
