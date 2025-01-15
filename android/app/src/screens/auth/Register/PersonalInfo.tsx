import React, { useState,useEffect } from 'react';
import { View, Text, Image, Button, TouchableOpacity, ScrollView } from 'react-native';
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
            <View style={styles.headerContainer}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Text style={styles.backButtonText}>{'<'}</Text>
                </TouchableOpacity>
                <Text style={styles.headerTitle}>약관 동의서</Text>
            </View>
            <View style={styles.divider}/>
            <Text style={styles.title}>나비잠에 오신 것을 환영합니다.</Text>
            <Text style={styles.subtitle}>약관에 동의 후 이용이 가능합니다.</Text>
            <TouchableOpacity style={styles.descriptionContainer} onPress={handleCheck}>
                <Image 
                    source={isChecked
                        ? require('../../img/checkbox_on.png')
                        : require('../../img/checkbox_off.png')}
                    style={styles.checkIcon}
                />
                <Text style={styles.description}>개인정보 이용/제공/활용 동의</Text>
            </TouchableOpacity>
            <View style={styles.infoContainer}>
                <ScrollView contentContainerStyle={styles.scrollContent}>
                    <Text style={styles.infoText}>
                        「정보통신망 이용촉진 및 정보보호에 관한 법률」 및
                        「개인정보보호법」 등 관련 법령상의 개인정보보호 규정을 준수하여
                        「나비잠」 사용자의 개인정보 및 권익을 보호하고, 개인정보와 관련한
                        참가자의 고충을 원활하게 처리할 수 있도록 다음과 같은 개인정보
                        처리방침을 두고 있습니다.
                        「정보통신망 이용촉진 및 정보보호에 관한 법률」 및
                        「개인정보보호법」 등 관련 법령상의 개인정보보호 규정을 준수하여
                        「나비잠」 사용자의 개인정보 및 권익을 보호하고, 개인정보와 관련한
                        참가자의 고충을 원활하게 처리할 수 있도록 다음과 같은 개인정보
                        처리방침을 두고 있습니다.
                        「정보통신망 이용촉진 및 정보보호에 관한 법률」 및
                        「개인정보보호법」 등 관련 법령상의 개인정보보호 규정을 준수하여
                        「나비잠」 사용자의 개인정보 및 권익을 보호하고, 개인정보와 관련한
                        참가자의 고충을 원활하게 처리할 수 있도록 다음과 같은 개인정보
                        처리방침을 두고 있습니다.
                    </Text>
                </ScrollView>
            </View>
            <TouchableOpacity style={styles.descriptionContainer} onPress={handleCheckTwo}>
                <Image
                    source={isCheckedTwo
                        ? require('../../img/checkbox_on.png')
                        : require('../../img/checkbox_off.png')}
                    style={styles.checkIcon}
                />
                <Text style={styles.description}>이용 약관 동의</Text>
            </TouchableOpacity>
            <View style={styles.infoContainer}>
                <ScrollView contentContainerStyle={styles.scrollContent}>
                    <Text style={styles.infoText}>
                        「정보통신망 이용촉진 및 정보보호에 관한 법률」 및
                        「개인정보보호법」 등 관련 법령상의 개인정보보호 규정을 준수하여
                        「나비잠」 사용자의 개인정보 및 권익을 보호하고, 개인정보와 관련한
                        참가자의 고충을 원활하게 처리할 수 있도록 다음과 같은 개인정보
                        처리방침을 두고 있습니다.
                        「정보통신망 이용촉진 및 정보보호에 관한 법률」 및
                        「개인정보보호법」 등 관련 법령상의 개인정보보호 규정을 준수하여
                        「나비잠」 사용자의 개인정보 및 권익을 보호하고, 개인정보와 관련한
                        참가자의 고충을 원활하게 처리할 수 있도록 다음과 같은 개인정보
                        처리방침을 두고 있습니다.
                         「개인정보보호법」 등 관련 법령상의 개인정보보호 규정을 준수하여
                        「나비잠」 사용자의 개인정보 및 권익을 보호하고, 개인정보와 관련한
                        참가자의 고충을 원활하게 처리할 수 있도록 다음과 같은 개인정보
                        처리방침을 두고 있습니다.
                    </Text>
                </ScrollView>
            </View>
            <Button title='확인하기'/>
        </View>
    );
};

export default PersonalInfo;
