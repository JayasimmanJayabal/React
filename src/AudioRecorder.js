import React, { useState } from 'react';
import { useReactMediaRecorder } from "react-media-recorder";
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
        //pool id
        IdentityPoolId: 'us-east-1_wSIZ6PatW',
      }),
    });

    const s3 = new AWS.S3();
    const fileName = `audio_${Date.now()}.wav`;

    const params = {
      Bucket: 'audio-save', //bucket s3
      Key: fileName,
      Body: blob,
      ContentType: 'audio/wav',
    };

    try {
      await s3.upload(params).promise();
      alert('Audio uploaded successfully!');
    } catch (err) {
      console.error('Error uploading audio:', err);
      alert('Failed to upload audio.');
    } finally {
      setUploading(false);
    }
  };

  const handleStop = async () => {
    stopRecording();
    if (mediaBlobUrl) {
      const blob = await fetch(mediaBlobUrl).then(r => r.blob());
      setAudioUrl(mediaBlobUrl);
      uploadAudio(blob);
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
