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
});

export default styles;
