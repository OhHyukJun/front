import { StyleSheet, Dimensions } from 'react-native';
import { vw, vh } from 'react-native-expo-viewport-units';

const { width } = Dimensions.get('window'); // 화면 너비 기준으로 반응형 설정
const rem = width / 375; // 375px 기준으로 rem 단위 생성

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
    },
    titleImg: {
        marginTop: vw(30),
        width: vw(22),
        height: vw(22),
    },
    title: {
        fontFamily:'KCC-Ganpan',
        fontSize: 50 * rem,
        color: '#4750BD',
        marginBottom: 40,
    },
    inputContainer: {
        width: '85%',
    },
    inputField: {
        width: '100%',
        borderWidth: 1,
        borderColor: '#4750BD',
        color:'#4750BD',
        padding: 10,
        marginBottom: 10,
        borderRadius: 8,
        fontSize: vw(3), // 20px
    },
    inputPwField: {
        width: '100%',
        borderWidth: 1,
        borderColor: '#4750BD',
        color:'#4750BD',
        padding: 10,
        marginBottom: 10,
        borderRadius: 8,
        fontSize: vw(3), // 20px
    },
    eyeIcon: {
        width: 20,
        height: 20,
        tintColor: '#C4C4C4',
    },
    snsText: {
        textAlign: 'center', // 텍스트 중앙 정렬
        fontSize: vw(3), // 반응형 폰트 크기
        color: '#292929',
        justifyContent: 'space-between',
        marginBottom: vh(5),
    },
    loginButton: {
        width: '85%',
        backgroundColor: '#6D73C6',
        paddingVertical: 10,
        alignItems: 'center',
        borderRadius: 30,
    },
    loginButtonText: {
        fontFamily: 'Inter',
        fontSize: 15 * rem, // 40px
        color: '#FFFFFF',
        marginBottom: vh(0.5),
    },
    rememberContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        width: '85%',
        marginBottom: 20,
    },
    rememberText: {
        fontFamily: 'Inter',
        fontSize: 10.25 * rem,
        color: '#4750BD',
        marginLeft: 10,
    },
    divider: {
        width: '85%',
        borderTopWidth: 1,
        borderColor: '#4750BD',
        marginBottom: 70,
        marginTop: 20,
    },
    socialLoginContainer: {
        width: '85%',
        marginBottom: 20,
    },
    socialButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 15,
        marginBottom: 10,
        borderRadius: 8,
    },
    socialIcon: {
        width: vw(85),
        borderRadius: vh(5),
    },
    socialContainer: {
        marginBottom: 7,
    },
    footer: {
        marginBottom: 20,
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '85%',
    },
    footerText: {
        fontFamily: 'Work Sans',
        fontSize: vw(3.5),
        justifyContent: 'center',
        color: '#292929',
    },
});

export default styles;
