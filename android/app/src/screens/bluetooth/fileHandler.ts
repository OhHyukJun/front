import RNFS from 'react-native-fs';
import { Alert } from 'react-native';
import { Buffer } from 'buffer';
/*
const saveToFile = async (data: number[], sampleRate: number): Promise<void> => {
  try {
    const numChannels = 1; // 모노 채널
    const bitsPerSample = 16;
    const byteRate = (sampleRate * numChannels * bitsPerSample) / 8;
    const blockAlign = (numChannels * bitsPerSample) / 8;

    // RIFF 헤더 생성
    const headerArray = [
      ...new TextEncoder().encode('RIFF'),
      ...Array.from(new Uint8Array(new Uint32Array([36 + data.length * 2]).buffer)),
      ...new TextEncoder().encode('WAVE'),
      ...new TextEncoder().encode('fmt '),
      ...Array.from(new Uint8Array(new Uint32Array([16]).buffer)),
      ...Array.from(new Uint8Array(new Uint16Array([1]).buffer)), // PCM 포맷
      ...Array.from(new Uint8Array(new Uint16Array([numChannels]).buffer)),
      ...Array.from(new Uint8Array(new Uint32Array([sampleRate]).buffer)),
      ...Array.from(new Uint8Array(new Uint32Array([byteRate]).buffer)),
      ...Array.from(new Uint8Array(new Uint16Array([blockAlign]).buffer)),
      ...Array.from(new Uint8Array(new Uint16Array([bitsPerSample]).buffer)),
      ...new TextEncoder().encode('data'),
      ...Array.from(new Uint8Array(new Uint32Array([data.length * 2]).buffer)),
    ];

    // PCM 데이터 변환
    const pcmData = new Int16Array(data);
    const wavData = new Uint8Array([...headerArray, ...new Uint8Array(pcmData.buffer)]);

    // Base64 인코딩
    const base64Data = Buffer.from(wavData).toString('base64');

    // 파일 저장
    const path = `${RNFS.DocumentDirectoryPath}/receivedFile.wav`;
    await RNFS.writeFile(path, base64Data, 'base64');

    console.log(`File saved to: ${path}`);
    Alert.alert('File Saved', `The file has been saved to ${path}`);
  } catch (err) {
    console.error('Failed to save file:', err);
    Alert.alert('Error', 'Failed to save the file.');
  }
};

export default saveToFile;
*/

/**
 * WAV 파일로 저장하는 함수
 * @param data PCM 데이터 배열 (16비트 정수 배열)
 * @param sampleRate 샘플링 속도 (기본값 16000Hz)
 */
const saveToFile = async (data: number[], sampleRate: number = 16000): Promise<void> => {
  try {
    const numChannels = 1; // 모노(Mono) 채널
    const bitsPerSample = 16; // 샘플당 16비트
    const byteRate = (sampleRate * numChannels * bitsPerSample) / 8;
    const blockAlign = (numChannels * bitsPerSample) / 8;
    const dataSize = data.length * 2; // 16비트 데이터이므로 2배 크기


    const headerArray = new Uint8Array([
      0x52, 0x49, 0x46, 0x46,  // "RIFF"
      ...new Uint8Array(new Uint32Array([36 + dataSize]).buffer), // 파일 전체 크기 (44 + 데이터 크기 - 8)
      0x57, 0x41, 0x56, 0x45,  // "WAVE"

      0x66, 0x6D, 0x74, 0x20,  // "fmt "
      0x10, 0x00, 0x00, 0x00,  // fmt chunk size (16 바이트)
      0x01, 0x00,  // 오디오 포맷 (1 = PCM)
      numChannels, 0x00,  // 채널 수 (Mono)
      ...new Uint8Array(new Uint32Array([sampleRate]).buffer), // 샘플링 속도
      ...new Uint8Array(new Uint32Array([byteRate]).buffer),  // 바이트 속도
      blockAlign, 0x00,  // 블록 정렬
      bitsPerSample, 0x00,  // 샘플 당 비트 수

      0x64, 0x61, 0x74, 0x61,  // "data"
      ...new Uint8Array(new Uint32Array([dataSize]).buffer), // 데이터 크기
    ]);

    const pcmData = new Int16Array(data);
    const wavData = new Uint8Array(headerArray.length + pcmData.byteLength);
    wavData.set(headerArray, 0);
    wavData.set(new Uint8Array(pcmData.buffer), headerArray.length);

    const base64Data = Buffer.from(wavData).toString('base64');
    const path = `${RNFS.DocumentDirectoryPath}/receivedFile.wav`;
    await RNFS.writeFile(path, base64Data, 'base64');

    console.log(`File saved to: ${path}`);
    Alert.alert('File Saved', `The file has been saved to ${path}`);
  } catch (err) {
    console.error('Failed to save file:', err);
    Alert.alert('Error', 'Failed to save the file.');
  }
};

export default saveToFile;
