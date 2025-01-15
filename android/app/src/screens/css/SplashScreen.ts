import { StyleSheet } from 'react-native';
import { vw, vh, vmin, vmax } from 'react-native-expo-viewport-units';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  background: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: '#FDFCFF',
  },
  title: {
    fontFamily: 'KCC-Ganpan',
    fontSize: vw(21),
    lineHeight: vw(23),
    color: '#4750BD',
    textAlign: 'center',
  },
  subtitle: {
    fontFamily: 'Inter',
    fontSize: 15,
    lineHeight: 18,
    textAlign: 'center',
    color: '#000000',
    marginTop: 20,
  },
  logo: {
    width: vw(60),
    height: 200,
  },
});

export default styles;
