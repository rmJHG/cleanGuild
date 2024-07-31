import CharacterImage from "../../(afterLogin)/component/CharacterImage";
import classes from "./styles/footer.module.css";
export default function Footer() {
  return (
    <div className={classes.footerWrapper}>
      <p>
        Data based on <span style={{ fontFamily: "SBAggroB" }}>NEXON OPEN API</span>
      </p>
      <p>jhg990508@gmail.com</p>
      <div className={classes.charWrapper}>
        <CharacterImage />
      </div>
    </div>
  );
}
