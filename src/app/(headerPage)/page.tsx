import { auth } from "@/auth";
import classes from "./_styles/main.module.css";
import { redirect } from "next/navigation";
import GuildRank from "../_components/guildRanking/GuildRank";
import GuildSearchBar from "../_components/SearchBar";

export default async function Page() {
  const session = await auth();
  console.log("mainpage session", session);
  session && !session.user.handsData && redirect("/user-auth");

  return (
    <div className={classes.container}>
      <div>
        <GuildSearchBar />
      </div>
      <div>
        <GuildRank />
      </div>
    </div>
  );
}
