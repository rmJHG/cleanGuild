import { UserData } from "@/type/userData";
import { create } from "zustand";
type Store = {
  userData: UserData;
  setUserData: (newData: UserData) => void;
  deleteUserData: () => void;
};

const defaultState = {
  id: "",
  info: {
    handsData: {
      character_name: "",
      world_name: "",
    },
    userEmail: "",
  },
};

export const useUserData = create<Store>((set) => ({
  userData: defaultState,
  setUserData: (newData) => {
    set({ userData: newData });
  },
  deleteUserData: () => {
    set({ userData: defaultState });
  },
}));
