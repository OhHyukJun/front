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
    borderRadius: vw(5),
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
  dateText: {
    fontSize: vh(2),
    color: '#333333',
  },
  radioGroup: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radioOption: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: vw(24),
  },
  radioOuterCircle: {
    width: vw(5.6),
    height: vw(5.6),
    borderRadius: vw(2.8),
    borderWidth: 1,
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
    fontSize: vh(2.2),
    color: '#333333',
    textAlignVertical: 'center',
  },
  input: {
    width: vw(25),
    height: vh(4),
    borderWidth: 1,
    borderColor: '#F0F1FE',
    borderRadius: vw(2),
    backgroundColor: '#F0F1FE',
    fontSize: vh(1.6),
    lineHeight: vh(2),
    color: '#333333',
    textAlignVertical: 'center',
    paddingVertical: 0,
  },
  sliderContainer: {
    marginTop: vh(2),
  },
  sliderWrapper: {
    position: 'relative',
    height: vh(3),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: vh(1.5),
    overflow: 'hidden',
  },
  sliderContent: {
    marginLeft: vw(1.6),
  },
  sliderRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sliderLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  sliderLabelLeft: {
    fontSize: vh(2),
    color: '#888888',
    marginLeft: vw(-1),
  },
  sliderLabelRight: {
    fontSize: vh(2),
    color: '#888888',
    marginRight: vw(-2),
  },
  sliderValue: {
    fontSize: vh(2),
    fontWeight: 'bold',
    color: '#333333',
    textAlign: 'right',
    marginLeft: vw(5.4),
    marginBottom: vh(3),
  },
  saveButton: {
    alignSelf: 'flex-end',
    marginTop: vh(2),
    marginRight: vw(2),
    width: vw(21),
    height: vh(5.8),
    backgroundColor: '#6D73C6',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: vw(3),
  },
  saveButtonText: {
    fontSize: vh(2.2),
    color: '#FFFFFF',
  },
});

export default styles;
