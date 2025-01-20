'use client';
import classes from './page.module.css';
import Render from './_component/Render';
import { useState } from 'react';

export default function Page() {
  const [subTitle, setSubTitle] = useState<string>('');
  return (
    <div className={classes.container}>
      <header className={classes.header}>
        <h2>핸즈인증</h2>
        <p>{subTitle}</p>
      </header>

      <div className={classes.renderWrapper}>
        <Render setSubTitle={setSubTitle} />
      </div>
    </div>
  );
}
