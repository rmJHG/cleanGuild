import { UserData } from "@/type/userData";
import { create } from "zustand";
type Store = {
  data: UserData;
  setUserData: (newData: UserData) => void;
  deleteUserData: () => void;
};

const defaultState = {
  id: "",
  info: {
    userEmail: "",
    userName: "",
    server: "",
  },
};

export const useUserData = create<Store>((set) => ({
  data: defaultState,
  setUserData: (newData) => {
    set({ data: newData });
  },
  deleteUserData: () => {
    set({ data: defaultState });
  },
}));
