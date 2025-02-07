import { StyleSheet } from 'react-native';
import { vw, vh, vmin, vmax } from 'react-native-expo-viewport-units';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
    padding: 10,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: vh(6),
    
  },
  headerTitle: {
    textAlign: 'center',
    fontSize: vw(7),
    color: '#6D73C6',
    fontWeight: '600',
  },
  backButton: {
    padding: 10,
  },
  backButtonText: {
    fontSize: 16,
    color: '#6D73C6',
  },
  chatContainer: {
    flexGrow: 1,
    paddingVertical: 10,
  },
  messageBubble: {
    maxWidth: '75%',
    padding: 10,
    marginVertical: 5,
    borderRadius: 10,
  },
  userBubble: {
    alignSelf: 'flex-end',
    backgroundColor: '#F0F1FE',
  },
  botBubble: {
    alignSelf: 'flex-start',
    backgroundColor: '#DDE0FF',
  },
  messageText: {
    fontSize: 16,
    color: '#292929',
  },
  suggestionContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginVertical: 10,
  },
  suggestionButton: {
    backgroundColor: '#F0F1FE',
    paddingVertical: 5,
    paddingHorizontal: 12,
    borderRadius: 15,
    marginHorizontal: 5,
    marginBottom: 5,
  },
  suggestionText: {
    fontSize: 14,
    color: '#333',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5',
  },
  inputBox: {
    flex: 1,
    height: 40,
    borderColor: '#E5E5E5',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    backgroundColor: '#F8F9FA',
    fontSize: 16,
  },
  sendButton: {
    marginLeft: 10,
    backgroundColor: '#6D73C6',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
  },
  sendButtonText: {
    fontSize: 16,
    color: '#FFF',
  },
});

export default styles;
