import { atom } from 'recoil';
import persistAtom from './persist';

// 이름 상태
export const userNameState = atom<string | null>({
  key: 'userIdState',
  default: null,
  effects_UNSTABLE: [persistAtom], // 상태를 영구 저장
});

