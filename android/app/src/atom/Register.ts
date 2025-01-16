import { atom } from 'recoil';

export const emailState = atom<string>({
  key: 'emailState',
  default: '',
});

export const nameState = atom<string>({
  key: 'nameState',
  default: '',
});

export const passwordState = atom<string>({
  key: 'passwordState',
  default: '',
});

export const confirmPasswordState = atom<string>({
  key: 'confirmPasswordState',
  default: '',
});
