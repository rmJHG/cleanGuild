import { UserData } from "./userData";

export type Post = {
  data: {
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
};
