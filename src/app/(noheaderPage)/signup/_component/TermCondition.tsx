'use client';

import classes from './_styles/termCondition.module.css';

import { FaCheckCircle } from 'react-icons/fa';

import { useState } from 'react';
import TermsOfService from './TermsOfService';
import PrivacyPolicy from './PrivacyPolicy';
import { useRouter } from 'next/navigation';

export default function TermCondition({ onNext }: { onNext: (nextStep: number) => void }) {
  const route = useRouter();
  const [checkedTermsOfService, setCheckedTermsOfService] = useState(false);
  const [checkedPrivacyPolicy, setCheckedPrivacyPolicy] = useState(false);

  return (
    <div className={classes.container}>
      <div className={classes.titleContainer}>
        <h1
          onClick={() => {
            route.push('/signin');
          }}
        >
          MAPLE GREMIO
        </h1>
      </div>
      <div className={classes.contentContainer}>
        <div className={classes.termsOfServiceContainer}>
          <TermsOfService />
        </div>
        <div className={classes.termsOfServiceContainer}>
          <PrivacyPolicy />
        </div>
        <div className={classes.checkboxContainer}>
          <div onClick={() => setCheckedTermsOfService(!checkedTermsOfService)}>
            <div>
              <FaCheckCircle color={checkedTermsOfService ? '#525fe4' : 'gray'} />
            </div>

            <p>그레미오 이용약관 동의 [필수]</p>
          </div>
          <div onClick={() => setCheckedPrivacyPolicy(!checkedPrivacyPolicy)}>
            <div>
              <FaCheckCircle color={checkedPrivacyPolicy ? '#525fe4' : 'gray'} />
            </div>

            <p>개인정보 수집 및 이용 동의 [필수]</p>
          </div>
        </div>
      </div>
      <div className={classes.btnContainer}>
        <button
          disabled={!checkedPrivacyPolicy || !checkedTermsOfService}
          onClick={() => {
            onNext(2);
          }}
        >
          다음으로
        </button>
      </div>
    </div>
  );
}
