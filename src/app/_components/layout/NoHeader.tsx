import Link from "next/link";
import classes from "./styles/header.module.css";

export default async function Header() {
  return (
    <div className={classes.headerContainer}>
      <div className={classes.titleWrapper}>
        <Link href="/" prefetch={false}>
          <p>CLEANGUILD</p>
        </Link>
      </div>
    </div>
  );
}
