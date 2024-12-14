import classes from './styles/header.module.css';

export default async function Header() {
  return (
    <div className={classes.headerContainer}>
      <div className={classes.innerContainer}>
        <div className={classes.titleWrapper}></div>
      </div>
    </div>
  );
}
