import classes from "./header.module.css";
import Navigation from "./Navigation";
import UserActionBtn from "./UserActionBtn";

export default function Header() {
  return (
    <div className={classes.headerContainer}>
      <div>
        <p>이힝</p>
      </div>

      <Navigation />

      <UserActionBtn />
    </div>
  );
}
