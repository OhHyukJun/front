import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const SplashScreen = () => {
    return (
        <View style={styles.container}>
            <View style={styles.background} />
            <Text style={styles.title}>나비잠</Text>
            <Text style={styles.subtitle}>아기야 두 팔 벌리고 편하게 자렴 :)</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'relative',
    },
    background: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        left: '0%',
        top: '0%',
        backgroundColor: '#FDFCFF',
    },
    title: {
        fontFamily: 'Jua',
        fontSize: 105,
        lineHeight: 131,
        color: '#4750BD',
        textAlign: 'center',
    },
    subtitle: {
        fontFamily: 'Inter',
        fontSize: 15,
        lineHeight: 18,
        textAlign: 'center',
        color: '#000000',
        marginTop: 20, // 제목 아래 적절한 간격 추가
    },
});

export default SplashScreen;
