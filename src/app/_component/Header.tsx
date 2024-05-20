import classes from "./header.module.css";
import Navigation from "./Navigation";

export default function Header() {
  return (
    <div className={classes.headerContainer}>
      <div className={classes.firstContainer}>
        <div>
          <h1>Web Name</h1>
        </div>
        <div></div>
      </div>

      <div className={classes.MenuContainer}>
        <Navigation />
      </div>
    </div>
  );
}
