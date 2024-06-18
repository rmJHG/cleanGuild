import { auth } from "@/auth";
import { db } from "@/firebase/fireconfig";
import { UserData } from "@/type/userData";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { Session } from "next-auth";
import { redirect } from "next/navigation";

export default async function SetName() {
  const data: UserData = {
    id: "",
    info: {
      userEmail: "",
      userName: "",
    },
  };
  const session = (await auth()) as Session;
  session === null && redirect("/");

  const userEmail = session.user!.email as string;
  const q = query(collection(db, "userData"), where("userEmail", "==", userEmail));
  const getData = await getDocs(q);
  getData.forEach((e) => {
    (data.id = e.id), (data.info = { ...e.data() });
  });

  const postUserName = async (formData: FormData) => {
    "use server";
    const inputData = {
      userName: formData.get("userName"),
      server: formData.get("server"),
      userEmail: session.user?.email,
    };
    addDoc(collection(db, "userData"), inputData);
    redirect("/");
  };
  if (data.info.userName !== undefined && data.id !== "") {
    redirect("/");
  } else {
    return (
      <div>
        <form action={postUserName}>
          <input type="text" name="userName" />
          <input type="text" name="server" />
          <button type="submit">설정</button>
        </form>
      </div>
    );
  }
}
