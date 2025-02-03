import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F9F9FF',
  },
  inputWrapper: {
    backgroundColor: '#EFEFFF',
    padding: 5,
    borderRadius: 15,
    marginBottom: 15,
  },
  titleInput: {
    marginLeft:10,
    fontSize: 16,
    color: '#292929',
  },
  contentInput: {
    fontSize: 13,
    color: '#292929',
    height: 300,
    textAlignVertical: 'top',
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
  },
  saveButton: {
    alignSelf: 'flex-end',
    marginRight: 5,
    paddingVertical: 5,
    paddingHorizontal: 15,
    backgroundColor: '#6A5ACD',
    borderRadius: 8,
  },
  saveButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom:5,
  },
});

export default styles;
