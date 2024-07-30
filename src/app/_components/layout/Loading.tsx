import classes from "./styles/loading.module.css";
export default function Loading() {
  return (
    <div className={classes.loading}>
      <div className={classes.dot}></div>
      <div className={classes.dot}></div>
      <div className={classes.dot}></div>
      <div className={classes.dot}></div>
    </div>
  );
}
