import { UserData } from "./userData";

export type GuildPostData = {
  postId: string;
  postData: {
    title: string;
    currentNoblePoint: number;
    description: string;
    goalNoblePoint: number;
    guildName: string;
    guildType: string;
    postDate: number;
    limitedLevel: number;
    suroPoint: number;
  };
  publisherData: UserData;
};
