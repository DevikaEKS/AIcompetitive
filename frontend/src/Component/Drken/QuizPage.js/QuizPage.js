
// import React, { useEffect, useState } from "react";
// import DOMPurify from "dompurify";
// import ProgressBar from "react-bootstrap/ProgressBar";
// import axios from "axios";
// import "./Quizpage.css";
// import { useNavigate, useParams } from "react-router-dom";

// function QuizPage() {
//   const [difficultyLevel, setDifficultyLevel] = useState(1);
//   const [questions, setQuestions] = useState([]);
//   const [filteredQuestions, setFilteredQuestions] = useState([]);
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [selectedOptions, setSelectedOptions] = useState({});
//   const [answeredQuestions, setAnsweredQuestions] = useState(new Set());
//   const [score, setScore] = useState(0);
//   const [level1Correct, setLevel1Correct] = useState(0);
//   const [level2Correct, setLevel2Correct] = useState(0);
//   const nav = useNavigate("");

//   const { id, quiz_type, course } = useParams();

//   useEffect(() => {
//     axios
//       .get("/quizData.json")
//       .then((res) => {
//         // setQuestions(res.data.questions);
//         setDifficultyLevel(res.data.difficulty_level);
//       })
//       .catch((err) => console.error(err));
//   }, []);

//   useEffect(() => {
//     axios
//       .get(`${process.env.REACT_APP_API_URL}quiz/sample-past-papers/${course}/${quiz_type}`)
//       .then((res) => {
//         setQuestions(res.data.data);
//       }).catch(err=>{
//         console.log(err);
//       })
//   }, [course,quiz_type]);

//   useEffect(() => {
//     const filtered = questions.filter(
//       (q) =>
//         difficultyLevel === 1 ||
//         (difficultyLevel === 2 && q.difficulty_level <= 2) ||
//         (difficultyLevel === 3 && q.difficulty_level <= 3)
//     );
//     setFilteredQuestions(filtered);
//   }, [questions, difficultyLevel]);

//   const handleOptionChange = (questionId, event) => {
//     const value = event.target.value;
//     setSelectedOptions((prev) => ({
//       ...prev,
//       [questionId]: value,
//     }));
//     setAnsweredQuestions((prev) => new Set([...prev, currentIndex]));
//   };

//   const validateAnswer = (questionId) => {
//     const question = filteredQuestions.find((q) => q.id === questionId);
//     if (question && selectedOptions[questionId] === question.correct_answer) {
//       setScore((prev) => prev + 1);
//       if (question.difficulty_level === 1) setLevel1Correct((prev) => prev + 1);
//       if (question.difficulty_level === 2) setLevel2Correct((prev) => prev + 1);
//     }
//   };

//   const updateDifficultyLevel = () => {
//     if (difficultyLevel === 1 && level1Correct >= 4) {
//       setDifficultyLevel(2);
//     } else if (difficultyLevel === 2 && level2Correct >= 3) {
//       setDifficultyLevel(3);
//     }
//   };

//   const handleNext = () => {
//     validateAnswer(filteredQuestions[currentIndex].id);
//     if (currentIndex < filteredQuestions.length - 1) {
//       setCurrentIndex((prev) => prev + 1);
//     } else {
//       updateDifficultyLevel();
//     }
//   };

//   const handlePrevious = () => {
//     if (currentIndex > 0) {
//       setCurrentIndex((prev) => prev - 1);
//     }
//   };

//   const handleSubmit = async () => {
//     // Prepare the result field in the required format
//     const result = filteredQuestions.map((question) => {
//       const userAnswer = selectedOptions[question.id];
//       const isCorrect = userAnswer === question.correct_answer;
//       return {
//         question_id: question.id,
//         user_answer: userAnswer || "", // Default to empty string if no answer
//         correct: isCorrect,
//       };
//     });
  
//     const submissionData = {
//       user_id: id, // Assuming `id` from useParams is the user ID
//       quiz_type: quiz_type,
//       course: course,
//       score: result.filter((item) => item.correct).length, // Count correct answers
//       total_questions: filteredQuestions.length,
//       correct_questions: result.filter((item) => item.correct).length,
//       result: result,
//     };
  
//     try {
//       const response = await axios.post(
//         `${process.env.REACT_APP_API_URL}quiz/quiz-attempts`,
//         submissionData
//       );
//       if (response.data.message === "Quiz attempt created successfully") {
//         alert("Quiz submitted successfully!");
//         // Navigate to the score page and pass the relevant data
//         nav(`/score/${id}/${course}/${quiz_type}`, {
//           state: {
//             score: submissionData.score,
//             total: filteredQuestions.length,
//           },
//         });
//       } else if(response.data.message === "All fields are required"){
//         alert("Something went wrong! Please try again.");
//       }
//       else if(response.data.message === "Database error"){
//         alert("Database error")
//       }
//     } catch (error) {
//       console.error("Submission error:", error);
//       alert("Failed to submit the quiz. Please check your connection.");
//     }
//   };  

//   const handleQuestionClick = (index) => {
//     setCurrentIndex(index);
//   };

//   const now = (answeredQuestions.size / filteredQuestions.length) * 100;

//   return (
//     <div className="container">
//       <h3 className="text-center py-3">Questions</h3>
//       {filteredQuestions.length > 0 && (
//         <div className="row">
//           <div className="col-lg-8">
//             <div className="quizpart rounded-2 p-4">
//               <h4>{currentIndex + 1}:</h4>
//               <div
//                 style={{ fontFamily: "Times New Roman, Times, serif" }}
//                 dangerouslySetInnerHTML={{
//                   __html: DOMPurify.sanitize(
//                     filteredQuestions[currentIndex]?.text || ""
//                   ),
//                 }}
//               />
//               {filteredQuestions[currentIndex]?.question_type ===
//                 "multiple_choice" && (
//                 <div className="options">
//                   {filteredQuestions[currentIndex]?.option
//                     ?.filter((optionObj) => optionObj.option.trim() !== "")
//                     .map((optionObj, index) => (
//                       <div key={index} className="option d-flex py-2 opttext">
//                         <input
//                           type="radio"
//                           id={`option-${filteredQuestions[currentIndex]?.id}-${index}`}
//                           name={`question-${filteredQuestions[currentIndex]?.id}`}
//                           value={optionObj.option}
//                           checked={
//                             selectedOptions[
//                               filteredQuestions[currentIndex]?.id
//                             ] === optionObj.option
//                           }
//                           onChange={(e) =>
//                             handleOptionChange(
//                               filteredQuestions[currentIndex]?.id,
//                               e
//                             )
//                           }
//                         />
//                         <label
//                           className="mx-2"
//                           htmlFor={`option-${filteredQuestions[currentIndex]?.id}-${index}`}
//                         >
//                           {optionObj.option}
//                         </label>
//                       </div>
//                     ))}
//                 </div>
//               )}

//               <div className="d-flex justify-content-between my-3">
//                 <button
//                   className="btn btn-primary"
//                   onClick={handlePrevious}
//                   disabled={currentIndex === 0}
//                 >
//                   Previous
//                 </button>
//                 <button
//                   className="btn btn-success"
//                   onClick={
//                     currentIndex === filteredQuestions.length - 1
//                       ? handleSubmit
//                       : handleNext
//                   }
//                 >
//                   {currentIndex === filteredQuestions.length - 1
//                     ? "Submit"
//                     : "Next"}
//                 </button>
//               </div>
//             </div>
//           </div>
//           <div className="col-lg-4">
//             <div className="circular-question-numbers d-flex flex-wrap border border-2 p-3 rounded-3">
//               {filteredQuestions.map((_, index) => (
//                 <div
//                   key={index}
//                   className={`circle m-1 ${
//                     currentIndex === index ? "active" : ""
//                   } ${answeredQuestions.has(index) ? "answered" : ""}`}
//                   onClick={() => handleQuestionClick(index)}
//                 >
//                   {index + 1}
//                 </div>
//               ))}
//             </div>
//             <div className="progress-container card py-3 px-3">
//               <h5>Overall Progress</h5>
//               <ProgressBar now={now} />
//               <p className="mt-2">{now.toFixed(0)}% Completed</p>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default QuizPage;




import React, { useEffect, useState } from "react";
import DOMPurify from "dompurify";
import ProgressBar from "react-bootstrap/ProgressBar";
import axios from "axios";
import "./Quizpage.css";
import { useNavigate, useParams } from "react-router-dom";

function QuizPage() {
  const [difficultyLevel, setDifficultyLevel] = useState(1);
  const [questions, setQuestions] = useState([]);
  const [filteredQuestions, setFilteredQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [answeredQuestions, setAnsweredQuestions] = useState(new Set());
  const [score, setScore] = useState(0);
  const [level1Correct, setLevel1Correct] = useState(0);
  const [level2Correct, setLevel2Correct] = useState(0);
  const nav = useNavigate("");

  const { id, quiz_type, course } = useParams();

  useEffect(() => {
    axios
      .get("/quizData.json")
      .then((res) => {
        // setQuestions(res.data.questions);
        setDifficultyLevel(res.data.difficulty_level);
      })
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}quiz/sample-past-papers/${course}/${quiz_type}`)
      .then((res) => {
        setQuestions(res.data.data);
      }).catch(err=>{
        console.log(err);
      })
  }, [course,quiz_type]);

  useEffect(() => {
    const filtered = questions.filter(
      (q) =>
        difficultyLevel === 1 ||
        (difficultyLevel === 2 && q.difficulty_level <= 2) ||
        (difficultyLevel === 3 && q.difficulty_level <= 3)
    );
    setFilteredQuestions(filtered);
  }, [questions, difficultyLevel]);

  const handleOptionChange = (questionId, event) => {
    const value = event.target.value;
    setSelectedOptions((prev) => ({
      ...prev,
      [questionId]: value,
    }));
    setAnsweredQuestions((prev) => new Set([...prev, currentIndex]));











    
  };

  const validateAnswer = (questionId) => {
    const question = filteredQuestions.find((q) => q.id === questionId);
    if (question && selectedOptions[questionId] === question.correct_answer) {
      setScore((prev) => prev + 1);
      if (question.difficulty_level === 1) setLevel1Correct((prev) => prev + 1);
      if (question.difficulty_level === 2) setLevel2Correct((prev) => prev + 1);
    }
  };

  const updateDifficultyLevel = () => {
    if (difficultyLevel === 1 && level1Correct >= 4) {
      setDifficultyLevel(2);
    } else if (difficultyLevel === 2 && level2Correct >= 3) {
      setDifficultyLevel(3);
    }
  };

  const handleNext = () => {
    validateAnswer(filteredQuestions[currentIndex].id);
    if (currentIndex < filteredQuestions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      updateDifficultyLevel();
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const handleSubmit = async () => {
    // Prepare the result field in the required format
    const result = filteredQuestions.map((question) => {
      const userAnswer = selectedOptions[question.id];
      const isCorrect = userAnswer === question.correct_answer;
      return {
        question_id: question.id,
        user_answer: userAnswer || "", // Default to empty string if no answer
        correct: isCorrect,
      };
    });
  
    const submissionData = {
      user_id: id, // Assuming `id` from useParams is the user ID
      quiz_type: quiz_type,
      course: course,
      score: result.filter((item) => item.correct).length, // Count correct answers
      total_questions: filteredQuestions.length,
      correct_questions: result.filter((item) => item.correct).length,
      result: result,
    };
  
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}quiz/quiz-attempts`,
        submissionData
      );
      if (response.data.message === "Quiz attempt created successfully") {
        alert("Quiz submitted successfully!");
        // Navigate to the score page and pass the relevant data
        nav(`/score/${id}/${course}/${quiz_type}`, {
          state: {
            score: submissionData.score,
            total: filteredQuestions.length,
          },
        });
      } else if(response.data.message === "All fields are required"){
        alert("Something went wrong! Please try again.");
      }
      else if(response.data.message === "Database error"){
        alert("Database error")
      }
    } catch (error) {
      console.error("Submission error:", error);
      alert("Failed to submit the quiz. Please check your connection.");
    }
  };  

  const handleQuestionClick = (index) => {
    setCurrentIndex(index);
  };
  const now = (answeredQuestions.size / filteredQuestions.length) * 100;

  return (
    <div className="container">
      <h3 className="text-center py-3">Quiz Page</h3>
      {filteredQuestions.length > 0 && (
        <div className="row">
          <div className="col-lg-8">
            <div className="quizpart rounded-2 p-4">
              <h4>Quiz {currentIndex + 1}:</h4>
              <div
                style={{ fontFamily: "Times New Roman, Times, serif" }}
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(
                    filteredQuestions[currentIndex]?.text || ""
                  ),
                }}
              />
              {filteredQuestions[currentIndex]?.question_type ===
                "multiple_choice" && (
                <div className="options">
                  {filteredQuestions[currentIndex]?.option
                    ?.filter((optionObj) => optionObj.option.trim() !== "")
                    .map((optionObj, index) => (
                      <div key={index} className="option d-flex py-2 opttext">
                        <input
                          type="radio"
                          id={`option-${filteredQuestions[currentIndex]?.id}-${index}`}
                          name={`question-${filteredQuestions[currentIndex]?.id}`}
                          value={optionObj.option}
                          checked={
                            selectedOptions[
                              filteredQuestions[currentIndex]?.id
                            ] === optionObj.option
                          }
                          onChange={(e) =>
                            handleOptionChange(
                              filteredQuestions[currentIndex]?.id,
                              e
                            )
                          }
                        />
                        <label
                          className="mx-2"
                          htmlFor={`option-${filteredQuestions[currentIndex]?.id}-${index}`}
                        >
                          {optionObj.option}
                        </label>
                      </div>
                    ))}
                </div>
              )}

              <div className="d-flex justify-content-between my-3">
                <button
                  className="btn btn-primary"
                  onClick={handlePrevious}
                  disabled={currentIndex === 0}
                >
                  Previous
                </button>
                <button
                  className="btn btn-success"
                  onClick={
                    currentIndex === filteredQuestions.length - 1
                      ? handleSubmit
                      : handleNext
                  } >
                  {currentIndex === filteredQuestions.length - 1
                    ? "Submit"
                    : "Next"}
                </button>
              </div>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="circular-question-numbers d-flex flex-wrap border border-2 p-3 rounded-3">
              {filteredQuestions.map((_, index) => (
                <div
                  key={index}
                  className={`circle m-1 ${
                    currentIndex === index ? "active" : ""
                  } ${answeredQuestions.has(index) ? "answered" : ""}`}
                  onClick={() => handleQuestionClick(index)}
                >
                  {index + 1}
                </div>
              ))}
            </div>
            <div className="progress-container card py-3 px-3">
              <h5>Overall Progress</h5>
              <ProgressBar now={now} />
              <p className="mt-2">{now.toFixed(0)}% Completed</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default QuizPage;