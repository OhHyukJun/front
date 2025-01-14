import { StyleSheet } from 'react-native';
import { vw, vh } from 'react-native-expo-viewport-units';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FDFCFF',
    alignItems: 'center',
    justifyContent: 'center',
  },

  title: {
    width: '80%',
    textAlign: 'center',
    fontWeight: '400',
    fontSize: 20,
    lineHeight: 42,
    color: '#6D73C6',
    textShadowColor: 'rgba(0, 0, 0, 0.25)',
    textShadowOffset: { width: 0, height: 4 },
    textShadowRadius: 4,
  },

  subtitle: {
    width: '80%',
    textAlign: 'center',
    fontWeight: '400',
    fontSize: 15,
    marginBottom: vw(3),
    color: '#6D73C6',
  },

  description: {
    width: '80%',
    textAlign: 'center',
    fontWeight: '400',
    fontSize: 12,
    color: '#6D73C6',
    flexDirection: 'row',
  },
  checkIcon: {
    width: vw(5),
    height: vw(5),
    marginTop: vw(1.5),
    marginRight: vw(4),
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

  group: {
    width: '80%',
    flexDirection: 'column',
    alignItems: 'center',
    marginVertical: 10,
  },

  groupLarge: {
    width: '60%',
    height: 77,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
  },

  responsiveText: {
    fontSize: 30,
  },
});

export default styles;
