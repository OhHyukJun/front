import { StyleSheet,Dimensions  } from 'react-native';
import { vw, vh } from 'react-native-expo-viewport-units';
const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: vw(5),
  },
  profileSection: {
    alignItems: 'center',
  },
  profileDetails: {
    position: 'relative',
  },
  profileImage: {
    width: vw(30),
    height: vw(30),
    borderRadius: vw(15),
    backgroundColor: '#E0E0E0',
    resizeMode: 'cover',
  },
  profileChangeButton: {
    position: 'absolute',
    bottom: 0,
    right: vw(4),
    width: vw(8),
    height: vw(8),
    borderRadius: vw(4),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  profileChangeIcon: {
    width: '80%',
    height: '80%',
    resizeMode: 'contain',
  },
  profileName: {
    marginTop: vh(1),
    fontSize: vh(2.4),
    fontWeight: 'bold',
    color: '#333333',
  },
  divider: {
    width: '100%',
    height: 1,
    backgroundColor: '#6D73C6',
    marginVertical: vh(2),
  },
  infoContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: vw(3),
    padding: vw(5),
    marginTop: vh(1),
    marginBottom: vh(2),
    borderWidth: 1,
    borderColor: '#999CD9',
  },
  containerTitle: {
    fontSize: vh(2.2),
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: vh(1),
  },
  containerSubtitle: {
    fontSize: vh(1.3),
    color: '#666666',
    marginBottom: vh(2),
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: vh(0.2),
    paddingVertical: vh(1.3),
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  infoLabel: {
    fontSize: vh(2),
    color: '#333333',
    fontWeight: 'bold',
  },
  infoValue: {
    fontSize: vh(1.8),
    color: '#666666',
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: vh(0.2),
    paddingVertical: vh(1.3),
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  actionLabel: {
    fontSize: vh(2),
    color: '#333333',
    fontWeight: 'bold',
  },
  arrowIcon: {
    width: vw(5),
    height: vw(5),
    resizeMode: 'contain',
  },
});

export default styles;
