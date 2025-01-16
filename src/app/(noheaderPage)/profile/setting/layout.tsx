import { ReactNode } from 'react';
import classes from './layout.module.css';
import Menu from './_component/Menu';

export default function layout({ children }: { children: ReactNode }) {
  return (
    <div className={classes.container}>
      <div className={classes.menuContainer}>
        <div>
          <Menu iconName="MdHome" text="home" />
        </div>
        <div className={classes.mainMenuContainer}>
          <Menu iconName="CiUser" text="my" />
        </div>
        <div>
          <Menu iconName="IoLogOutOutline" text="signout" />
        </div>
      </div>
      <div className={classes.contentsContainer}>{children}</div>
    </div>
  );
}
