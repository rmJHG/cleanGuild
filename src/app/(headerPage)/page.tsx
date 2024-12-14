import classes from './_styles/main.module.css';
import GuildRank from '../_components/guildRanking/GuildRank';
import GuildSearchBar from '../_components/SearchBar';
import { auth, unstable_update } from '@/auth';

export default async function Page() {
  // const session = await auth();

  return (
    <div className={classes.container} style={{ flex: '1' }}>
      <div>
        <GuildSearchBar />
      </div>
      <div>
        <GuildRank />
      </div>
    </div>
  );
}
