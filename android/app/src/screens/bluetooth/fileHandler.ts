import RNFS from 'react-native-fs';
import { Alert } from 'react-native';
import { Buffer } from 'buffer';

const saveToFile = async (data: number[], sampleRate: number = 16000): Promise<void> => {
  try {
    const numChannels = 1; // 모노(Mono) 채널
    const bitsPerSample = 16; // 샘플당 16비트
    const byteRate = (sampleRate * numChannels * bitsPerSample) / 8;
    const blockAlign = (numChannels * bitsPerSample) / 8;
    const dataSize = data.length * 2; // 16비트 데이터이므로 2배 크기
    const totalSize = 36 + dataSize;

    // WAV 헤더 생성 (Little Endian)
    const header = new ArrayBuffer(44);
    const view = new DataView(header);

    const writeString = (offset: number, str: string) => {
      for (let i = 0; i < str.length; i++) {
        view.setUint8(offset + i, str.charCodeAt(i));
      }
    };

    // RIFF 헤더
    writeString(0, 'RIFF');
    view.setUint32(4, totalSize, true); // 전체 파일 크기 (Little Endian)
    writeString(8, 'WAVE');

    // fmt 서브 청크
    writeString(12, 'fmt ');
    view.setUint32(16, 16, true); // fmt 청크 크기 (16 bytes)
    view.setUint16(20, 1, true); // 오디오 포맷 (PCM = 1)
    view.setUint16(22, numChannels, true); // 채널 수
    view.setUint32(24, sampleRate, true); // 샘플링 속도
    view.setUint32(28, byteRate, true); // 바이트 속도
    view.setUint16(32, blockAlign, true); // 블록 정렬
    view.setUint16(34, bitsPerSample, true); // 샘플 당 비트 수

    // data 서브 청크
    writeString(36, 'data');
    view.setUint32(40, dataSize, true); // 데이터 크기

    // PCM 데이터 변환 (Int16 배열)
    const pcmData = new Int16Array(data);
    const wavData = new Uint8Array(header.byteLength + pcmData.byteLength);
    wavData.set(new Uint8Array(header), 0);
    wavData.set(new Uint8Array(pcmData.buffer), header.byteLength);

    // 파일 저장 (Base64 없이 RAW 바이너리 데이터 저장)
    const path = `${RNFS.ExternalDirectoryPath}/receivedFile.wav`;
    await RNFS.writeFile(path, Buffer.from(wavData).toString('binary'), 'ascii');

    console.log(`File saved to: ${path}`);
    Alert.alert('File Saved', `The file has been saved to ${path}`);
  } catch (err) {
    console.error('Failed to save file:', err);
    Alert.alert('Error', 'Failed to save the file.');
  }
};

export default saveToFile;

