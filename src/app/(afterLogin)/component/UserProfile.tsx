"use client";
import Link from "next/link";
import Logout from "./Logout";
import { useUserData } from "@/zustand/userDataState";
import { useState } from "react";
import classes from "./userProfile.module.css";

export default function UserProfile() {
  const { userData } = useUserData();
  const { id, info } = userData;
  const { handsData } = info;
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      {handsData && (
        <div>
          <button
            onClick={() => {
              setIsOpen(!isOpen);
            }}
          >
            <p>{handsData.character_name}</p>
          </button>
        </div>
      )}

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
