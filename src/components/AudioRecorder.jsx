import React, { useState, useCallback } from "react";
import MicRecorder from "mic-recorder-to-mp3";

const Mp3Recorder = new MicRecorder({ bitRate: 328 });

const AudioRecorder = ({ onAudioData }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [blobURL, setBlobURL] = useState("");

  const startAudioRecording = useCallback(() => {
    setIsRecording(true);
    Mp3Recorder.start()
      .then(() => {})
      .catch((e) => console.error(e));
  }, []);

  const stopAudioRecording = useCallback(() => {
    setIsRecording(false);
    Mp3Recorder.stop()
      .getMp3()
      .then(([buffer, blob]) => {
        const url = URL.createObjectURL(blob);
        setBlobURL(url);
        onAudioData(blob);
      })
      .catch((e) => console.error(e));
  }, [onAudioData]);

  return (
    <div>
      {isRecording ? (
        <button className="button" onClick={stopAudioRecording}>
          Stop Recording
        </button>
      ) : (
        <button className="button" onClick={startAudioRecording}>
          Start Recording
        </button>
      )}
      {blobURL && (
        <div>
          <audio src={blobURL} controls />
        </div>
      )}
    </div>
  );
};

export default AudioRecorder;
