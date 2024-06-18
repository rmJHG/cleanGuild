export type UserInfo = {
  userName?: string | null;
  userEmail?: string;
  server?: string;
};

export type UserData = {
  id: string;
  info: UserInfo;
};
