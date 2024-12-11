import { UserData } from './userData';

export type GuildPostData = {
  _id?: string;
  postId?: string;
  postData: {
    title: string;
    currentNoblePoint: number;
    description: string;
    guildName: string;
    guildType: string;
    postDate: number;
    limitedLevel: number;
    limitedSuroPoint: number;
    limitedFlagPoint: number;
    childGuild: boolean;
    openKakaotalkLink: string;
    managerNameArr: string[];
    guildLevel: number;
    guildMemberCount: number;
    discordLink: string;
  };
  publisherData: UserData;
};
