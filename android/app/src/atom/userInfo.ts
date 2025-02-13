import { atom } from 'recoil';
import persistAtom from './persist';

// 이름 상태
export const userInfoState = atom<string[]>({
  key: 'userInfoState',
  default: [],
  effects_UNSTABLE: [persistAtom], // 상태를 영구 저장
});

