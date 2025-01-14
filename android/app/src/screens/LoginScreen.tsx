import React from 'react';
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import styles from './css/LoginScreen'; // 위의 StyleSheet 파일

const LoginScreen = () => {
    return (
        <View style={styles.container}>
            {/* Title */}
            <Image
                source={require('./img/logo.png')}
                style={styles.titleImg}
            />
            <Text style={styles.title}>나비잠</Text>

            {/* Input Fields */}
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.inputField}
                    placeholder="아이디 입력"
                    placeholderTextColor="#C4C4C4"
                />
                <View style={styles.passwordContainer}>
                    <TextInput
                        style={{ flex: 1, fontSize: 16 }}
                        placeholder="비밀번호 8자 ~ 20자"
                        placeholderTextColor="#C4C4C4"
                        secureTextEntry
                    />
                </View>
            </View>

            {/* Login Button */}
            <TouchableOpacity style={styles.loginButton}>
                <Text style={styles.loginButtonText}>로그인</Text>
            </TouchableOpacity>

            {/* Remember Me */}
            <View style={styles.rememberContainer}>
                <Text style={styles.rememberText}>로그인 상태 유지</Text>
            </View>

            {/* Divider */}
            <View style={styles.divider} />

            {/* Social Login */}
            <View style={styles.socialLoginContainer}>
                <TouchableOpacity style={[styles.socialButton, styles.kakaoButton]}>
                    <Text style={styles.kakaoText}>카카오 로그인</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.socialButton, styles.naverButton]}>
                    <Text style={styles.naverText}>네이버 로그인</Text>
                </TouchableOpacity>
            </View>

            {/* Footer Links */}
            <View style={styles.footer}>
                <Text style={styles.footerText}>회원가입</Text>
                <Text style={styles.footerText}>아이디 찾기</Text>
                <Text style={styles.footerText}>비밀번호 찾기</Text>
            </View>
        </View>
    );
};

export default LoginScreen;
