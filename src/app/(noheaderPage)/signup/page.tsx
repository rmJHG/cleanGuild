'use client';

import classes from './page.module.css';

import Render from './_component/Render';

export default function Page() {
  return (
    <div className={classes.container}>
      <div className={classes.contentContainer}>
        <Render />
      </div>
    </div>
  );
}
