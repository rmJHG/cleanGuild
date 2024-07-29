import CharacterImage from "../../(afterLogin)/component/CharacterImage";
import classes from "../../_styles/components/footer.module.css";
export default function Footer() {
  return (
    <div className={classes.footerWrapper}>
      <p>Data based on NEXON Open API</p>
      <p>jhg990508@gmail.com</p>
      <div className={classes.charWrapper}>
        <CharacterImage />
      </div>
    </div>
  );
}
