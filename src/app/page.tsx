import { auth } from "@/auth";
import classes from "./_styles/main.module.css";
import { redirect } from "next/navigation";

import GuildRank from "./_components/guildRanking/GuildRank";
import GuildSearchBar from "./_components/GuildSearchBar";

export default async function Page() {
  const session = await auth();
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
