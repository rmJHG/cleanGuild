"use client";
import Link from "next/link";
import Logout from "./Logout";

import { useState } from "react";
import classes from "./userProfile.module.css";
import { useSession } from "next-auth/react";

export default function UserProfile() {
  const { data: session } = useSession();
  if (!session) return null;
  const { handsData } = session.user;

  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      {session &&
        (handsData ? (
          <div>
            <button
              onClick={() => {
                setIsOpen(!isOpen);
              }}
            >
              <p>{handsData.character_name}</p>
            </button>
          </div>
        ) : (
          <Logout />
        ))}

      {isOpen && (
        <ul className={classes.profileMenu}>
          <li>
            <Logout />
          </li>
          <li>
            <Link href="/profile">
              <p>내 정보</p>
            </Link>
          </li>
        </ul>
      )}
    </div>
  );
}
