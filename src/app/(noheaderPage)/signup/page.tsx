"use client";

import { toast } from "react-toastify";

function page() {
  const postSignUpAction = async (formData: FormData) => {
    console.log(formData);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/user/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.get("email"),
          password: formData.get("password"),
        }),
      });
      const json = await res.json();
      if (json.message === "이미 존재하는 이메일입니다.") {
        toast.error(json.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <form action={postSignUpAction}>
        <input type="email" name="email" />
        <input type="password" name="password" />
        <button>회원가입</button>
      </form>
    </div>
  );
}

export default page;
