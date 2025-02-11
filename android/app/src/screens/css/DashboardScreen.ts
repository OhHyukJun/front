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
    justifyContent: 'space-between',
    alignItems: 'center',
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
  },
  headerText: {
    fontSize: vh(2.8),
    fontWeight: 'bold',
    color: '#333333',
  },
  defaultMessageText: {
    fontSize: vh(2.1),
    color: '#BBBBBB',
  },
  recordTitle: {
    fontSize: vh(2.5),
    fontWeight: 'bold',
    marginTop: vh(3),
    marginBottom: vh(1),
    marginLeft: vw(2),
  },
  emotionContainer: {
    width: vw(88),
    height: vh(21),
    backgroundColor: '#F8F8FF',
    borderRadius: 15,
    padding: vw(4),
    justifyContent: 'center',
    overflow: 'hidden',
  },
  emotionWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  emotionItem: {
    flexDirection: 'column',
    alignItems: 'center',
    marginHorizontal: vw(3),
  },
  emotionDate: {
    fontSize: vh(1.8),
    marginBottom: vh(2),
  },
  emotionImage: {
    width: vw(17),
    height: vw(17),
    resizeMode: 'contain',
  },
  emotionText: {
    fontSize: vh(2),
    marginTop: vh(1),
  },
  separator: {
    width: vw(1),
    height: '60%',
    backgroundColor: '#96BCFF',
    marginHorizontal: vw(2),
  },
  noDataText: {
    fontSize: vh(2),
    color: '#888888',
    textAlign: 'center',
    width: '100%',
  },
  chartTitle: {
    fontSize: vh(2.5),
    fontWeight: 'bold',
    marginTop: vh(2),
    marginBottom: vh(1),
    marginLeft: vw(2),
  },
  chartContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    width: vw(88),
    height: vh(25),
    backgroundColor: '#EDEEFF',
    borderRadius: 15,
    padding: vw(3),
  },
  outerChartContainer: {
    width: vw(88),
    height: vh(29),
    backgroundColor: '#999CD9',
    borderRadius: 15,
    padding: vw(3),
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerChartContainer: {
    width: '95%',
    height: '80%',
    backgroundColor: '#FFFFFF', // ✅ 추가된 하얀색 배경 컨테이너
    borderRadius: 10,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'flex-end',
    padding: vw(2),
  },
  chartHourContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly', // 또는 'space-between'
    alignItems: 'center', // 수직 정렬 조정 (필요 시)
    flexWrap: 'wrap', // 만약 줄 바꿈이 필요하면 추가
    width: '90%', // 상위 컨테이너 전체를 사용하도록 설정
    marginTop: vh(1),
  },
  


  chartBarContainer: {
    alignItems: 'center',
    width: vw(10),
  },
  chartBar: {
    width: vw(8),
    borderRadius: 5,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  chartEmoji: {
    width: vw(7),
    height: vw(7),
    marginBottom: vh(1),
  },
  chartHour: {
    fontSize: vh(2),
    marginTop: vh(0.5),
  },

  emotionDescriptionContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: vw(88),
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: vh(1),
    marginTop: vh(2),
    borderWidth: 2, // ✅ 테두리 두께 설정
    borderColor: '#999CD9', // ✅ 테두리 색상 (흰색)
  },
  
  emotionDescriptionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: vh(1),
    width: vw(25), // 한 줄에 2개씩 배치
  },
  emotionIcon: {
    width: vw(5.6),
    height: vw(5.6),
    marginRight: vw(1.8),
  },
  emotionDescriptionText: {
    fontSize: vh(1.6),
    color: '#000',
  },

  scrollContainer: {
    flex: 1,
  },
  scrollContentContainer: {
    paddingBottom: 20,
  },
  

  
  
});

export default styles;
