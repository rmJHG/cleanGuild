"use client";

import Logout from "./Logout";
import { Dispatch, RefObject, SetStateAction, useEffect, useRef } from "react";
import Image from "next/image";
import classes from "./styles/profileMenu.module.css";
import { Session } from "next-auth";

export default function ProfileMenu({
  setIsOpen,
  btnRef,
  session,
}: {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  btnRef: RefObject<HTMLParagraphElement>;
  session: Session;
}) {
  if (!session) return null;
  const user = session.user;
  const { handsData } = user;
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (btnRef.current?.contains(event.target as Node)) return null;
      if (event.target == btnRef.current) {
        setIsOpen(false);
        return;
      }
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [btnRef, wrapperRef, setIsOpen]);

  return (
    <div className={classes.profileMenu} ref={wrapperRef}>
      <div>
        <p>{user.email}</p>
      </div>
      <div>
        <Image src={handsData?.character_image as string} alt="character_image" width={100} height={100} />
      </div>
      <div>
        <p>안녕하세요 {handsData?.character_name}님.</p>
      </div>
      <div>
        <Logout />
      </div>
    </div>
  );
}
