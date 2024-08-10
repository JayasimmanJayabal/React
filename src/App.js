import React from 'react';
import Recorder from './components/AudioRecorder';

const App = () => {
  const handleStop = (recordedBlob) => {
    console.log('recordedBlob is: ', recordedBlob);
    // Upload the blob to your backend here
  };

  return (
    <div className="App">
      <h1>Audio Recording and Uploading App</h1>
      <Recorder onStop={handleStop} />
    </div>
  );
};

export default App;
