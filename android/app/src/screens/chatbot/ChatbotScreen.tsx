import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList } from 'react-native';
import styles from '../css/ChatbotScreen';

const ChatbotScreen = ({ navigation }: { navigation: any }) => {
  const [messages, setMessages] = useState([
    { id: '1', text: '안녕하세요! 무엇이든지 알려드립니다.', sender: 'bot' },
  ]);
  const [inputText, setInputText] = useState('');

  const handlePrev = () => {
    navigation.goBack();
  };

  const sendMessage = () => {
    if (inputText.trim() === '') return;
    const newMessage = { id: Date.now().toString(), text: inputText, sender: 'user' };
    setMessages([...messages, newMessage]);
    setInputText('');

    setTimeout(() => {
      const botResponse = { id: Date.now().toString(), text: '분석 중입니다...', sender: 'bot' };
      setMessages((prevMessages) => [...prevMessages, botResponse]);
    }, 1000);
  };

  const renderMessage = ({ item }: { item: { id: string; text: string; sender: string } }) => (
    <View style={[styles.messageBubble, item.sender === 'user' ? styles.userBubble : styles.botBubble]}>
      <Text style={styles.messageText}>{item.text}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>나비잠</Text>
      </View>

      <FlatList
        data={messages}
        renderItem={renderMessage}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.chatContainer}
      />

      <View style={styles.suggestionContainer}>
        {['예방접종', '열이 나요', '두드러기', '목에 가시가 박혔어요', '장난감을 삼켰어요'].map((suggestion, index) => (
          <TouchableOpacity key={index} style={styles.suggestionButton} onPress={() => setInputText(suggestion)}>
            <Text style={styles.suggestionText}>{suggestion}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.inputBox}
          placeholder="메시지를 입력하세요..."
          value={inputText}
          onChangeText={setInputText}
        />
        <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
          <Text style={styles.sendButtonText}>전송</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ChatbotScreen;
