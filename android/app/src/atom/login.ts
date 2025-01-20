import { atom } from 'recoil';

// 로그인 상태
export const loginState = atom<boolean>({
  key: 'loginState',
  default: false, // 기본값: 로그아웃 상태
});

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

// Access Token Atom
export const accessTokenState = atom<string | null>({
  key: 'accessTokenState',
  default: null,
});

// Refresh Token Atom
export const refreshTokenState = atom<string | null>({
  key: 'refreshTokenState',
  default: null,
});
