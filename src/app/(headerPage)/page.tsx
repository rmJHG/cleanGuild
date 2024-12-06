import { auth } from "@/auth";
import classes from "./_styles/main.module.css";
import { redirect } from "next/navigation";
import GuildRank from "../_components/guildRanking/GuildRank";
import GuildSearchBar from "../_components/SearchBar";

export default async function Page() {
  const session = await auth();
  session && !session.user.handsData && redirect("/user-auth");

  return (
    <div className={classes.container} style={{ flex: "1" }}>
      <div>
        <GuildSearchBar />
      </div>
      <div>
        <GuildRank />
      </div>
    </div>
  );
}
