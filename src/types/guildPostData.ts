import { UserData } from './userData';

export type GuildPostData = {
  message?: string;
  _id: string;
  postData: {
    title: string;
    currentNoblePoint: number;
    description: string;
    guildName: string;
    guildType: string;
    guildContents: string;
    guildMasterName: string;
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

export type GuildPostDataError = {
  message: string;
  error: {
    stringValue: string;
    kind: string;
    value: string;
    valueType: string;
    path: string;
    reason: {};
    name: string;
    message: string;
  };
};
export type GuildPostDataList = {
  recruitments: GuildPostData[];
  totalPages: number;
};
