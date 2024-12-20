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
    <Link href={`/guild/${world_name}/${guild_name}`}>
      <li className={classes.container}>
        <div className={classes.guildInfoContainer}>
          <div className={classes.worldInfo}>
            <Image src={icon} alt={world_name} />
            <span>{world_name}</span>
          </div>

          <p className={classes.guildName}>{guild_name}</p>
        </div>
      </li>
    </Link>
  );
}
