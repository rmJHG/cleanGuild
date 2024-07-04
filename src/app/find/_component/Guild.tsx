import { UserInfo } from "@/type/userData";
import classes from "./guild.module.css";
type Props = {
  postData: {
    guildName: string;
    id: string;
    info: UserInfo;
  };
};

export default function Guild({ postData }: Props) {
  console.log(postData);
  const { guildName, id, info } = postData;
  const { handsData, userEmail } = info;
  return (
    <li className={classes.guildPost}>
      <div className={classes.guildName}>
        <p>{guildName}</p>
      </div>
      <div className={classes.postDate}>
        <p>게시일 | 2022.02.02</p>
      </div>
      <div className={classes.posterInfo}>
        <p>{handsData.character_name}</p>
      </div>
    </li>
  );
}
