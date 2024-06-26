export type MainCharData = {
  main_char: string;
};
export type UserInfo = {
  userName?: string | null;
  userEmail?: string;
  server?: string;
  handsData?: MainCharData;
};

export type UserData = {
  id: string;
  info: UserInfo;
};
