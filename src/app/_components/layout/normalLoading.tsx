import classes from './styles/normalLoading.module.css';
export default function NormalLoading({ color }: { color?: string }) {
  return <span className={classes.normalLoading} style={{ borderBlockColor: color }}></span>;
}
