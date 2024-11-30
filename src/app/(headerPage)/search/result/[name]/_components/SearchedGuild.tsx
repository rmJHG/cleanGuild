import { serverList } from "@/app/serverList";
import { GuildRankingInfo } from "@/types/guildRanking";
import Image from "next/image";
import classes from "./styles/searchedGuild.module.css";
import Link from "next/link";
type Props = {
  data: GuildRankingInfo;
};
export default function SearchedGuild({ data }: Props) {
  const { date, guild_level, guild_mark, guild_master_name, guild_name, guild_point, ranking, world_name } = data;
  const [[icon, _1]] = serverList.filter((f) => {
    return f[1] === world_name;
  });

  return (
    <li className={classes.container}>
      <Link href={`/guild/${world_name}/${guild_name}`}>
        <div className={classes.guildInfo}>
          <Image src={icon} alt={world_name} />
          <span className={classes.guildName}>{guild_name}</span>
        </div>
      </Link>
    </li>
  );
}
