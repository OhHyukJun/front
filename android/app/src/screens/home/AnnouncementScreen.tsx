import React,{useEffect} from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity  } from 'react-native';
import styles from '../css/AnnouncementScreen';
import { useRecoilValue,useRecoilState  } from 'recoil';
import { announcementListState } from '../../atom/announcement';
import { adminState } from '../../atom/admin';
import axiosInstance from '../../api/axios';
type AnnouncementScreenProps = {
  navigation: any; // React Navigation의 navigation 객체
};

// 더미 데이터 (데이터베이스 연동 전 테스트용)
const announcements = [
  { id: 1, header: '[공지] 아이 감정 분류 AI를 만들고 있습니다.',body:'예시', writetime: '2024.01.15' },
  { id: 2, header: '[공지] 이런 식으로 들어가면 스크롤도 가능.',body:'예시시', writetime: '2024.01.15' },
  { id: 3, header: '[공지] 최신 순으로 위로 쌓아주자.',body:'예시3', writetime: '2024.01.15' },
  { id: 4, header: '[공지] 최신 순으로 위로 쌓아주자.',body:'예시시', writetime: '2024.01.15' },
  { id: 5, header: '[공지] 최신 순으로 위로 쌓아주자.',body:'예시', writetime: '2024.01.15' },
  { id: 6, header: '[공지] 최신 순으로 위로 쌓아주자.',body:'예시', writetime: '2024.01.15' },
];

const AnnouncementScreen = ({ navigation }: AnnouncementScreenProps) => {
  const isAdmin = useRecoilValue(adminState);
  /*const [announcements, setAnnouncements] = useRecoilState(announcementListState);

  useEffect(() => {
    // 서버에서 공지 목록 가져오기
    const fetchAnnouncements = async () => {
      try {
        const response = await axiosInstance.get('/admin/getNotices');
        setAnnouncements(response.data); // 상태 업데이트
      } catch (error) {
        console.error('공지사항 불러오기 오류:', error);
      }
    };
    fetchAnnouncements();
  }, []);*/
  return (
    <View style={styles.container}>
      {/* 공지사항 제목과 설명을 감싸는 공통 컨테이너 */}
      <View style={styles.headerContainer}>
        <View style={styles.roundedContainer}>
          <View style={styles.headerRow}>
            <Image source={require('../img/announce.png')} style={styles.image} />
            <Text style={styles.headerText}>공지사항</Text>
          </View>
        </View>
        {/* 하위 텍스트 안전하게 렌더링 */}
        <View>
          <Text style={styles.subHeaderText}>
            총 <Text style={styles.highlightedText}>20건</Text>의 공지사항이 있습니다.
          </Text>
        </View>
      </View>

      {/* 공지사항 목록 */}
      <View style={{ flex: 1 }}>
        <ScrollView style={styles.postsContainer}>
          {announcements.map((announcement, index) => (
            <TouchableOpacity  key={announcement.id} style={styles.postItemContainer} onPress={() => navigation.navigate('AdminDelete', {
              header: announcement.header,
              body: announcement.body,
              writetime: announcement.writetime
              })}>
              <View style={styles.postItem}>
                <View style={styles.postTextContainer}>
                  <Text style={styles.postTitle}>{announcement.header || '제목 없음'}</Text>
                  <Text style={styles.postDate}>{announcement.writetime || '날짜 없음'}</Text>
                </View>
                {/* 오른쪽 화살표 아이콘 */}
                <Image source={require('../img/right_arrow.png')} style={styles.arrow} />
              </View>
              {index !== announcements.length - 1 && <View style={styles.divider} />}
            </TouchableOpacity>
          ))}
        </ScrollView>
      {isAdmin && (
        <View>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => navigation.navigate('AdminWrite')}
          >
            <Image source={require('../img/add_icon.png')} style={styles.addIcon} />
          </TouchableOpacity>
        </View>
      )}
      </View>
    </View>
  );
};

export default AnnouncementScreen;
