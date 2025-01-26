import classes from './_styles/main.module.css';
import GuildRank from '../_components/guildRanking/GuildRank';
import GuildSearchBar from '../_components/SearchBar';
import TopContainer from '../_components/guildRanking/TopContainer';
import { auth } from '@/auth';

export default async function Page() {
  const session = await auth();
  console.log(session, 'session');
  return (
    <div className={classes.container} style={{ flex: '1' }}>
      <GuildSearchBar />

      <div className={classes.topContainer}>
        <TopContainer dataType="2" header="지하수로 TOP5" />
        <TopContainer dataType="1" header="플래그 TOP5" />
        <TopContainer dataType="0" header="명성치 TOP5" />
      </div>
      <div>
        <GuildRank />
      </div>
    </div>
  );
}
