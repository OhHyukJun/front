import { atom } from 'recoil';

export const announcementListState = atom({
  key: 'announcementListState',
  default: [], // 공지 목록 초기값
});
