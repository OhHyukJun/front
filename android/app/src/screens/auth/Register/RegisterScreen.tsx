import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

type NameProps = {
  navigation: any;
};

const RegisterScreen = ({navigation} : NameProps) => {
  const handlePrev = () => {
    navigation.goBack();
  };
  return (
    <View>
      <TouchableOpacity onPress={handlePrev}>
        <Text>회원가입 화면</Text>
      </TouchableOpacity>
    </View>
  );
};

export default RegisterScreen;
