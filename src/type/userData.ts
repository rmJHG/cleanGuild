export type HandsData = {
  character_name: string;
  world_name: string;
  character_image: string;
};
export type UserInfo = {
  userEmail: string;
  handsData: HandsData;
};

export type UserData = {
  id: string;
  info: UserInfo;
};
