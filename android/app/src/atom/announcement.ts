import { atom } from 'recoil';

type Announcement = {
  header: string;
  time: string;
};

export const announcementListState = atom<Announcement[]>({
  key: 'announcementListState',
  default: [], // 초기값 명확히 설정
});
