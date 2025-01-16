import { StyleSheet } from 'react-native';
import { vw, vh, vmin, vmax } from 'react-native-expo-viewport-units';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingHorizontal: vw(5),
  },
  roundedContainer: {
    width: vw(90),
    height: vh(12),
    backgroundColor: '#EDEEFF',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    marginTop: vh(3),
  },
  image: {
    width: vw(8),
    height: vw(8),
    resizeMode: 'contain',
    marginBottom: vh(1),
  },
  headerText: {
    fontSize: 16,
    color: '#333333',
  },
  highlightedText: {
    color: '#6A5AE0', // 보라색
    fontWeight: 'bold',
  },
  postsContainer: {
    marginTop: vh(2),
  },
  postItem: {
    paddingVertical: vh(2),
    paddingHorizontal: vw(4),
  },
  postTitle: {
    fontSize: 16,
    color: '#333333',
    fontWeight: '500',
  },
  postDate: {
    fontSize: 12,
    color: '#888888',
    marginTop: vh(1),
  },
  divider: {
    height: 1,
    backgroundColor: '#6A5AE0', // 보라색 구분선
    marginVertical: vh(1.5),
  },
});

export default styles;
