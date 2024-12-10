import CharacterImage from '../CharacterImage';
import classes from './styles/footer.module.css';
export default function Footer() {
  return (
    <div className={classes.footerWrapper}>
      <p>
        CONTACT : <span>cleanguilkr@gmail.com</span>
      </p>
      <p>
        Data based on <span style={{ fontFamily: 'SBAggroB' }}>NEXON OPEN API</span>
      </p>

      <div className={classes.charWrapper}>
        <CharacterImage />
      </div>
    </div>
  );
}
