"use client";

import Image from "next/image";
import classes from "./CharacterImage.module.css";
import { useUserData } from "@/zustand/userDataState";

export default function CharacterImage() {
  const { userData } = useUserData();
  const { info } = userData;
  const { handsData } = info;
  return handsData.character_image ? (
    <div className={classes.imageWrapeer}>
      <Image src={handsData.character_image} alt="user_main_character_image" priority width={80} height={80} />
    </div>
  ) : null;
}
