import { atom } from 'recoil';
import persistAtom from './persist';
// 로그인 상태
export const loginState = atom<boolean>({
  key: 'loginState',
  default: false, // 기본값: 로그아웃 상태
  effects_UNSTABLE: [persistAtom], // 상태를 영구 저장
});

// 아이디 상태
export const userIdState = atom({
  key: 'userIdState',
  default: '',
  effects_UNSTABLE: [persistAtom], // 상태를 영구 저장
});

// 비밀번호 상태
export const userPwState = atom({
  key: 'userPwState',
  default: '',
  effects_UNSTABLE: [persistAtom],
});

// Access Token Atom
export const accessTokenState = atom<string | null>({
  key: 'accessTokenState',
  default: null,
  effects_UNSTABLE: [persistAtom],
});

// Refresh Token Atom
export const refreshTokenState = atom<string | null>({
  key: 'refreshTokenState',
  default: null,
  effects_UNSTABLE: [persistAtom],
});
