import { atom } from 'recoil';
import persistAtom from './persist';

export const userNameState = atom<string | null>({
  key: 'userNameState',
  default: null, // 기본값 설정
  effects_UNSTABLE: [persistAtom],
});

export const userEmailState = atom<string | null>({
  key: 'userEmailState',
  default: null, // 기본값 설정
  effects_UNSTABLE: [persistAtom],
});
