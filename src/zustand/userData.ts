import { UserData } from "@/type/userData";
import { create } from "zustand";
interface Store {
  data: null | UserData;
  setData: () => void;
}
const useStore = create((set) => ({
  data: null,
  setData: (newData: UserData) => {
    set(() => {
      data: newData;
    });
  },
}));
