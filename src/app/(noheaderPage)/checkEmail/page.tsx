"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import React from "react";
import { toast } from "react-toastify";

export default function page() {
  const { data: session } = useSession();
  console.log(session);
  !session && redirect("/");
  if (session?.user.isVerified) redirect("/");

  const resendEmail = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/user/resentEmailVerificationCode`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: session?.user.email,
      }),
    });
    const data = await res.json();
    console.log(data);
    if (data.message === "이메일이 성공적으로 전송되었습니다.") {
      toast.success(data.message);
    } else {
      toast.error(data.message);
    }
  };
  return (
    <div>
      <p>이메일 인증을 해주세요.</p>

      <p>인증 메일을 받지 못하셨나요?</p>
      <button onClick={resendEmail}>인증 메일 재발송</button>
    </div>
  );
}
