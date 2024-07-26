"use client";

import Logout from "./Logout";
import { useRef, useState } from "react";
import { useSession } from "next-auth/react";
import ProfileMenu from "./ProfileMenu";
import { redirect } from "next/navigation";

export default function UserProfile() {
  const { data: session } = useSession();
  if (!session) return null;
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
            <p
              ref={btnRef}
              style={{
                gap: "5px",
              }}
            >
              {handsData.character_name}
            </p>
          </button>
        ) : (
          <Logout />
        ))}

      {isOpen && <ProfileMenu setIsOpen={setIsOpen} btnRef={btnRef} />}
    </>
  );
}
