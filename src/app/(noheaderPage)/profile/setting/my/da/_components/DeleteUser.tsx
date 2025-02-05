import classes from './_styles/deleteUser.module.css';
export default function DeleteUser({ setIsNext }: { setIsNext: (value: boolean) => void }) {
  return (
    <div className={classes.container} onClick={() => setIsNext(false)}>
      <div className={classes.innerContainer} onClick={(e) => e.stopPropagation()}>
        helloworld
      </div>
    </div>
  );
}
