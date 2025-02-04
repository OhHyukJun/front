import { AtomEffect } from 'recoil';
import AsyncStorage from '@react-native-async-storage/async-storage';

const persistAtom: AtomEffect<any> = ({ setSelf, onSet, node }) => {
  setTimeout(async () => {
    try {
      const savedValue = await AsyncStorage.getItem(node.key);
      if (savedValue !== null) {
        setSelf(JSON.parse(savedValue)); // 저장된 값이 있다면 설정
      }
    } catch (error) {
      console.error(`AsyncStorage 로드 오류 (${node.key}):`, error);
    }
  }, 0); // 다음 이벤트 루프에서 실행 (Recoil 상태 초기화 이후)

  onSet(async (newValue) => {
    try {
      await AsyncStorage.setItem(node.key, JSON.stringify(newValue)); // 변경될 때 저장
    } catch (error) {
      console.error(`AsyncStorage 저장 오류 (${node.key}):`, error);
    }
  });
};

export default persistAtom;
