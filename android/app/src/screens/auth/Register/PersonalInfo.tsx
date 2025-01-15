import React, { useState,useEffect } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import styles from '../../css/auth/Register/PersonalInfo';

type PersonalInfoProps = {
  navigation: any;
};

const PersonalInfo = ({ navigation }: PersonalInfoProps) => {
    const [isChecked, setIsChecked] = useState(false);
    const [isCheckedTwo, setIsCheckedTwo] = useState(false);

    const handleCheck = () => {
        setIsChecked(!isChecked);
    };

    const handleCheckTwo = () => {
        setIsCheckedTwo(!isCheckedTwo);
    };

    useEffect(() => {
        if (isChecked && isCheckedTwo) {
            navigation.replace('Register');
        }
    }, [isChecked, isCheckedTwo, navigation]);    

    return (
        <View style={styles.container}>
            <Text style={styles.title}>나비잠에 오신 것을 환영합니다.</Text>
            <Text style={styles.subtitle}>약관에 동의 후 이용이 가능합니다.</Text>
            <TouchableOpacity style={styles.description} onPress={handleCheck}>
                <Image 
                    source={isChecked 
                        ? require('../../img/checkInfo_on.png') 
                        : require('../../img/checkInfo_off.png')}
                    style={styles.checkIcon}
                />
                <Text>개인정보 이용/제공/활용 동의</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.description} onPress={handleCheckTwo}>
                <Image 
                    source={isCheckedTwo 
                        ? require('../../img/checkInfo_on.png') 
                        : require('../../img/checkInfo_off.png')}
                    style={styles.checkIcon}
                />
                <Text>이용 약관 동의</Text>
            </TouchableOpacity>
        </View>
    );
};

export default PersonalInfo;