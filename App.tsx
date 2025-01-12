import React, { useState } from 'react';
import SplashScreen from './android/app/src/screens/SplashScreen';
import MainScreen from './android/app/src/screens/MainScreen';
import BLEConnection from './android/app/src/screens/BLEConnection';

const App = () => {
  const [currentScreen, setCurrentScreen] = useState<'splash' | 'main' | 'bluetooth'>('splash');

  // 스플래시 화면 종료 후 메인 화면으로 전환
  const handleSplashFinish = () => {
    setCurrentScreen('main');
  };

  // 메인 화면에서 블루투스 연결 화면으로 전환
  const navigateToBluetooth = () => {
    setCurrentScreen('bluetooth');
  };

  // 현재 화면 상태에 따라 적절한 컴포넌트를 렌더링
  if (currentScreen === 'splash') {
    return <SplashScreen onFinish={handleSplashFinish} />;
  }

  if (currentScreen === 'main') {
    return <MainScreen onNavigateToBluetooth={navigateToBluetooth} />;
  }

  return <BLEConnection />;
};

export default App;
