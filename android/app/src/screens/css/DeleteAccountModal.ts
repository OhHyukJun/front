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
    paddingVertical: vh(3.5), // 🔹 여백 통일 (로그아웃 모달과 맞춤)
    alignItems: 'center',
  },
  modalText: {
    fontSize: vh(2.5),
    fontWeight: 'bold',
  },
  modalSubText: {
    fontSize: vh(2),
    textAlign: 'center',
    color: '#666', // 🔹 강조 덜한 텍스트 (로그아웃 모달과 맞춤)
    marginTop: vh(1),
    paddingHorizontal: vw(5), // 좌우 여백 추가
  },
  modalButton: {
    width: '100%',
    paddingVertical: vh(1.3), // 🔹 로그아웃 모달과 동일한 버튼 높이
    alignItems: 'center',
  },
  modalButtonText: {
    fontSize: vh(2.2),
    fontWeight: 'bold',
  },
  modalButtonDelete: {
    width: '100%',
    paddingVertical: vh(1.3),
    alignItems: 'center',
  },
  deleteButtonText: {
    color: 'red', // 🔹 탈퇴 버튼 강조
  },
  modalButtonCancel: {
    width: '100%',
    paddingVertical: vh(1.2),
    alignItems: 'center',
    marginBottom: vh(0.3), // 🔹 "취소" 버튼 아래 여백 추가
  },
  divider: {
    width: '100%',
    height: 1,
    backgroundColor: '#ddd', // 연한 회색 구분선 (로그아웃 모달과 동일)
  },
});

export default styles;
