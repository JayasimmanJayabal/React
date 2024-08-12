import React, { useState } from 'react';
import { useReactMediaRecorder } from "react-media-recorder-2";
import AWS from 'aws-sdk';

const AudioRecorder = () => {
  const [audioUrl, setAudioUrl] = useState('');
  const [uploading, setUploading] = useState(false);

  const { startRecording, stopRecording, mediaBlobUrl } = useReactMediaRecorder({ audio: true });

  const uploadAudio = async (blob) => {
    setUploading(true);

    AWS.config.update({
      region: 'us-east-1',
      credentials: new AWS.CognitoIdentityCredentials({
        IdentityPoolId: 'us-east-1:44bbc88a-8392-48f4-988e-8e59e88be7f7', 
      }),
    });

    const s3 = new AWS.S3();
    const fileName = `audio_${Date.now()}.wav`;

    const params = {
      Bucket: 'audio-save',
      Key: fileName,
      Body: blob,
      ContentType: 'audio/wav',
    };

    try {
      const data = await s3.upload(params).promise();
      alert('Audio uploaded successfully!');
      console.log('Upload Success:', data);
    } catch (err) {
      alert(`Failed to upload audio. Error: ${err.message}`);
    } finally {
      setUploading(false);
    }
  };

  const handleStop = async () => {
    stopRecording();
    if (mediaBlobUrl) {
      try {
        const blob = await fetch(mediaBlobUrl).then(r => r.blob());
        setAudioUrl(mediaBlobUrl);
        await uploadAudio(blob);
      } catch (error) {
        console.error('Error processing audio:', error);
        alert(`Error processing audio: ${error.message}`);
      }
    }
  };

  return (
    <div>
      <button onClick={startRecording}>Start Recording</button>
      <button onClick={handleStop} disabled={uploading}>Stop & Upload</button>
      {audioUrl && <audio src={audioUrl} controls />}
    </div>
  );
};

export default AudioRecorder;
