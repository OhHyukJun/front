import { atom } from 'recoil';
import persistAtom from './persist';

export const userImageState = atom<string | null>({
  key: 'userImageState',
  default: null,
  effects_UNSTABLE: [persistAtom],
});

