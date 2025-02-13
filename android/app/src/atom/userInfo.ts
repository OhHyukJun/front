import { atom } from 'recoil';
import persistAtom from './persist';

export const userInfoState = atom<{ name: string; email: string } | null>({
  key: 'userInfoState',
  default: null,
  effects_UNSTABLE: [persistAtom],
});
