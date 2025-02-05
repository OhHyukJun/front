import React,{useEffect} from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet  } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import styles from '../css/AnnouncementScreen';
import { useRecoilValue,useRecoilState  } from 'recoil';
import { announcementListState } from '../../atom/announcement';
import { adminState } from '../../atom/admin';
import axiosInstance from '../../api/axios';
type AnnouncementScreenProps = {
  navigation: any; // React Navigation의 navigation 객체
};
type Announcement = {
  header: string;
  time: string;
};
/* 더미 데이터 (데이터베이스 연동 전 테스트용)
const announcements = [
  { id: 1, header: '[공지] 아이 감정 분류 AI를 만들고 있습니다.',body:'예시', writetime: '2024.01.15' },
  { id: 2, header: '[공지] 이런 식으로 들어가면 스크롤도 가능.',body:'예시시', writetime: '2024.01.15' },
  { id: 3, header: '[공지] 최신 순으로 위로 쌓아주자.',body:'예시3', writetime: '2024.01.15' },
  { id: 4, header: '[공지] 최신 순으로 위로 쌓아주자.',body:'예시시', writetime: '2024.01.15' },
  { id: 5, header: '[공지] 최신 순으로 위로 쌓아주자.',body:'예시', writetime: '2024.01.15' },
  { id: 6, header: '[공지] 최신 순으로 위로 쌓아주자.',body:'예시', writetime: '2024.01.15' },
];*/

const AnnouncementScreen = ({ navigation }: AnnouncementScreenProps) => {
  const isAdmin = useRecoilValue(adminState);
  const [announcements, setAnnouncements] = useRecoilState<Announcement[]>(announcementListState);
  const isFocused = useIsFocused();
  //console.log(setAnnouncements);
  const fetchAnnouncements = async () => {
    try {
      const response = await axiosInstance.get<{ data: Announcement[] }>('/admin/getNoticeList');
      if (response.data && Array.isArray(response.data.data)) {
        const formattedData = response.data.data.map((item: Announcement) => ({
          header: item.header || '제목 없음',
          time: item.time || '날짜 없음',
        }));
        setAnnouncements(formattedData);
      } else {
        console.error('잘못된 데이터 형식:', response.data);
      }
    } catch (error) {
      console.error('공지사항 불러오기 오류:', error);
    }
  };

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  useEffect(() => {
    if (isFocused) {
      fetchAnnouncements();
    }
  }, [isFocused]);

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
            총 <Text style={styles.highlightedText}>{announcements.length}건</Text>의 공지사항이 있습니다.
          </Text>
        </View>
      </View>

      {/* 공지사항 목록 */}
      <View style={localStyles.flexContainer}>
        <ScrollView style={styles.postsContainer}>
          {announcements.map((announcement, index) => (
            <TouchableOpacity
              key={announcement.time}
              style={styles.postItemContainer}
              onPress={() =>
                navigation.navigate('AdminDelete', {
                  header: announcement.header,
                  writetime: announcement.time,
                })
              }>
              <View style={styles.postItem}>
                <View style={styles.postTextContainer}>
                  <Text style={styles.postTitle}>{announcement.header || '제목 없음'}</Text>
                  <Text style={styles.postDate}>{announcement.time || '날짜 없음'}</Text>
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
              onPress={() => navigation.navigate('AdminWrite')}>
              <Image source={require('../img/add_icon.png')} style={styles.addIcon} />
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
};

const localStyles = StyleSheet.create({
  flexContainer: {
    flex: 1,
  },
});

export default AnnouncementScreen;
