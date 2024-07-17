"use client";

import Logout from "./Logout";
import { useRef, useState } from "react";
import { useSession } from "next-auth/react";
import ProfileMenu from "./ProfileMenu";

export default function UserProfile() {
  const { data: session } = useSession();
  if (!session) return null;
  const { handsData } = session.user;

  const [isOpen, setIsOpen] = useState(false);
  const btnRef = useRef<HTMLParagraphElement>(null);
  return (
    <>
      {session &&
        (handsData ? (
          <div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsOpen(!isOpen);
              }}
            >
              <p ref={btnRef}>{handsData.character_name}</p>
            </button>
          </div>
        ) : (
          <Logout />
        ))}

      {isOpen && <ProfileMenu setIsOpen={setIsOpen} btnRef={btnRef} />}
    </>
  );
}
