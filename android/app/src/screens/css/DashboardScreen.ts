import { StyleSheet } from 'react-native';
import { vw, vh } from 'react-native-expo-viewport-units';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingHorizontal: vw(5),
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
    fontSize: vh(2.8),
    fontWeight: 'bold',
    color: '#333333',
  },
  defaultMessageText: {
    fontSize: vh(2.1),
    color: '#BBBBBB',
  },

  /* 🆕 아기 기록 타이틀 */
  recordTitle: {
    fontSize: vh(2.5),
    fontWeight: 'bold',
    marginTop: vh(2),
    marginBottom: vh(1),
    color: '#333333',
  },

  /* 🆕 보라색 컨테이너 */
  recordContainer: {
    width: vw(88),
    height: vh(24), // ✅ 기존 컨테이너 높이의 3배
    backgroundColor: '#D3C4FF',
    borderRadius: 20,
    padding: 15,
    marginBottom: vh(3),
  },

  /* 🆕 스크롤 가능한 아이템 */
  recordItem: {
    width: vw(30),
    height: vh(20),
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: vw(2),
  },

  recordText: {
    fontSize: vh(2),
    color: '#333333',
  },
});

export default styles;
