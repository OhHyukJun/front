import { atom } from 'recoil';

export interface BabyEmotionData {
  babyEmotionNum: number;
  babyEmotionTime: string;
}

export interface BabyEmotionByTimeData {
  hour: number;
  maxEmotion: number;
  ratio: number;
}

export interface BabyEmotionState {
  babyRecently: BabyEmotionData[];
  babyEmotionOrderByTime: BabyEmotionByTimeData[];
}

export const babyEmotionState = atom<BabyEmotionState>({
  key: 'babyEmotionState',
  default: {
    babyRecently: [],
    babyEmotionOrderByTime: [],
  },
});
