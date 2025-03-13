import React, { useState, useEffect } from "react";

const fetchQuizData = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: 1,
          question: "What is the capital of France?",
          options: [
            { id: 1, text: "Berlin" },
            { id: 2, text: "Madrid" },
            { id: 3, text: "Paris" },
          ],
          correctAnswerId: 3,
        },
        {
          id: 2,
          question: "Which language is used for web development?",
          options: [
            { id: 1, text: "Python" },
            { id: 2, text: "JavaScript" },
            { id: 3, text: "C++" },
          ],
          correctAnswerId: 2,
        },
        {
          id: 3,
          question: "What is 5 + 3?",
          options: [
            { id: 1, text: "6" },
            { id: 2, text: "8" },
            { id: 3, text: "10" },
          ],
          correctAnswerId: 2,
        },
      ]);
    }, 1000); // Simulating network delay
  });
};

const Quiz = () => {
  const [showToast, setShowToast] = useState("");
  const [quizData, setQuizData] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");


  useEffect(() => {
    const loadQuiz = async () => {
      try {
        setLoading(true);
        const data = await fetchQuizData();
        setQuizData(data);
      } catch (err) {
        setError("Failed to load quiz data. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    loadQuiz();
  }, []);

  const handleOptionSelect = (optionId) => {
    if (!selectedOption) {
      setSelectedOption(optionId);
      const isCorrect = optionId === quizData[currentIndex].correctAnswerId;
      if (isCorrect) {
        setScore((prevScore) => prevScore + 1);
        setShowToast("Correct Answer!", "success");
      } else {
        setShowToast("Wrong Answer!", "error");
      }
    }
  };

  const handleNext = () => {
    if (currentIndex < quizData.length - 1) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
      setSelectedOption(null);
    } else {
      setCompleted(true);
      setShowToast("Quiz Completed!", "info");
    }
  };

  const restartQuiz = () => {
    setCurrentIndex(0);
    setScore(0);
    setSelectedOption(null);
    setCompleted(false);
    setShowToast(" Quiz Restarted!", "info");
  };

  if (loading) return <p className="loading">Loading quiz...</p>;
  if (error) return <p className="error">{error} <button onClick={() => window.location.reload()}>Retry</button></p>;

  return (
    <div className="form-container">
      {!completed ? (
        <>
          <h1 className="quiz-title">Quiz App</h1>
          <p className="question">Question : {quizData[currentIndex]?.question}</p>

          <div className="options-container">
            {quizData[currentIndex]?.options.map((option) => (
              <div
                key={`${currentIndex}-${option.id}`} // Unique key
                className={`option-btn ${selectedOption === option.id ? "selected" : ""}`}
                onClick={() => handleOptionSelect(option.id)}
              >
                {option.text}
              </div>
            ))}
          </div>
          <button className="next-btn" onClick={handleNext} disabled={!selectedOption}>
            {currentIndex < quizData.length - 1 ? "Next Question" : "Finish Quiz"}
          </button>
        </>
      ) : (
        <div className="options-container">
          <h3>Quiz Completed!</h3>
          <p>Your Score: {score} / {quizData.length}</p>
          <button className="restart-btn" onClick={restartQuiz}>Restart Quiz</button>
        </div>
      )}
      {showToast && <div>{showToast}</div>}
    </div>
  );
};

export default Quiz;
