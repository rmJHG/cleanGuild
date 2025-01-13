import { create } from 'zustand';

type State = {
  title: string;
  description: string;
  guildType: string;
  guildContents: string;
  limitedLevel: number | null;
  limitedSuroPoint: number | null;
  limitedFlagPoint: number | null;
  openKakaotalkLink: string;
  discordLink: string;
  managerNameArr: string[];
};
type Action = {
  setPostState: (newState: Partial<State>) => void;
  resetPostState: () => void;
};
const initialState: State = {
  title: '',
  description: '',
  guildType: '',
  guildContents: '제한없음',
  limitedLevel: null,
  limitedSuroPoint: null,
  limitedFlagPoint: null,
  openKakaotalkLink: '',
  discordLink: '',
  managerNameArr: [],
};
export const postStore = create<State & Action>((set) => ({
  ...initialState,
  setPostState: (newState: Partial<State>) => set((state) => ({ ...state, ...newState })),
  resetPostState: () => set(initialState),
}));
