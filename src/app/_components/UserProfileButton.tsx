"use client";

import { useRef, useState } from "react";
import ProfileMenu from "./ProfileMenu";
import { Session } from "next-auth";

export default function UserProfileButton({ session, characterName }: { session: Session; characterName: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const btnRef = useRef<HTMLParagraphElement>(null);

  return (
    <>
      <button onClick={() => setIsOpen(!isOpen)}>
        <p ref={btnRef} style={{ gap: "5px" }}>
          {characterName}
        </p>
      </button>
      {isOpen && <ProfileMenu setIsOpen={setIsOpen} btnRef={btnRef} session={session} />}
    </>
  );
}
