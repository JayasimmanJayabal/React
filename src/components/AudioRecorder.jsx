import React, { useState } from 'react';
import { ReactMic } from 'react-mic';

const AudioRecorder = ({ onStop }) => {
  const [recording, setRecording] = useState(false);

  const startRecording = () => {
    setRecording(true);
  };

  const stopRecording = () => {
    setRecording(false);
  };

  return (
    <div>
      <ReactMic
        record={recording}
        className="sound-wave"
        onStop={onStop}
        strokeColor="#000000"
        backgroundColor="#FF4081"
      />
      <button onClick={startRecording}>Start Recording</button>
      <button onClick={stopRecording}>Stop Recording</button>
    </div>
  );
};

export default AudioRecorder;
