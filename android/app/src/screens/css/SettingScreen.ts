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
    marginTop: vh(5),
    marginBottom: vh(3),
  },
  profileImage: {
    width: vw(20),
    height: vw(20),
    borderRadius: vw(10),
    backgroundColor: '#EDEDED',
    resizeMode: 'cover',
  },
  usernameText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
  },
  accountManagementText: {
    fontSize: 16,
    color: '#6A5AE0',
    textDecorationLine: 'underline',
  },
  settingCard: {
    width: vw(90),
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: vw(5),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  row: {
    marginBottom: vh(3),
  },
  label: {
    fontSize: 16,
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
  radioCircle: {
    width: vw(4),
    height: vw(4),
    borderRadius: vw(2),
    borderWidth: 1,
    borderColor: '#BBBBBB',
    backgroundColor: '#FFFFFF',
    marginRight: vw(1.5),
  },
  radioSelected: {
    backgroundColor: '#6A5AE0',
    borderColor: '#6A5AE0',
  },
  radioText: {
    fontSize: 14,
    color: '#333333',
  },
  input: {
    width: '100%',
    height: vh(6),
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    paddingHorizontal: vw(3),
    backgroundColor: '#F9F9F9',
    fontSize: 16,
    color: '#333333',
  },
  saveButton: {
    width: vw(30),
    height: vh(6),
    backgroundColor: '#6A5AE0',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginTop: vh(4),
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
});

export default styles;
