import React from 'react';
import { View, Text, TouchableOpacity, Modal } from 'react-native';
import styles from '../css/DeleteAccountModal';

interface DeleteAccountModalProps {
    isVisible: boolean;
    onConfirm: () => void;
    onCancel: () => void;
}

const DeleteAccountModal = ({ isVisible, onConfirm, onCancel }: DeleteAccountModalProps) => {
    return (
        <Modal transparent={true} visible={isVisible} animationType="fade">
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <View style={styles.modalTextContainer}>
                        <Text style={styles.modalText}>정말 탈퇴하시겠어요?</Text>
                        <Text style={styles.modalSubText}>
                            탈퇴 버튼 선택 시, 계정은 삭제되며 복구되지 않습니다.
                        </Text>
                    </View>

                    <View style={styles.divider} />

                    <TouchableOpacity onPress={onConfirm} style={styles.modalButtonDelete}>
                        <Text style={[styles.modalButtonText, styles.deleteButtonText]}>탈퇴</Text>
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

export default DeleteAccountModal;
