import classes from './_styles/main.module.css';
import GuildRank from '../_components/guildRanking/GuildRank';
import GuildSearchBar from '../_components/SearchBar';

export default async function Page() {
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
