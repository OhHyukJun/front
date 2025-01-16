import { StyleSheet } from 'react-native';
import { vw, vh } from 'react-native-expo-viewport-units';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#FDFCFF',
      alignItems: 'center',
    },
    headerContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      height: vh(10),
      paddingHorizontal: vw(5),
    },
    backButton: {
      position: 'absolute',
      left: vw(5),
      justifyContent: 'center',
      alignItems: 'center',
      width: vw(8),
      height: vh(5),
    },
    backButtonText: {
      color: '#6D73C6',
      fontSize: vw(4.5),
    },
    headerTitle: {
      textAlign: 'center',
      fontSize: vw(6),
      color: '#6D73C6',
      fontWeight: '600',
    },
    divider: {
      width: '85%',
      borderTopWidth: 1,
      borderColor: '#4750BD',
    },
    title: {
      width: '80%',
      textAlign: 'center',
      fontWeight: '400',
      fontSize: vw(6),
      lineHeight: vh(6),
      color: '#6D73C6',
      marginTop: vh(2),
    },
    subtitle: {
      width: '80%',
      textAlign: 'center',
      fontWeight: '400',
      fontSize: vw(3.5),
      lineHeight: vh(3),
      marginBottom: vw(3),
      color: '#6D73C6',
    },
    descriptionContainer: {
      width: '80%',
      flexDirection: 'row',
      alignItems: 'center', // 세로 중앙 정렬
      justifyContent: 'flex-start', // 왼쪽 정렬
      height: vh(4), // 고정 높이 설정
      marginVertical: vw(1), // 위아래 적당한 여백 추가
    },
    checkIcon: {
      width: vw(5),
      height: vw(5),
      marginRight: vw(2), // 아이콘과 텍스트 간 간격
      marginBottom: vw(1),
    },
    description: {
      fontWeight: '400',
      fontSize: vw(4), // 적당한 반응형 폰트 크기
      lineHeight: vw(4.5), // 폰트 크기와 동일한 라인 높이
      marginTop: 0, // 기본 마진 제거
    },
    descriptionMini: {
      fontWeight: '400',
      fontSize: vw(3),
      lineHeight: vw(4.5), // 폰트 크기와 동일한 라인 높이
      marginLeft: vw(1.2),
      color: '#6D73C6',
    },
    icon: {
      width: 50,
      height: 50,
      borderWidth: 4,
      borderColor: '#6D73C6',
      borderRadius: 25,
      marginTop: 20,
    },

  line: {
    width: '85%',
    height: 1,
    borderTopWidth: 1,
    borderTopColor: '#6D73C6',
  },

  infoContainer: {
    width: '80%',
    height: vh(20),
    flexDirection: 'column',
    alignItems: 'center',
    marginVertical: 5,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
  },

  scrollContent: {
    paddingLeft: 5, // 스크롤 내용에 여백 추가
    paddingRight:5,
    paddingBottom:3,
  },

  infoText:{
    paddingLeft:vw(3),
    paddingRight:vw(3),
    fontSize: vw(3),
  },
  responseButton: {
    marginTop: vw(5),
    position: 'relative',
    width: '45%',
    height: '6%',
    backgroundColor: '#6D73C6',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
  },
  disabledButton: {
    backgroundColor: '#f0f0f0',
    width: '45%',
  },
  responseButtonText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  disabledButtonText: {
    color: '#888888',
  },
});

export default styles;
