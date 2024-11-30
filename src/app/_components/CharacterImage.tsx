import Image from "next/image";
import classes from "./styles/CharacterImage.module.css";
import { auth } from "@/auth";

export default async function CharacterImage() {
  const session = await auth();
  if (!session) return null;
  const { handsData } = session.user;
  if (!handsData) return null;
  return handsData!.character_image ? (
    <div className={classes.imageWrapeer}>
      <Image src={handsData!.character_image} alt="user_main_character_image" priority width={80} height={80} />
    </div>
  ) : null;
}
