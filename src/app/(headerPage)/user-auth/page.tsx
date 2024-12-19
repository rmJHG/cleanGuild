import classes from './page.module.css';
import Render from './_component/Render';
import { auth } from '@/auth';

export default function Page() {
  return (
    <div className={classes.container}>
      <header className={classes.header}>
        <h2>핸즈인증</h2>
        <p>길드를 홍보하려면 핸즈 인증이 필요합니다.</p>
      </header>

      <div className={classes.renderWrapper}>
        <Render />
      </div>
    </div>
  );
}
