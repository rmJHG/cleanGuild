type GuildData = {
  date: string | null;
  guild_fame: number;
  guild_level: number;
  guild_master_name: string;
  guild_member: string[];
  guild_member_count: number;
  guild_name: string;
  guild_noblesse_skill: {
    skill_description: string;
    skill_effect: string;
    skill_icon: string;
    skill_level: number;
    skill_name: string;
  }[];
  guild_point: number;
  guild_skill: {
    skill_description: string;
    skill_effect: string;
    skill_icon: string;
    skill_level: number;
    skill_name: string;
  }[];
  world_name: string;
  currentNoblePoint?: number;

  error?: { name: string; message: string };
};
