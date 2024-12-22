import Link from 'next/link';
import classes from './styles/serverList.module.css';
import { mainServerList } from '@/app/serverList';
import Image from 'next/image';

type Props = {
  clicked?: string;
};

export default function ServerList({ clicked }: Props) {
  return (
    <ul className={classes.serverContainer}>
      {Object.entries(mainServerList).map(([worldName, imageUrl], index) => (
        <li
          key={worldName + index}
          className={classes.serverItem}
          style={{ backgroundColor: worldName === clicked ? '#ffffff7f' : 'transparent' }}
        >
          <Link href={`/find/${worldName}`}>
            <Image src={imageUrl} alt={`${worldName} find`} width={14} height={14} />
            <p>{worldName}</p>
          </Link>
        </li>
      ))}
    </ul>
  );
}
