export type GuildRankingInfo = {
  date: string;
  world_name: string;
  guild_name: string;
  guild_mark: string;
  guild_master_name: string;
  guild_point: number;
  guild_level: number;
  ranking: number;
};

export type GuildRanking = {
  ranking: GuildRankingInfo[];
};
