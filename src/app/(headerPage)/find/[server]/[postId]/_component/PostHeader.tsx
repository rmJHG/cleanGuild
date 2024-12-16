import { HandsData } from '@/types/userData';
import classes from './styles/postHeader.module.css';
import UserImg from './UserImg';

export default function PostHeader({
  handsData,
  title,
  date,
}: {
  handsData: HandsData;
  title: string;
  date: () => string;
}) {
  return (
    <header className={classes.postHeaderContainer}>
      <div className={classes.titleWrapeer}>
        <h1>{title}</h1>
      </div>

      <div className={classes.publisherInfo}>
        <UserImg imgLink={handsData.character_image} />
        <span className={classes.publisherName}>{handsData.character_name}</span>
        <p className={classes.date}>{date()}</p>
      </div>
    </header>
  );
}
