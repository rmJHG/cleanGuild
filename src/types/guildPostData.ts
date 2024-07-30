import { UserData } from "./userData";

export type GuildPostData = {
  postId: string;
  postData: {
    title: string;
    currentNoblePoint: number;
    description: string;
    guildName: string;
    guildType: string;
    postDate: number;
    limitedLevel: number;
    suroPoint: number;
    childGuild: boolean;
    openKakaotalkLink: string;
    managerName: string[];
    guildLevel: number;
    guildMemberCount: number;
  };
  publisherData: UserData;
};
