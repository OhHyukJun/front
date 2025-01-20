import React from 'react';
import { View, Text, Image, ScrollView } from 'react-native';
import { vw, vh } from 'react-native-expo-viewport-units';
import styles from './css/AnnouncementScreen';

type AnnouncementScreenProps = {
  navigation: any; // React Navigation의 navigation 객체
};

// 더미 데이터 (데이터베이스 연동 전 테스트용)
const posts = [
  { id: 1, title: '[공지] 아이 감정 분류 AI를 만들고 있습니다.', date: '2024.01.15' },
  { id: 2, title: '[공지] 이런 식으로 들어가면 스크롤도 가능.', date: '2024.01.15' },
  { id: 3, title: '[공지] 최신 순으로 위로 쌓아주자.', date: '2024.01.15' },
  { id: 4, title: '[공지] 최신 순으로 위로 쌓아주자.', date: '2024.01.15' },
  { id: 5, title: '[공지] 최신 순으로 위로 쌓아주자.', date: '2024.01.15' },
  { id: 6, title: '[공지] 최신 순으로 위로 쌓아주자.', date: '2024.01.15' },
];

const AnnouncementScreen = ({ navigation }: AnnouncementScreenProps) => {
  return (
    <View style={styles.container}>
      {/* 공지사항 제목과 설명을 감싸는 공통 컨테이너 */}
      <View style={styles.headerContainer}>
        <View style={styles.roundedContainer}>
          <View style={styles.headerRow}>
            <Image source={require('./img/announce.png')} style={styles.image} />
            <Text style={styles.headerText}>공지사항</Text>
          </View>
        </View>
        <Text style={styles.subHeaderText}>
          <Text>총 </Text>
          <Text style={styles.highlightedText}>20건</Text>
          <Text>의 공지사항이 있습니다.</Text>
        </Text>
      </View>

      {/* 공지사항 목록 */}
      <ScrollView style={styles.postsContainer}>
        {posts.map((post, index) => (
          <View key={post.id} style={styles.postItemContainer}>
            <View style={styles.postItem}>
              <View style={styles.postTextContainer}>
                <Text style={styles.postTitle}>{post.title}</Text>
                <Text style={styles.postDate}>{post.date}</Text>
              </View>
              {/* 오른쪽 화살표 아이콘 */}
              <Image source={require('./img/right_arrow.png')} style={styles.arrow} />
            </View>
            {index !== posts.length - 1 && <View style={styles.divider} />} {/* 보라색 구분선 */}
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default AnnouncementScreen;
