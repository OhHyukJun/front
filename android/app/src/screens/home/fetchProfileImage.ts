import axiosInstance from '../../api/axios';
import { userImageState } from '../../atom/userImage';
import { accessTokenState } from '../../atom/login';
import { useRecoilState, useRecoilValue } from 'recoil';

interface ProfileImageResponse {
  profileImage?: string;
}

export const useFetchProfileImage = () => {
  const [, setProfileImage] = useRecoilState(userImageState);
  const accessToken = useRecoilValue(accessTokenState);

  const fetchProfileImage = async () => {
    if (!accessToken) {
      console.error('Access Token이 없습니다.');
      return;
    }

    try {
      const response = await axiosInstance.get<ProfileImageResponse>(
        '/config/getProfileImage',
        {
          headers: {
            Cookie: `accessToken=${accessToken}`,
          },
          withCredentials: true,
        }
      );

      console.log('최신 프로필 이미지 응답:', response.status);

      if (response.data?.profileImage) {
        const base64Image = response.data.profileImage;
        const decodedImage = `data:image/png;base64,${base64Image}`;
        setProfileImage(decodedImage);
      } else {
        console.warn('서버에서 프로필 이미지가 비어 있습니다.');
        setProfileImage(null);
      }
    } catch (error) {
      console.error('프로필 이미지 불러오기 실패:', error);
      setProfileImage(null);
    }
  };

  return fetchProfileImage;
};
