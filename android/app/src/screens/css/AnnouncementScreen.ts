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
    alignSelf: 'stretch', // 부모 컨테이너 너비에 맞춤
    marginBottom: vh(2),
  },
  postItem: {
    flexDirection: 'row',
    justifyContent: 'space-between', // 텍스트와 화살표를 양쪽에 배치
    alignItems: 'center',
    paddingVertical: vh(1),
    paddingHorizontal: vw(4),
    width: '100%', // 부모 컨테이너 너비를 기준으로 고정
  },
  postTextContainer: {
    flexShrink: 1, // 텍스트 길이가 길어도 화살표와 겹치지 않도록 설정
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
    marginLeft: vw(2), // 텍스트와의 간격 유지
  },
  divider: {
    height: 1,
    backgroundColor: '#6A5AE0',
    marginHorizontal: vw(4),
  },
});

export default styles;
