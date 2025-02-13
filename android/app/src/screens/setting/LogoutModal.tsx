import React from 'react';
import { View, Text, TouchableOpacity, Modal } from 'react-native';
import styles from '../css/LogoutModal';

interface LogoutModalProps {
    isVisible: boolean;
    onConfirm: () => void;
    onCancel: () => void;
}

const LogoutModal = ({ isVisible, onConfirm, onCancel }: LogoutModalProps) => {
    return (
        <Modal transparent={true} visible={isVisible} animationType="fade">
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <View style={styles.modalTextContainer}>
                        <Text style={styles.modalText}>계정에서 로그아웃하시겠어요?</Text>
                    </View>

                    <View style={styles.divider} />

                    <TouchableOpacity onPress={onConfirm} style={styles.modalButton}>
                        <Text style={[styles.modalButtonText, { color: 'red' }]}>로그아웃</Text>
                    </TouchableOpacity>

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
