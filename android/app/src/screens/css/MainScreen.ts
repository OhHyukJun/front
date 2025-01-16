import { StyleSheet } from 'react-native';
import { vw, vh, vmin, vmax } from 'react-native-expo-viewport-units';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  text: {
    fontFamily: 'KCC-Ganpan',
    fontSize: 20,
    color: '#333333',
    marginBottom: 20,
  },
  roundedContainer: {
    width: vw(90),
    height: vh(85),
    backgroundColor: '#EDEEFF',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  navigationContainer: {
    width: vw(27),
    height: vh(2.5),
    backgroundColor: '#EDEEFF',
    borderRadius: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: vh(3.5),
  },
  dot: {
    height: vw(2),
    width: vw(2),
    backgroundColor: '#d0d0d0',
    borderRadius: vw(1),
    marginHorizontal: 10,
  },
  activeDot: {
    backgroundColor: '#000000',
  },
  balloon: {
    width: vw(76),
    height: vh(43),
    marginTop: -vh(8),
    resizeMode: 'contain',
    justifyContent: 'center', // 중앙 정렬
    alignItems: 'center' // 중앙 정렬
  },
  baby: {
    width: vw(64),
    height: vw(64),
    borderRadius: vw(32),
    overflow: 'hidden',
    resizeMode: 'cover',
    marginTop: -vh(2),
  },
  chatbot: {
    position: 'absolute',
    bottom: vw(5),
    right: vw(5),
    width: vw(16),
    height: vw(16),
    resizeMode: 'contain',
  },
  balloonText: {
    color: '#808080', // 회색
    fontSize: vh(3.4), // 적당한 폰트 사이즈
    textAlign: 'center', // 텍스트 중앙 정렬
    marginTop: -vh(1.3), // 상단 마진 조정
    marginBottom: vh(1), // 하단 마진 조정
    lineHeight: vh(4.3), // 라인 높이 조정
    marginLeft: vh(1.3),
  },
});

export default styles;
