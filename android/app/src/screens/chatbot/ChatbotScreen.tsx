import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, BackHandler } from 'react-native';
import styles from '../css/ChatbotScreen';

const SOCKET_URL = 'ws://ai-aivle-18-bigp-back-f4gud0d5hedhh8gj.koreacentral-01.azurewebsites.net/chat';

const ChatbotScreen = ({ navigation }: { navigation: any }) => {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [messages, setMessages] = useState([
    { id: '1', text: '안녕하세요! 무엇이든지 알려드립니다.', sender: 'bot' },
  ]);
  const [inputText, setInputText] = useState('');

  // 현재 시간 계산 함수
  const calculateDateTime = () => {
    const timestamp = new Date();
    const year = timestamp.getFullYear();
    const month = String(timestamp.getMonth() + 1).padStart(2, '0');
    const day = String(timestamp.getDate()).padStart(2, '0');
    const hours = String(timestamp.getHours()).padStart(2, '0');
    const min = String(timestamp.getMinutes()).padStart(2, '0');
    const sec = String(timestamp.getSeconds()).padStart(2, '0');
    return `${year}-${month}-${day} ${hours}:${min}:${sec}`;
  };

  useEffect(() => {
    const ws = new WebSocket(SOCKET_URL);

    ws.onopen = () => {
      console.log('WebSocket 연결 성공');
    };

    ws.onmessage = (event) => {
      console.log('서버 응답:', event.data);
      try {
        const response = JSON.parse(event.data);
        if (response.header === 'Answer') {
          setMessages((prevMessages) => {
            // "분석 중입니다..." 메시지 제거 후 응답 추가
            const filteredMessages = prevMessages.filter((msg) => msg.id !== 'processing');
            return [...filteredMessages, { id: Date.now().toString(), text: response.data, sender: 'bot' }];
          });
        } else if (response.header === 'Goodbye') {
          setMessages((prevMessages) => [...prevMessages, { id: Date.now().toString(), text: 'Connection Refused', sender: 'bot' }]);
          ws.close();
        }
      } catch (error) {
        console.error('JSON 파싱 오류:', error);
      }
    };

    ws.onerror = (error) => {
      console.error('WebSocket 오류 발생:', error);
    };

    ws.onclose = (event) => {
      console.log(`WebSocket 연결 종료 - 코드: ${event.code}, 이유: ${event.reason || '서버에서 이유 제공 없음'}`);
    };

    setSocket(ws);

    // **핸드폰 뒤로가기 버튼 처리**
    const handleBackPress = () => {
      console.log('뒤로가기 버튼 클릭됨, WebSocket 연결 해제 후 나가기');
      if (ws.readyState === WebSocket.OPEN) {
        ws.close();
      }
      navigation.goBack(); // 이전 화면으로 이동
      return true; // 뒤로가기 이벤트를 차단하여 기본 동작(앱 종료)을 방지
    };

    BackHandler.addEventListener('hardwareBackPress', handleBackPress);

    return () => {
      ws.close();
      BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
    };
  }, []);

  const sendMessage = () => {
    if (!socket || socket.readyState !== WebSocket.OPEN) {
      console.error('WebSocket이 열려있지 않거나 유효하지 않습니다.');
      return;
    }

    if (inputText.trim() === '') return;

    const userMessage = { id: Date.now().toString(), text: inputText, sender: 'user' };
    setMessages((prevMessages) => [...prevMessages, userMessage]);

    setInputText('');

    // "분석 중입니다..." 메시지 추가 (중복 방지)
    setMessages((prevMessages) => {
      if (!prevMessages.some((msg) => msg.id === 'processing')) {
        return [...prevMessages, { id: 'processing', text: '분석 중입니다...', sender: 'bot' }];
      }
      return prevMessages;
    });

    // 서버에 메시지 전송
    const messagePayload = {
      type: 'message',
      header: 'Question',
      data: inputText,
      time: calculateDateTime(),
    };

    socket.send(JSON.stringify(messagePayload));
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
