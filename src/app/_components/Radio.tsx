import classes from './styles/Radio.module.css';
export default function Radio({
  setState,
  state,
  value,
}: {
  setState: Function;
  state: string;
  value: string;
}) {
  return (
    <div className={classes.container} onClick={() => setState(value)}>
      <div className={classes.checkBox}>
        {state === value && <div className={classes.checked} />}
      </div>
      <p>{value}</p>
    </div>
  );
}
