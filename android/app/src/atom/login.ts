import { atom } from 'recoil';

// 아이디 상태
export const userIdState = atom({
  key: 'userIdState',
  default: '',
});

// 비밀번호 상태
export const userPwState = atom({
  key: 'userPwState',
  default: '',
});
