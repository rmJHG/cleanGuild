import Link from "next/link";
import classes from "../../_styles/components/header.module.css";
import Navigation from "../Navigation";
import UserActionBtn from "../UserActionBtn";

export default function Header() {
  return (
    <div className={classes.headerContainer}>
      <div className={classes.titleWrapper}>
        <Link href="/" prefetch={false}>
          <p>Cleanguild</p>
        </Link>
      </div>

      <div className={classes.navigationWrapper}>
        <Navigation />
      </div>

      <div className={classes.userActionWrapper}>
        <UserActionBtn />
      </div>
    </div>
  );
}
