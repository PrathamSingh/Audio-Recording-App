import React from "react";

const EndScreen = ({ audioFiles }) => {
  return (
    <div className="EndScreen">
      <h1>Congratulations for completing your audio assessment!</h1>
      <p>You recorded {audioFiles.length} audio answers:</p>
      {audioFiles.map((audioFile, index) => (
        <div key={`audio-${index}`}>
          <audio src={URL.createObjectURL(audioFile)} controls />
        </div>
      ))}
    </div>
  );
};

export default EndScreen;
