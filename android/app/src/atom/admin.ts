import { atom } from 'recoil';
import persistAtom from './persist';

export const adminState = atom<boolean>({
    key: 'adminState',
    default: true,
    effects_UNSTABLE: [persistAtom],
});

export const adminWriteState = atom<string>({
    key: 'adminWriteState',
    default: '',
    effects_UNSTABLE: [persistAtom],
});
