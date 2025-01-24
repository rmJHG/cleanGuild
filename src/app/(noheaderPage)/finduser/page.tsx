'use client';
import { useEffect, useRef, useState } from 'react';
import classes from './page.module.css';
import { errorModal } from '@/app/_lib/errorModal';
import Loading from '@/app/_components/layout/Loading';
import { successModal } from '@/app/_lib/successModal';

export default function Page() {
  const [isLoading, setIsLoading] = useState(false);
  const [content, setContent] = useState('password');
  const [emailResult, setEmailResult] = useState('');
  const charNameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);

  const findEmailHandler = async () => {
    setIsLoading(true);
    try {
      const charName = charNameRef.current!.value;
      console.log(charName);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/user/local/findUserEmail?charName=${charName}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      const data = await res.json();
      console.log(data);
      if (res.ok) {
        setEmailResult(data);
      }
      setIsLoading(false);
    } catch (error: any) {
      errorModal(error.message);
      setIsLoading(false);
    }
  };

  const resetPasswordHandler = async () => {
    setIsLoading(true);
    try {
      const email = emailRef.current!.value;
      const charName = charNameRef.current!.value;
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/user/local/resetUserPassword`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, charName }),
        }
      );
      const data = await res.json();
      if (res.ok) {
        successModal(data, 1000);
      }

      setIsLoading(false);
    } catch (error: any) {
      errorModal(error.message);
      setIsLoading(false);
    }
  };
  useEffect(() => {
    if (content === 'password') {
      setEmailResult('');
    }
  }, [content]);
  return (
    <div className={classes.container}>
      <div className={classes.titleContainer}>
        <h2>MAPLEGREMIO</h2>
      </div>
      <div className={classes.innerContainer}>
        <div className={classes.menuContainer}>
          <div
            onClick={() => setContent('email')}
            style={{
              backgroundColor: content === 'email' ? 'transparent' : 'var(--header-color)',
              color: content === 'email' ? 'black' : 'white',
            }}
          >
            <p>이메일 찾기</p>
          </div>
          <div
            onClick={() => setContent('password')}
            style={{
              backgroundColor: content === 'password' ? 'transparent' : 'var(--header-color)',
              color: content === 'password' ? 'black' : 'white',
            }}
          >
            <p>비밀번호 찾기</p>
          </div>
        </div>
        <div className={classes.contentContainer}>
          {isLoading ? (
            <Loading />
          ) : (
            content === 'email' && (
              <div className={classes.emailContainer}>
                {emailResult ? (
                  <>
                    <p>검색 결과</p>
                    <p>{emailResult}</p>
                  </>
                ) : (
                  <>
                    <p>본인 계정에 핸즈 인증으로 추가한</p>
                    <p>메인 캐릭터 또는 부캐릭터의 닉네임을 입력해주세요.</p>
                    <input
                      type="text"
                      placeholder="캐릭터 이름"
                      ref={charNameRef}
                      onKeyUp={(e) => {
                        e.key === 'Enter' && findEmailHandler();
                      }}
                    />
                    <button onClick={findEmailHandler}>이메일 찾기</button>
                  </>
                )}
              </div>
            )
          )}
          {isLoading ? (
            <Loading />
          ) : (
            content === 'password' && (
              <div className={classes.passwordContainer}>
                <p>가입하신 이메일과 핸즈 인증으로 추가한</p>
                <p>메인 캐릭터 또는 부캐릭터의 닉네임을 입력해주세요.</p>
                <input type="text" placeholder="이메일" ref={emailRef} />
                <input type="text" placeholder="캐릭터 이름" ref={charNameRef} />
                <button onClick={resetPasswordHandler}>비밀번호 찾기</button>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}
