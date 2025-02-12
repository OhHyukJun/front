import React from 'react';
import { View, Text, TouchableOpacity, Modal } from 'react-native';
import styles from '../css/LogoutModal';

interface ImageUploadModalProps {
    isVisible: boolean;
    onCamera: () => void;
    onGallery: () => void;
    onCancel: () => void;
}

const ImageUploadModal = ({ isVisible, onCamera, onGallery, onCancel }: ImageUploadModalProps) => {
    return (
        <Modal transparent={true} visible={isVisible} animationType="fade">
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    {/* 안내 텍스트 */}
                    <View style={styles.modalTextContainer}>
                        <Text style={styles.modalText}>이미지를 선택하는 방법을 선택하세요.</Text>
                    </View>

                    {/* 구분선 */}
                    <View style={styles.divider} />

                    {/* 갤러리에서 선택 */}
                    <TouchableOpacity onPress={onGallery} style={[styles.modalButton, styles.borderTop]}>
                        <Text style={[styles.modalButtonText, { color: '#4750BD' }]}>갤러리에서 선택</Text>
                    </TouchableOpacity>

                    <View style={styles.divider} />

                    {/* 카메라 촬영 */}
                    <TouchableOpacity onPress={onCamera} style={[styles.modalButton, styles.borderTop]}>
                        <Text style={[styles.modalButtonText, { color: 'red' }]}>카메라로 촬영</Text>
                    </TouchableOpacity>

                    <View style={styles.divider} />

                    {/* 취소 버튼 */}
                    <TouchableOpacity onPress={onCancel} style={styles.modalButtonCancel}>
                        <Text style={styles.modalButtonText}>취소</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

export default ImageUploadModal;
