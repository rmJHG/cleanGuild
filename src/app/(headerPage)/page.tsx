import classes from './_styles/main.module.css';
import GuildRank from '../_components/guildRanking/GuildRank';
import GuildSearchBar from '../_components/SearchBar';
import { auth, unstable_update } from '@/auth';
import TopSuro from '../_components/guildRanking/TopSuro';
import TopFlag from '../_components/guildRanking/TopFlag';
import TopRep from '../_components/guildRanking/TopRep';

export default async function Page() {
  const session = await auth();

  console.log(session);
  return (
    <div className={classes.container} style={{ flex: '1' }}>
      <GuildSearchBar />

      <div className={classes.topContainer}>
        <TopSuro />
        <TopFlag />
        <TopRep />
      </div>
      <div>
        <GuildRank />
      </div>
    </div>
  );
}
