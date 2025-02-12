import { StyleSheet } from 'react-native';
import { vw, vh } from 'react-native-expo-viewport-units';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingHorizontal: vw(5),
  },
  headerRow: {
    flexDirection: 'row',
  },
  headerContainer: {
    alignSelf: 'center',
  },
  roundedContainer: {
    width: vw(88),
    height: vh(8),
    backgroundColor: '#EDEEFF',
    borderRadius: 20,
    justifyContent: 'center',
    padding: 10,
    marginTop: vh(3.1),
  },
  image: {
    width: vw(8),
    height: vw(8),
    resizeMode: 'contain',
    marginRight: vw(2),
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
  },
  subHeaderText: {
    fontSize: 16,
    color: '#333333',
    marginTop: vh(1),
    marginBottom: vh(2),
    marginLeft: vw(3),
  },
  highlightedText: {
    color: '#6A5AE0',
    fontWeight: 'bold',
  },
  postsContainer: {
    marginTop: vh(1),
    marginBottom: vh(2.1),
  },
  postItemContainer: {
    alignSelf: 'stretch',
    marginBottom: vh(2),
  },
  postItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: vh(1),
    paddingHorizontal: vw(4),
    width: '100%',
  },
  postTextContainer: {
    flexShrink: 1,
  },
  postTitle: {
    fontSize: 16,
    color: '#333333',
    fontWeight: '500',
    marginRight: vw(2),
  },
  postDate: {
    fontSize: 12,
    color: '#888888',
    marginTop: vh(1),
  },
  arrow: {
    width: vw(5),
    height: vh(5),
    resizeMode: 'contain',
    marginLeft: vw(2),
  },
  divider: {
    height: 1,
    backgroundColor: '#6A5AE0',
    marginHorizontal: vw(4),
  },
  addButton: {
    position: 'absolute',
    bottom: 15,
    right: 0,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addIcon: {
    width: vh(9),
    height:vh(9),
  },
});

export default styles;
