import { db } from "@/firebase/fireconfig";
import { addDoc, collection } from "firebase/firestore";

export default function Page() {
  const postData = async (formData: FormData) => {
    "use server";
    const inputData = { userName: formData.get("name") };
    // await setDoc(doc(db, "hello", "data"), inputData);
    await addDoc(collection(db, "hello"), inputData);
  };

  return (
    <div>
      <form action={postData}>
        <input type="text" name="name" />
        <button type="submit">BTN</button>
      </form>
    </div>
  );
}
