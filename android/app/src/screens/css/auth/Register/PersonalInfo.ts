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
      lineHeight: 42,
      color: '#6D73C6',
      marginTop: vh(2),
    },
    subtitle: {
      width: '80%',
      textAlign: 'center',
      fontWeight: '400',
      fontSize: vw(3.5),
      marginBottom: vw(3),
      color: '#6D73C6',
    },
    descriptionContainer: {
      width: '80%',
      flexDirection: 'row',
      alignItems: 'center', // 세로 중앙 정렬
      justifyContent: 'flex-start', // 왼쪽 정렬
      height: vw(8), // 고정 높이 설정
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
    marginVertical: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
  },

  scrollContent: {
    padding: 10, // 스크롤 내용에 여백 추가
  },

  infoText:{
    padding:vw(3),
    fontSize: vw(3),
  },

  responsiveText: {
    fontSize: 30,
  },
});

export default styles;
