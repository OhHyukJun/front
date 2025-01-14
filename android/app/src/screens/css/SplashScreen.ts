import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  background: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    left: '0%',
    top: '0%',
    backgroundColor: '#FDFCFF',
  },
  title: {
    fontFamily: 'KCC-ganpan',
    fontSize: 105,
    lineHeight: 131,
    color: '#4750BD',
    textAlign: 'center',
  },
  subtitle: {
    fontFamily: 'Jua',
    fontStyle: 'normal',
    fontSize: 15,
    lineHeight: 18,
    textAlign: 'center',
    color: '#000000',
    marginTop: 20,
  },
});

export default styles;
