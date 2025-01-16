import { StyleSheet } from 'react-native';
import { vw, vh } from 'react-native-expo-viewport-units';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FDFCFF',
    paddingHorizontal: vw(5),
  },

  containerMini: {
    width: '90%',
    marginLeft: '5%',
    backgroundColor: '#FDFCFF',
  },

  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: vh(10),
    paddingHorizontal: vw(5),
  },

  backButton: {
    position: 'absolute',
    left: 0,
    justifyContent: 'center',
    alignItems: 'center',
    width: vw(8),
    height: vh(5),
  },

  backButtonText: {
    color: '#6D73C6',
    fontSize: vw(5),
  },

  content: {
    marginTop: vh(2),
    marginBottom: vh(4),
  },

  title: {
    fontSize: vw(5),
    fontWeight: 'bold',
    color: '#4750BD',
    marginBottom: vh(1),
  },

  subtitle: {
    fontSize: vw(4),
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: vh(1),
  },

  smallSubtitle: {
    fontSize: vw(3.5),
    color: '#6D73C6',
    marginBottom: vh(2),
  },

  inputContainer: {
    marginBottom: vh(1),
  },

  inputLabel: {
    fontSize: vw(4),
    fontWeight: 'bold',
    color: '#6D73C6',
    marginBottom: vh(1),
  },

  inputField: {
    borderBottomWidth: 1,
    borderColor: '#BDBDBD',
    fontSize: vw(4),
    paddingVertical: vh(0.5),
    color: '#000000',
  },

  inputHelper: {
    fontSize: vw(3),
    marginBottom: vw(7),
    color: '#6D73C6',
  },

  continueButton: {
    backgroundColor: '#6D73C6',
    paddingVertical: vh(1),
    borderRadius: 30,
    alignItems: 'center',
  },

  continueButtonText: {
    fontSize: vw(4),
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  verificationButton: {
    color: '#6D73C6',
    fontSize: 10,
    marginTop: 5,
    marginBottom: 3,
    textDecorationLine: 'underline',
  },
});

export default styles;
