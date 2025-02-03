import RNFS from 'react-native-fs';
import { Alert } from 'react-native';
import { Buffer } from 'buffer';

const saveToFile = async (data: number[], sampleRate: number): Promise<void> => {
  try {
    const numChannels = 1; // Mono channel
    const bitsPerSample = 16;
    const byteRate = (sampleRate * numChannels * bitsPerSample) / 8;
    const blockAlign = (numChannels * bitsPerSample) / 8;

    // RIFF header creation
    const headerArray = [
      ...new Uint8Array(new TextEncoder().encode('RIFF')), // ChunkID
      ...new Uint8Array(new Uint32Array([36 + data.length * 2]).buffer), // ChunkSize
      ...new Uint8Array(new TextEncoder().encode('WAVE')), // Format
      ...new Uint8Array(new TextEncoder().encode('fmt ')), // Subchunk1ID
      ...new Uint8Array(new Uint32Array([16]).buffer), // Subchunk1Size
      ...new Uint8Array(new Uint16Array([1]).buffer), // AudioFormat (PCM)
      ...new Uint8Array(new Uint16Array([numChannels]).buffer), // NumChannels
      ...new Uint8Array(new Uint32Array([sampleRate]).buffer), // SampleRate
      ...new Uint8Array(new Uint32Array([byteRate]).buffer), // ByteRate
      ...new Uint8Array(new Uint16Array([blockAlign]).buffer), // BlockAlign
      ...new Uint8Array(new Uint16Array([bitsPerSample]).buffer), // BitsPerSample
      ...new Uint8Array(new TextEncoder().encode('data')), // Subchunk2ID
      ...new Uint8Array(new Uint32Array([data.length * 2]).buffer), // Subchunk2Size
    ];

    // Convert PCM data
    const pcmData = new Int16Array(data);
    const wavData = new Uint8Array([...headerArray, ...new Uint8Array(pcmData.buffer)]);

    // Encode as Base64
    const base64Data = Buffer.from(wavData).toString('base64');

    // Save file
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

/*
const saveToFile = async (data: number[], sampleRate: number): Promise<void> => {
  try {
    console.log(`Saving file with ${data.length} samples`);
    const numChannels = 1;
    const bitsPerSample = 16;
    const byteRate = (sampleRate * numChannels * bitsPerSample) / 8;
    const blockAlign = (numChannels * bitsPerSample) / 8;

    // WAV 헤더 생성
    const headerArray = [
      ...new Uint8Array(Buffer.from('RIFF')), 
      ...new Uint8Array(new Uint32Array([36 + data.length * 2]).buffer), 
      ...new Uint8Array(Buffer.from('WAVE')), 
      ...new Uint8Array(Buffer.from('fmt ')), 
      ...new Uint8Array(new Uint32Array([16]).buffer), 
      ...new Uint8Array(new Uint16Array([1]).buffer), 
      ...new Uint8Array(new Uint16Array([numChannels]).buffer), 
      ...new Uint8Array(new Uint32Array([sampleRate]).buffer), 
      ...new Uint8Array(new Uint32Array([byteRate]).buffer), 
      ...new Uint8Array(new Uint16Array([blockAlign]).buffer), 
      ...new Uint8Array(new Uint16Array([bitsPerSample]).buffer), 
      ...new Uint8Array(Buffer.from('data')), 
      ...new Uint8Array(new Uint32Array([data.length * 2]).buffer), 
    ];

    // PCM 데이터 변환
    const pcmData = new Int16Array(data);
    const wavData = new Uint8Array([...headerArray, ...new Uint8Array(pcmData.buffer)]);

    // 파일 저장
    const path = `${RNFS.DocumentDirectoryPath}/receivedFile.wav`;
    await RNFS.writeFile(path, Buffer.from(wavData).toString('base64'), 'base64');
    console.log(`File saved to: ${path}`);
    Alert.alert('File Saved', `The file has been saved to ${path}`);
  } catch (err) {
    console.error('Failed to save file:', err);
    Alert.alert('Error', 'Failed to save the file.');
  }
};
*/

