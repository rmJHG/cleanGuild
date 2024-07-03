export type handsData = {
  character_name?: string;
  world_name?: string;
};
export type UserInfo = {
  userEmail?: string;
  handsData?: handsData;
};

export type UserData = {
  id: string;
  info: UserInfo;
};
