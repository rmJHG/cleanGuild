import Link from "next/link";
import classes from "./styles/header.module.css";
import Navigation from "../Navigation";
import UserActionBtn from "../UserActionBtn";
import { auth } from "@/auth";

export default async function Header() {
  return (
    <div className={classes.headerContainer}>
      <div className={classes.titleWrapper}>
        <Link href="/" prefetch={false}>
          <p>CLEANGUILD</p>
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
