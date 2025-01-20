import { StyleSheet } from 'react-native';
import { vw, vh } from 'react-native-expo-viewport-units';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingHorizontal: vw(5),
  },
  headerRow: {
    flexDirection: 'row', // 가로 정렬
    justifyContent: 'space-between', // 텍스트와 이미지가 양 끝에 배치
    alignItems: 'center', // 세로 정렬
  },
  roundedContainer: {
    width: vw(88),
    height: vh(8),
    backgroundColor: '#EDEEFF',
    borderRadius: 20,
    justifyContent: 'center',
    padding: 10,
    marginTop: vh(3.1),
  },
  image: {
    width: vw(8),
    height: vw(8),
    resizeMode: 'contain',
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
  },
});

export default styles;
