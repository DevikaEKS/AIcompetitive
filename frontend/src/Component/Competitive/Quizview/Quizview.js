import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Quizview.css"; // Create this file for custom styles

function Quizview() {
  const [questions, setQuestions] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [error, setError] = useState(null);

  // Fetch questions from the API
  useEffect(() => {
    axios
      .get("http://localhost:5000/quiz/getquestion")
      .then((res) => setQuestions(res.data))
      .catch((err) => setError("Failed to load questions. Please try again."));
  }, []);

  // Handle answer selection
  const handleAnswerChange = (questionId, optionValue) => {
    setSelectedAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: optionValue,
    }));
  };

  // Handle navigation between questions
  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSubmit = () => {
    console.log("Selected Answers:", selectedAnswers);
    alert("Quiz submitted successfully!");
  };

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="container mt-4">
      <div className="row">
        <h2 className="text-center mb-4">Quiz Questions</h2>
        <div className="col-sm-12 col-md-7 my-1">
          {error ? (
            <p className="text-center ">{error}</p>
          ) : questions.length > 0 ? (
            <div
              className={`card mb-3 h-100 p-4 ${
                currentQuestionIndex === questions.indexOf(currentQuestion)
                  ? "active-question"
                  : ""
              }`}
            >
              <div className="card-header">
                <h5>
                  Question {currentQuestionIndex + 1} of {questions.length}
                </h5>
              </div>
              <div className="card-body">
                <p
                  dangerouslySetInnerHTML={{ __html: currentQuestion.text }}
                ></p>
                <div>
                  {currentQuestion.option.map((opt, i) => (
                    <div key={i} className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name={`question-${currentQuestion.id}`}
                        id={`question-${currentQuestion.id}-option-${i}`}
                        value={opt.option}
                        checked={
                          selectedAnswers[currentQuestion.id] === opt.option
                        }
                        onChange={() =>
                          handleAnswerChange(currentQuestion.id, opt.option)
                        }
                      />
                      <label
                        className="form-check-label"
                        htmlFor={`question-${currentQuestion.id}-option-${i}`}
                      >
                        {opt.option}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              <div className="d-flex justify-content-between">
                <button
                  className="btn btn-secondary me-2"
                  onClick={handlePrevious}
                  disabled={currentQuestionIndex === 0}
                >
                  Previous
                </button>
                {currentQuestionIndex < questions.length - 1 ? (
    <button
      className="btn btn-primary me-2"
      onClick={handleNext}
    >
      Next
    </button>
  ) : (
    <button
      className="btn btn-success"
      onClick={handleSubmit}
    >
      Submit Quiz
    </button>
  )}
              </div>
            </div>
          ) : (
            <p className="text-center">Loading questions...</p>
          )}
        </div>
        
<div className="col-sm-12 col-md-5 my-1">
  <div className="card d-flex flex-row flex-wrap text-center p-3 circle-indicator1">
    {questions.map((_, index) => (
      <div
        key={index}
        onClick={() => setCurrentQuestionIndex(index)} // Update currentQuestionIndex
        className={`circle-indicator mx-2 my-2 ${
          currentQuestionIndex === index ? "active" : ""
        }`}
        
        style={{ cursor: "pointer" }} // Add pointer cursor for better UX
      >
        {index + 1}
      </div>
    ))}
  </div>
</div>
      </div>
    </div>
  );
}

export default Quizview;
