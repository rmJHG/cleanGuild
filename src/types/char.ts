export type Char = {
  error?: {
    message: string;
    name: string;
  };
  access_flag: string;
  character_name: string;
  character_class: string;
  character_class_level: string;
  character_exp: number;
  character_gender: string;
  character_guild_name: string;
  character_image: string;
  character_level: number;
  date: null;
  world_name: string;
  ocid: string;
  popularity?: number;
  character_date_create: string;
  character_exp_rate: string;
  liberation_quest_clear_flag: string;
} | null;
