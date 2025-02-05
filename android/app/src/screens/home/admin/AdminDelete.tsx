import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, Keyboard, TouchableWithoutFeedback } from 'react-native';
import axiosInstance from '../../../api/axios';
import { accessTokenState } from '../../../atom/login';
import { adminState } from '../../../atom/admin';
import { announcementListState } from '../../../atom/announcement';
import styles from '../../css/AdminWriteScreen';
import { useSetRecoilState,useRecoilValue } from 'recoil';

type RouteParams = {
  header: string;
  body: string;
  writetime: string;
};

type AdminDeleteScreenProps = {
  navigation: any;
  route: { params: RouteParams };
};

const AdminDelete = ({ navigation, route }: AdminDeleteScreenProps) => {
  const accessToken = useRecoilValue(accessTokenState);
  const setAnnouncements = useSetRecoilState(announcementListState);
  const isAdmin = useRecoilValue(adminState);
  const { header, writetime } = route.params;
  const [body, setBody] = useState<string>('본문 없음');

  useEffect(() => {
    const fetchBody = async () => {
      try {
        const response = await axiosInstance.get('/admin/readNotice', {
          params: { header, writetime },
        });

        if (response.data && typeof response.data === 'object') {
          setBody(response.data.body ?? '본문 없음');
        }
      } catch (error) {
        console.error('게시글 본문 조회 오류:', error);
      }
    };

    fetchBody();
  }, [header, writetime])

  const handleDelete = async () => {
    Alert.alert('삭제 확인', '정말로 이 공지사항을 삭제하시겠습니까?', [
      { text: '취소', style: 'cancel' },
      {
        text: '삭제',
        style: 'destructive',
        onPress: async () => {
          try {
            const response = await axiosInstance.post('/admin/deleteNotice', {
              accessToken,
              header,
              writetime,
            });

            if (response.status === 200) {
              setAnnouncements((prev) => prev.filter((accountment) => accountment.header !== header));

              Alert.alert('삭제 완료', '공지사항이 삭제되었습니다.', [
                { text: '확인', onPress: () => navigation.goBack() }
              ]);
            } else {
              throw new Error('삭제 실패: 서버에서 올바른 응답을 받지 못했습니다.');
            }
          } catch (error: any) {
            console.error('공지사항 삭제 오류:', error);
            const errorMessage = error.response?.data?.message || '삭제 중 오류가 발생했습니다.';
            Alert.alert('오류', errorMessage);
          }
        }
      }
    ]);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>

        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.titleInput}
            value={header}
            editable={false} // 수정 불가
            placeholder="제목 없음"
            placeholderTextColor="#292929"
          />
        </View>

        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.contentInput}
            value={body}
            multiline={true}
            editable={false} // 수정 불가
            placeholder="내용 없음"
            placeholderTextColor="#292929"
          />
        </View>
        {isAdmin && (
          <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
            <Text style={styles.deleteButtonText}>삭제</Text>
            </TouchableOpacity>
          )}
      </View>
    </TouchableWithoutFeedback>
  );
};

export default AdminDelete;
