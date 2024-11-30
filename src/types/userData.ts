export type HandsData = {
  character_name: string;
  world_name: string;
  character_image: string;
  character_guild_name: string;
};

export type UserData = {
  dbId: string;
  handsData: HandsData;
  email: string;
  token: string;
  accessToken: string;
  isVerified: boolean;
};
