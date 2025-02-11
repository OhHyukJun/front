import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, BackHandler, AppState, InteractionManager  } from 'react-native';
import styles from '../css/ChatbotScreen';
import { accessTokenState } from '../../atom/login';
import { useRecoilValue } from 'recoil';

const SOCKET_URL = 'wss://ai-aivle-18-bigp-back-f4gud0d5hedhh8gj.koreacentral-01.azurewebsites.net/chat';

const ChatbotScreen = ({ navigation }: { navigation: any }) => {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [messages, setMessages] = useState([{ id: '1', text: '안녕하세요! 육아 도우미 챗봇 나비잠입니다. 육아에 대해 궁금한 사항을 알려주세요.', sender: 'bot' }]);
  const [inputText, setInputText] = useState('');
  const accessToken = useRecoilValue(accessTokenState);
  const flatListRef = useRef<FlatList>(null);
  const reconnectInterval = useRef<number>(1000); // 초기 재연결 시간 1초
  const isConnected = useRef<boolean>(false);
  const messagesRef = useRef(messages);
  messagesRef.current = messages;

  // WebSocket 연결 함수
  const connectWebSocket = () => {
    if (isConnected.current) return;

    console.log('WebSocket 연결 시도 중...');
    const ws = new WebSocket(SOCKET_URL);

    ws.onopen = () => {
      console.log('WebSocket 연결 성공');
      isConnected.current = true;
      reconnectInterval.current = 1000;

      // 서버에 인증 정보 포함하여 초기 메시지 전송
      const greetingPayload = {
        type: 'message',
        header: 'Greeting',
        accessToken: accessToken,
      };
      ws.send(JSON.stringify(greetingPayload));
    };

    ws.onmessage = (event) => {
      try {
        const response = JSON.parse(event.data);

        if (response.header === 'Greeting' && response.data.request.length > 0 && response.data.response.length > 0) {
          let previousMessages = [];
          for (let i = 0; i < response.data.response.length; i++) {
            previousMessages.push({ id: `req-${i}-${Date.now()}`, text: response.data.request[i], sender: 'user' });
            previousMessages.push({ id: `res-${i}-${Date.now()}`, text: response.data.response[i], sender: 'bot' });
          }
          setMessages((prevMessages) => {
            const welcomeMessage = prevMessages.find((msg) => msg.id === '1');
            return welcomeMessage ? [welcomeMessage, ...previousMessages] : [...previousMessages];
          });

          scrollToBottom();
        }

        if (response.header === 'Answer') {
          setMessages((prevMessages) =>
            prevMessages.filter((msg) => msg.id !== 'processing').concat([
              { id: `answer-${Date.now()}`, text: response.data, sender: 'bot' },
            ])
          );

          scrollToBottom();
        } else if (response.header === 'Goodbye') {
          setMessages((prevMessages) => [...prevMessages, { id: `goodbye-${Date.now()}`, text: 'Connection Refused', sender: 'bot' }]);
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
      console.log(`WebSocket 종료됨 - 코드: ${event.code}, 이유: ${event.reason || '서버에서 이유 제공 없음'}`);
      isConnected.current = false;

      // 홈 화면에서는 WebSocket을 다시 연결하지 않음
      if (AppState.currentState !== 'active') {
        console.log('앱이 백그라운드 상태이므로 WebSocket을 재연결하지 않음.');
        return;
      }

      // 자동 재연결 (점진적 대기 시간 증가)
      setTimeout(() => {
        console.log(`WebSocket 재연결 시도 (${reconnectInterval.current / 1000}초 후)`);
        connectWebSocket();
        reconnectInterval.current = Math.min(reconnectInterval.current * 2, 30000);
      }, reconnectInterval.current);
    };

    setSocket(ws);
  };

  useEffect(() => {
    if (accessToken) {
      connectWebSocket();
    } else {
      console.error('accessToken이 없습니다.');
    }

    // 백 버튼 감지하여 WebSocket 닫기
    const handleBackPress = () => {
      if (socket && socket.readyState === WebSocket.OPEN) {
        socket.close();
      }
      setTimeout(() => {
        navigation.navigate('Home');
      }, 300);
      return true;
    };

    BackHandler.addEventListener('hardwareBackPress', handleBackPress);

    return () => {
      if (socket) {
        socket.close();
        setSocket(null);
      }
      BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
    };
  }, [accessToken]);

  const sendMessage = () => {
    if (!socket || socket.readyState !== WebSocket.OPEN) {
      console.error('WebSocket이 열려있지 않거나 유효하지 않습니다.');
      return;
    }

    if (inputText.trim() === '') return;
    setMessages((prevMessages) => {
      const updatedMessages = [...prevMessages, 
          { id: Date.now().toString(), text: inputText, sender: 'user' }
      ];
      if (!updatedMessages.some((msg) => msg.id === 'processing')) {
        updatedMessages.push({ id: 'processing', text: '분석 중입니다...', sender: 'bot' });
      }

      return updatedMessages;
    });
    setTimeout(() => setInputText(''), 10);

    scrollToBottom();

    const messagePayload = {
      type: 'message',
      header: 'Question',
      data: inputText,
      accessToken: accessToken,
    };

    socket.send(JSON.stringify(messagePayload));
  };

  const scrollToBottom = () => {
    InteractionManager.runAfterInteractions(() => {
      if (flatListRef.current) {
        flatListRef.current.scrollToEnd({ animated: true });
      }
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>나비잠</Text>
      </View>

      <FlatList
        ref={flatListRef}
        data={messages}
        keyExtractor={(item, index) => item.id ? `msg-${item.id}` : `msg-${index}-${Date.now()}`}
        renderItem={({ item }) => (
          <View style={[styles.messageBubble, item.sender === 'user' ? styles.userBubble : styles.botBubble]}>
            <Text style={styles.messageText}>{item.text}</Text>
          </View>
        )}
        contentContainerStyle={styles.chatContainer}
        onLayout={scrollToBottom}
        onContentSizeChange={(_, __) => scrollToBottom()}
      />

      <View style={styles.suggestionContainer}>
        {['예방접종', '열이 나요', '두드러기', '목에 가시가 박혔어요'].map((suggestion, index) => (
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
