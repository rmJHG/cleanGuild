import { GuildPostData } from "@/types/guildPostData";
import classes from "./guild.module.css";

export default function Guild({ data }: { data: GuildPostData }) {
  const { postData, publisherData } = data;
  const { title, currentNoblePoint, guildName, guildType, postDate, limitedLevel, suroPoint } = postData;
  const { handsData } = publisherData;

  const getTimeDifference = () => {
    const dateDiffInMinutes = (Date.now() - new Date(postDate).getTime()) / 1000 / 60;
    if (dateDiffInMinutes < 1) return "방금 전";
    if (dateDiffInMinutes < 60) return `${Math.floor(dateDiffInMinutes)}분 전`;
    if (dateDiffInMinutes < 1440) return `${Math.floor(dateDiffInMinutes / 60)}시간 전`;
    return `${Math.floor(dateDiffInMinutes / 1440)}일 전`;
  };

  const getBackgroudColor = () => {
    switch (guildType) {
      case "친목":
        return "#2f28ff";
      case "랭킹":
        return "#ff2828";
      case "솔로":
        return "#5a31ff";
      case "자유":
        return "#009c29";
      default:
        return "#cf9223";
    }
  };
  return (
    <div className={classes.postContainer}>
      <header className={classes.postHeader}>
        <div>
          <p>{guildName}</p>
        </div>
        <div className={classes.guildType} style={{ backgroundColor: getBackgroudColor() }}>
          <p>{guildType}</p>
        </div>
      </header>

      <div className={classes.guildConditions}>
        <div className={classes.nobleWrapper}>
          <p>{currentNoblePoint}P</p>
        </div>

        {suroPoint !== 0 && (
          <div className={classes.suroPoint}>
            <p>수로 {suroPoint}점▴</p>
          </div>
        )}
        {limitedLevel !== 0 && (
          <div className={classes.limitedLevel}>
            <p>Lv{limitedLevel}▴</p>
          </div>
        )}
      </div>

      <div className={classes.postMain}>
        <div className={classes.title}>
          <p>{title}</p>
        </div>
      </div>

      <footer className={classes.postFooter}>
        <div className={classes.pusblisherName}>
          <p>{handsData.character_name}</p>
        </div>
        <div className={classes.gap}></div>
        <div className={classes.postDate}>
          <p>{getTimeDifference()}</p>
        </div>
      </footer>
    </div>
  );
}
