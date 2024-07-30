import { serverList } from "@/app/serverList";
import { GuildRankingInfo } from "@/types/guildRanking";
import Image from "next/image";
import classes from "./styles/searchedGuild.module.css";
type Props = {
  data: GuildRankingInfo;
};
export default function SearchedGuild({ data }: Props) {
  const { date, guild_level, guild_mark, guild_master_name, guild_name, guild_point, ranking, world_name } = data;
  console.log(world_name);
  const [[icon, _1]] = serverList.filter((f) => {
    return f[1] === world_name;
  });

  return (
    <div className={classes.container}>
      <div className={classes.guildInfo}>
        <Image src={icon} alt={world_name} />
        <span>Lv.{guild_level}</span>
        <span>{guild_name}</span>
      </div>
      <div className={classes.guildRanking}>
        <div>
          {world_name}랭킹 {ranking} 등
        </div>
      </div>
    </div>
  );
}
