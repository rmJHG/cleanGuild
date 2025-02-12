import { GuildRankingInfo } from '@/types/guildRanking';
import Image from 'next/image';
import classes from './styles/searchedGuild.module.css';
import Link from 'next/link';
import { ServerName, totalServerList } from '@/app/serverList';
type Props = {
  data: GuildRankingInfo;
};
export default function SearchedGuild({ data }: Props) {
  const {
    date,
    guild_level,
    guild_mark,
    guild_master_name,
    guild_name,
    guild_point,
    ranking,
    world_name,
  } = data;
  const world_icon = totalServerList[world_name as ServerName];

  return (
    <Link href={`/guild/${world_name}/${guild_name}`}>
      <li className={classes.container}>
        <div className={classes.guildInfoContainer}>
          <div className={classes.worldInfo}>
            <Image src={world_icon} alt={world_name} width={15} height={15} />
            <span>{world_name}</span>
          </div>

          <p className={classes.guildName}>{guild_name}</p>
        </div>
      </li>
    </Link>
  );
}
