import { StyleSheet } from 'react-native';
import { vw, vh } from 'react-native-expo-viewport-units';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    paddingHorizontal: vw(5),
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: vw(90),
    marginTop: vh(2),
  },
  profileDetails: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: vw(22),
    height: vw(22),
    borderRadius: vw(11),
    backgroundColor: '#EDEDED',
    resizeMode: 'cover',
    marginLeft: vw(2.5),
    marginRight: vw(5.4),
  },
  usernameText: {
    fontSize: vw(5.4),
    fontWeight: 'bold',
    color: '#333333',
  },
  accountManagementText: {
    fontSize: vw(4),
    fontWeight: 'bold',
    color: '#6D73C6',
    marginRight: vw(4),
  },
  divider: {
    width: '100%',
    height: 1,
    backgroundColor: '#6D73C6',
    marginVertical: vh(2),
  },
  settingCard: {
    width: vw(90),
    marginTop: vh(0.5),
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#999CD9',
    padding: vw(5),
  },
  row: {
    marginBottom: vh(3),
  },
  rowHorizontal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: vh(3),
  },
  inputContainer: {
    flex: 1,
    marginRight: vw(2),
  },
  label: {
    fontSize: vw(4.8),
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: vh(1),
  },
  radioGroup: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radioOption: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: vw(5),
  },
  radioOuterCircle: {
    width: vw(5.6),
    height: vw(5.6),
    borderRadius: vw(2.8),
    borderWidth: 1, // 얇게 조정
    borderColor: '#000000',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: vw(1.5),
  },
  radioOuterCircleSelected: {
    borderColor: '#000000',
  },
  radioInnerCircle: {
    width: vw(3),
    height: vw(3),
    borderRadius: vw(1.5),
    backgroundColor: '#84ABFF',
  },
  radioText: {
    fontSize: 14,
    color: '#333333',
    textAlignVertical: 'center', // 텍스트 중앙 정렬
  },
  input: {
    width: vw(25),
    height: vh(4), // 크기 그대로 유지
    borderWidth: 1,
    borderColor: '#F0F1FE',
    borderRadius: 8,
    backgroundColor: '#F0F1FE',
    fontSize: vh(2), // 폰트 크기를 vh로 설정
    lineHeight: vh(2), // 라인 높이를 vh 기준으로 조정
    color: '#333333',
    textAlignVertical: 'center', // 텍스트 세로 중앙 정렬
    paddingVertical: 0, // 상하 패딩 제거
  },
  sliderContainer: {
    marginTop: vh(2),
  },
  sliderWrapper: {
    position: 'relative',
    height: vh(3),
    justifyContent: 'center',
    borderRadius: vh(1.5),
    overflow: 'hidden',
  },
  sliderDummy: {
    position: 'absolute',
    height: vh(3),
    width: '100%',
    backgroundColor: '#E0E0E0',
    borderRadius: vh(1.5),
  },
  sliderReal: {
    position: 'absolute',
    height: vh(3),
    backgroundColor: '#6D73C6',
    borderRadius: vh(1.5),
  },
  slider: {
    width: '100%',
    height: '100%',
  },
  sliderLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  sliderLabelLeft: {
    fontSize: 14,
    color: '#888888',
  },
  sliderLabelRight: {
    fontSize: 14,
    color: '#888888',
  },
  sliderValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
    textAlign: 'right',
    marginTop: vh(1),
  },
  saveButton: {
    alignSelf: 'flex-end', // 설정 카드 안에서 오른쪽 정렬
    marginTop: vh(2), // 설정 카드 아래와의 간격
    marginRight: vw(2), // 설정 카드 오른쪽 끝에서의 간격
    width: vw(21),
    height: vh(5.8),
    backgroundColor: '#6D73C6',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  saveButtonText: {
    fontSize: vh(2.2),
    color: '#FFFFFF',
  },
});

export default styles;
