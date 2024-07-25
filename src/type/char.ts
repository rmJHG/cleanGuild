export type Char = {
  error?: {
    message: string;
    name: string;
  };
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
} | null;
