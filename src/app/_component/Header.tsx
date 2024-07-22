import Link from "next/link";
import classes from "./header.module.css";
import Navigation from "./Navigation";
import UserActionBtn from "./UserActionBtn";

export default function Header() {
  return (
    <div className={classes.headerContainer}>
      <div className={classes.title}>
        <Link href="/">
          <p>Cleanguild</p>
        </Link>
      </div>

      <Navigation />

      <UserActionBtn />
    </div>
  );
}
