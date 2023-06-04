import React, { useState, useEffect, useCallback, useRef } from "react";
import WaveSurfer from "wavesurfer.js";

const AudioRecordingVisualizer = ({ audioData }) => {
  const waveformRef = useRef(null);
  const wavesurfer = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);

  useEffect(() => {
    const options = {
      container: waveformRef.current,
      waveColor: "gray",
      progressColor: "black",
      cursorColor: "OrangeRed",
      barWidth: 3,
      barRadius: 3,
      responsive: true,
      height: 150,
      normalize: true,
      partialRender: true,
    };

    wavesurfer.current = WaveSurfer.create(options);

    wavesurfer.current.loadBlob(audioData);

    wavesurfer.current.on("ready", () => {
      if (wavesurfer.current) {
        wavesurfer.current.setVolume(volume);
      }
    });

    return () => {
      if (wavesurfer.current) {
        wavesurfer.current.destroy();
      }
    };
  }, [audioData, volume]);

  const togglePlayPause = useCallback(() => {
    setIsPlaying(!isPlaying);
    wavesurfer.current.playPause();
  }, [isPlaying]);

  const handleVolumeChange = useCallback((e) => {
    const newVolume = +e.target.value;

    if (newVolume) {
      setVolume(newVolume);
      wavesurfer.current.setVolume(newVolume);
    }
  }, []);

  return (
    <div>
      <div ref={waveformRef} />
      <div className="controls">
        <button onClick={togglePlayPause}>
          {isPlaying ? "Pause" : "Play"}
        </button>
        <input
          type="range"
          id="volume"
          name="volume"
          min="0.01"
          max="1"
          step=".025"
          value={volume}
          onChange={handleVolumeChange}
        />
        <label htmlFor="volume">Volume</label>
      </div>
    </div>
  );
};

export default AudioRecordingVisualizer;
