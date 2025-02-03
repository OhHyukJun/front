import React from 'react';
import { View, Text, TouchableOpacity, Modal } from 'react-native';
import styles from '../css/LogoutModal';

interface LogoutModalProps {
    isVisible: boolean;
    onConfirm: () => void;
    onCancel: () => void;
}

const LogoutModal: React.FC<LogoutModalProps> = ({ isVisible, onConfirm, onCancel }) => {
    return (
        <Modal transparent={true} visible={isVisible} animationType="slide">
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    {/* 텍스트 부분만 위아래 패딩 추가 */}
                    <View style={styles.modalTextContainer}>
                        <Text style={styles.modalText}>계정에서 로그아웃하시겠어요?</Text>
                    </View>

                    {/* 구분선 */}
                    <View style={styles.divider} />

                    <TouchableOpacity onPress={onConfirm} style={[styles.modalButton, styles.borderTop]}>
                        <Text style={[styles.modalButtonText, { color: 'red' }]}>로그아웃</Text>
                    </TouchableOpacity>

                    {/* 구분선 */}
                    <View style={styles.divider} />

                    <TouchableOpacity onPress={onCancel} style={styles.modalButtonCancel}>
                        <Text style={styles.modalButtonText}>취소</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

export default LogoutModal;
