import { Char } from "@/type/char";
import { create } from "zustand";

type CharState = {
  data: Char | null;
  getData: (newData: Char) => void;
};
const useCharStore = create<CharState>((set) => ({
  data: null,
  getData: (newData) => set(() => ({ data: newData })),
}));

export default useCharStore;
