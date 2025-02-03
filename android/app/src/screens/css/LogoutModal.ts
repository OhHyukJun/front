import { StyleSheet } from 'react-native';
import { vw, vh } from 'react-native-expo-viewport-units';

const styles = StyleSheet.create({
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.4)', // 반투명 배경
    },
    modalContent: {
      width: vw(75),
      backgroundColor: '#FFF',
      borderRadius: vw(3),
      alignItems: 'center',
    },
    modalTextContainer: {
      width: '100%',
      paddingVertical: vh(4), // 🔹 위아래 여백 추가 (더 넓게 조정)
      alignItems: 'center',
    },
    modalText: {
      fontSize: vh(2.5),
      fontWeight: 'bold',
    },
    modalButton: {
      width: '100%',
      paddingVertical: vh(1.3),
      alignItems: 'center',
    },
    modalButtonText: {
      fontSize: vh(2.2),
      fontWeight: 'bold',
    },
    modalButtonCancel: {
        width: '100%',
        paddingVertical: vh(1.2), // 기존과 동일한 여백
        alignItems: 'center',
        marginBottom: vh(0.3), // 🔹 "취소" 버튼 아래에만 여백 추가
      },
    divider: {
      width: '100%',
      height: 1,
      backgroundColor: '#ddd', // 연한 회색 구분선
    },
  });

export default styles;
