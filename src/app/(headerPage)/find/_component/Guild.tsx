import { GuildPostData } from '@/types/guildPostData';
import classes from './styles/guild.module.css';
import { FaDiscord } from 'react-icons/fa';
import { RiKakaoTalkFill } from 'react-icons/ri';

export default function Guild({ data }: { data: GuildPostData }) {
  const { postData, publisherData } = data;
  const {
    title,
    currentNoblePoint,
    guildName,
    guildType,
    postDate,
    limitedLevel,
    limitedSuroPoint,
    limitedFlagPoint,
    discordLink,
    openKakaotalkLink,
  } = postData;
  const { handsData } = publisherData;

  const getTimeDifference = () => {
    const dateDiffInMinutes = (Date.now() - new Date(postDate).getTime()) / 1000 / 60;
    if (dateDiffInMinutes < 1) return '방금 전';
    if (dateDiffInMinutes < 60) return `${Math.floor(dateDiffInMinutes)}분 전`;
    if (dateDiffInMinutes < 1440) return `${Math.floor(dateDiffInMinutes / 60)}시간 전`;
    return `${Math.floor(dateDiffInMinutes / 1440)}일 전`;
  };

  const getBackgroudColor = () => {
    switch (guildType) {
      case '친목':
        return '#534eff';
      case '랭킹':
        return '#ff2828';
      case '솔로':
        return '#3b2594';
      case '자유':
        return '#009c29';
      default:
        return '#cf9223';
    }
  };
  return (
    <div className={classes.postContainer}>
      <div className={classes.postHeader}>
        <div className={classes.guildName}>
          <p>{guildName}</p>
        </div>
        <div className={classes.guildType} style={{ backgroundColor: getBackgroudColor() }}>
          <span>{guildType}</span>
        </div>
      </div>

      <div className={classes.guildConditions}>
        <div className={classes.nobleWrapper}>
          <span>{currentNoblePoint}P</span>
        </div>

        {limitedSuroPoint > 0 && (
          <div className={classes.suroPoint}>
            <span>수로 {limitedSuroPoint}점▴</span>
          </div>
        )}
        {limitedLevel > 0 && (
          <div className={classes.limitedLevel}>
            <span>Lv{limitedLevel}▴</span>
          </div>
        )}
      </div>

      <div className={classes.postMain}>
        <div className={classes.title}>
          <p>{title}</p>
        </div>
      </div>

      <div className={classes.postFooter}>
        <div className={classes.contactContainer}>
          <FaDiscord color={discordLink ? '#5865F2' : 'gray'} width={25} height={15} />
          <RiKakaoTalkFill color={openKakaotalkLink ? '#FEE500' : 'gray'} />
        </div>
        <div className={classes.publisherInfoContainer}>
          <div className={classes.pusblisherName}>
            <p>{handsData.character_name}</p>
          </div>
          <div className={classes.gap}></div>
          <div className={classes.postDate}>
            <p>{getTimeDifference()}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
