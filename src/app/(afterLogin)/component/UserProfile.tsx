"use client";

import Logout from "./Logout";
import { useRef, useState } from "react";
import { useSession } from "next-auth/react";
import ProfileMenu from "./ProfileMenu";

export default function UserProfile() {
  const { data: session } = useSession();
  const { handsData } = session!.user;

  const [isOpen, setIsOpen] = useState(false);
  const btnRef = useRef<HTMLParagraphElement>(null);
  return (
    <>
      {session &&
        (handsData ? (
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsOpen(!isOpen);
            }}
          >
            <p ref={btnRef} style={{ display: "flex", gap: "5px", alignItems: "center", justifyContent: "center" }}>
              {handsData.character_name} <span style={{ fontSize: "10px" }}>▽</span>
            </p>
          </button>
        ) : (
          <Logout />
        ))}

      {isOpen && <ProfileMenu setIsOpen={setIsOpen} btnRef={btnRef} />}
    </>
  );
}
