import React, { useState, useCallback } from "react";
import AudioRecorder from "./AudioRecorder";
import EndScreen from "./EndScreen";
import axios from "axios";

const Question = ({ questionNumber, onAnswerSubmit }) => {
  const [audioData, setAudioData] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentQuestionNumber, setCurrentQuestionNumber] =
    useState(questionNumber);

  const handleSubmitAnswer = useCallback(async () => {
    onAnswerSubmit(audioData);
    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("file", audioData);
      const response = await axios.post(
        "https://eojf27dp8uafsrq.m.pipedream.net",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
      console.log(response);
      setCurrentQuestionNumber(currentQuestionNumber + 1);
      setAudioData(null);
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  }, [audioData, currentQuestionNumber, onAnswerSubmit]);

  return (
    <div className="Question">
      {currentQuestionNumber <= 2 ? (
        <>
          <h1>Question {currentQuestionNumber}</h1>
          <p className="question-text">
            {currentQuestionNumber === 1
              ? "What is your name?"
              : "What are your skills and hobbies?"}
          </p>
          {audioData ? (
            <div>
              <p>Answer recorded!</p>
              <button
                className="button"
                onClick={handleSubmitAnswer}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting answer..." : "Submit Answer"}
              </button>
            </div>
          ) : (
            <div>
              <p>Please record your answer to the following question:</p>
              <AudioRecorder onAudioData={setAudioData} />
            </div>
          )}
        </>
      ) : (
        <EndScreen audioFiles={audioData} />
      )}
    </div>
  );
};

export default Question;
