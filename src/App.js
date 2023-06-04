import React, { useState } from "react";
import Question from "./components/Question";
import EndScreen from "./components/EndScreen";
import AudioRecordingVisualizer from "./components/AudioRecordingVisualizer";
import "./App.css";

const App = () => {
  const [audioFiles, setAudioFiles] = useState([]);

  const handleAnswerSubmit = (audioData) => {
    setAudioFiles([...audioFiles, audioData]);
  };

  return (
    <div className="App">
      {audioFiles.length < 2 ? (
        <Question
          questionNumber={audioFiles.length + 1}
          onAnswerSubmit={handleAnswerSubmit}
        />
      ) : (
        <EndScreen audioFiles={audioFiles} />
      )}

      {audioFiles.length > 0 && (
        <AudioRecordingVisualizer audioData={audioFiles[audioFiles.length - 1]} />
      )}
    </div>
  );
};

export default App;
