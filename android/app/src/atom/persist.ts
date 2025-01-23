import { recoilPersist } from 'recoil-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { persistAtom } = recoilPersist({
  key: 'recoil-persist', // AsyncStorage에 저장될 키 이름
  storage: AsyncStorage, // AsyncStorage를 사용 (기본값은 localStorage)
});

export default persistAtom;