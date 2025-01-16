import { StyleSheet, Dimensions } from 'react-native';
import { vw, vh, vmin, vmax } from 'react-native-expo-viewport-units';

const SCREEN_WIDTH = Dimensions.get('window').width;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffff',
    },
    scrollView: {
        flex: 1,
    },
    page: {
        width: SCREEN_WIDTH,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    pagination: {
        width: vw(27),
        height: vh(2.5),
        backgroundColor: '#EDEEFF',
        borderRadius: 20,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: vh(2),
        paddingVertical: 10,
    },
    dot: {
        height: vw(2),
        width: vw(2),
        backgroundColor: '#d0d0d0',
        borderRadius: vw(1),
        marginHorizontal: 10,
    },
    activeDot: {
        backgroundColor: '#000000',
    },
    inactiveDot: {
        backgroundColor: 'lightgray',
    },
});

export default styles;
