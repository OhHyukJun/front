import { StyleSheet } from 'react-native';
import { vw, vh } from 'react-native-expo-viewport-units';

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  modalContent: {
    width: vw(75),
    backgroundColor: '#FFF',
    borderRadius: vw(3),
    alignItems: 'center',
  },
  modalTextContainer: {
    width: '100%',
    paddingVertical: vh(3.5),
    alignItems: 'center',
  },
  modalText: {
    fontSize: vh(2.5),
    fontWeight: 'bold',
  },
  modalSubText: {
    fontSize: vh(2),
    textAlign: 'center',
    color: '#666',
    marginTop: vh(1),
    paddingHorizontal: vw(5),
  },
  modalButton: {
    width: '100%',
    paddingVertical: vh(1.3),
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
    color: 'red',
  },
  modalButtonCancel: {
    width: '100%',
    paddingVertical: vh(1.2),
    alignItems: 'center',
    marginBottom: vh(0.3),
  },
  divider: {
    width: '100%',
    height: 1,
    backgroundColor: '#ddd',
  },
});

export default styles;
