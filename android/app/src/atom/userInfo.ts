import { atom } from 'recoil';
import persistAtom from './persist';

export const userInfoState = atom<{ name: string; email: string }>({
  key: 'userInfoState',
  default: { name: '사용자', email: '이메일 없음' }, // 기본값 설정
  effects_UNSTABLE: [persistAtom],
});

