import Link from 'next/link';
import classes from './styles/header.module.css';
import Navigation from '../Navigation';
import UserActionBtn from '../UserActionBtn';

export default async function Header() {
  return (
    <div className={classes.headerContainer}>
      <div className={classes.innerContainer}>
        <div className={classes.titleWrapper}>
          <Link href="/" prefetch={false}>
            <p>GREMIO</p>
          </Link>
        </div>

        <div className={classes.navigationWrapper}>
          <Navigation />
        </div>

        <div className={classes.userActionWrapper}>
          <UserActionBtn />
        </div>
      </div>
    </div>
  );
}
