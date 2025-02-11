import { atom } from 'recoil';

// ✅ 감정 데이터 전역 상태 관리
export const babyEmotionState = atom({
  key: 'babyEmotionState',
  default: {
    babyRecently: [],
    babyEmotionOrderByTime: [],
  },
});
