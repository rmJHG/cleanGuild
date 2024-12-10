import { create } from 'zustand';

type State = {
  title: string;
  descreiption: string;
  guildType: string;
  guildContents: string;
  limitedLevel: string;
  limitedSuroPoint: string;
  limitedFlagPoint: string;
  openKakaotalkLink: string;
  discordLink: string;
  managerNameArr: string[];
};
type Action = {
  setPostState: (newState: Partial<State>) => void;
};
export const postStore = create<State & Action>((set) => ({
  title: '',
  descreiption: '',
  guildType: '',
  guildContents: '제한없음',
  limitedLevel: '',
  limitedSuroPoint: '',
  limitedFlagPoint: '',
  openKakaotalkLink: '',
  discordLink: '',
  managerNameArr: [],
  setPostState: (newState: Partial<State>) => set((state) => ({ ...state, ...newState })),
}));
