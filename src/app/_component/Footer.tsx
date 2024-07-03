import CharacterImage from "../(afterLogin)/component/CharacterImage";
import classes from "./footer.module.css";
export default function Footer() {
  return (
    <div className={classes.footerWrapper}>
      <CharacterImage />
    </div>
  );
}
