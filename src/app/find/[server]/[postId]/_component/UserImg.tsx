import Image from "next/image";
import classes from "./userImg.module.css";
export default function UserImg({ imgLink }: { imgLink: string }) {
  return (
    <div className={classes.imgWrapper}>
      <Image src={imgLink} alt="user_small_img" width={100} height={100} />
    </div>
  );
}
