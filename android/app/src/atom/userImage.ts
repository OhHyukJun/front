import { atom } from 'recoil';
import persistAtom from './persist';

export const userImageState = atom<string>({
  key: 'userImageState',
  default: '',
  effects_UNSTABLE: [persistAtom],
});

