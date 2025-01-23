// // import React from "react";
// // import { useLocation } from "react-router-dom";

// // function Score() {
// //   const { state } = useLocation();
// //   const { score, total, reviewData } = state; // Get data passed from QuizPage

// //   return (
// //     <div className="container">
// //       <h3 className="text-center py-3">Quiz Score</h3>
// //       <button className="btn btn-danger">View Score</button>
// //       <button>Review</button>
// //       <h5>
// //         You scored {score} out of {total}
// //       </h5>

// //       <div className="review-questions quizpart p-4" >
// //         {reviewData.map((question, index) => (
// //           <div key={index} className="question-review my-3">
// //             <h6>Question {index + 1}:</h6>
// //             <div
// //               style={{ fontFamily: "Times New Roman, Times, serif" }}
// //               dangerouslySetInnerHTML={{
// //                 __html: question.questionText,
// //               }}
// //             />

// //             <div>
// //               <strong>Your Answer:</strong> {question.userAnswer || "Not answered"}
// //             </div>
// //             <div>
// //               <strong>Correct Answer:</strong> {question.correctAnswer}
// //             </div>

// //           </div>
// //         ))}
// //       </div>
// //     </div>
// //   );
// // }

// // export default Score;

// // import React, { useState } from "react";
// // import { useLocation } from "react-router-dom";
// // function Score() {
// //   const { state } = useLocation();
// //   const { score, total, reviewData } = state;
// //   const [showScore, setShowScore] = useState(false);
// //   const [showReview, setShowReview] = useState(false);
// //   const handleViewScore = () => {
// //     setShowScore(true);
// //   };

// //   const handleReviewToggle = () => {
// //     setShowReview(!showReview);
// //   };

// //   return (
// //     <div className="container">
// //       <h3 className="text-center py-3">Quiz Score</h3>
// //      <div className="d-flex flex-column justify-content-center align-items-center">
// //       <button className="btn btn-success" onClick={handleViewScore}>
// //         View Score
// //       </button>
// //       </div>

// //       {showScore && (
// //         <h5 className="text-center py-3">
// //           You scored {score} out of {total}
// //         </h5>
// //       )}

// //       {showScore && (
// //         <button className="btn btn-primary mt-3" onClick={handleReviewToggle}>
// //           {showReview ? "Hide Review" : "Review Answers"}
// //         </button>
// //       )}

// //       {showReview && (
// //         <div className="review-questions quizpart p-4">
// //           {reviewData.map((question, index) => (
// //             <div key={index} className="question-review my-3">
// //               <h6>Question {index + 1}:</h6>
// //               <div
// //                 dangerouslySetInnerHTML={{
// //                   __html: question.questionText,
// //                 }}
// //               />

// //               <div>
// //                 <strong>Your Answer:</strong> {question.userAnswer || "Not answered"}
// //               </div>
// //               <div>
// //                 <strong>Correct Answer:</strong> {question.correctAnswer}
// //               </div>
// //             </div>
// //           ))}
// //         </div>
// //       )}
// //     </div>
// //   );
// // }
// // export default Score;
// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import { useLocation, useParams } from "react-router-dom";

// function Score() {
//   const { state } = useLocation();
//   const { score, total, reviewData } = state;
//   const [showScore, setShowScore] = useState(false);
//   const [showReview, setShowReview] = useState(false);
//   const [attemptData, setAttemptData] = useState([]); // Set default to an empty array to handle multiple attempts

//   const { id, course, quiz_type } = useParams();

//   const handleViewScore = () => {
//     setShowScore(true);
//   };

//   const handleReviewToggle = () => {
//     setShowReview(!showReview);
//   };

//   // Fetch the quiz attempt data on component mount
//   useEffect(() => {
//     axios
//       .get(
//         `${process.env.REACT_APP_API_URL}quiz/quiz-attempts/user/${id}/${course}/${quiz_type}`
//       )
//       .then((res) => {
//         setAttemptData(res.data.data); // Set all attempts data
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   }, [id, course, quiz_type]);

//   return (
//     <div className="d-flex flex-column justify-content-center align-items-center">
//       {/* Display the score card after clicking the "View Score" button */}
//       {!showScore ? (
//         <div className="container quizpart p-4 d-flex flex-column justify-content-center align-items-center m-2">
//           <h4 className="text-center">Your answers were submitted.</h4>
//           <button className="p-2 scbtn btn btn-success" onClick={handleViewScore}>
//             View Score
//           </button>
//         </div>
//       ) : (
//         <>
//           {/* Once the score is shown, display the summary of attempts */}
//           <h4
//             className="summarytext my-3"
//             style={{
//               fontFamily: "Montserrat, sans-serif",
//               fontSize: "20px",
//               margin: "10px 0px",
//               color: "#001040",
//             }}
//           >
//             Summary of Your Previous Attempts
//           </h4>

//           <div className="table-responsive">
//             <table className="table mt-4 border-0 tabletextpart">
//               <thead>
//                 <tr className="tabletextpart">
//                   <th>Attempt</th>
//                   <th>State</th>
//                   <th>Marks</th>
//                   <th>Grade</th>
//                   <th>Review</th>
//                 </tr>
//               </thead>
//               <tbody style={{ border: "0px" }}>
//                 {attemptData.map((attempt) => (
//                   <tr key={attempt.id} style={{ border: "0px" }}>
//                     <td>{attempt.id}</td>
//                     <td>
//                       Finished
//                       <br />
//                       Submitted
//                       <br />
//                       {new Date(attempt.timestamp).toLocaleString("en-US", {
//                         weekday: "long",
//                         year: "numeric",
//                         month: "2-digit",
//                         day: "2-digit",
//                         hour: "2-digit",
//                         minute: "2-digit",
//                       })}
//                     </td>
//                     <td>{`${attempt.score} / ${attempt.totalquestion}`}</td>
//                     <td>{`${attempt.correctquestion} / ${attempt.totalquestion}`}</td>
//                     <td>
//                       <button className="btn" onClick={handleReviewToggle}>
//                         {showReview ? "Hide Review" : "Review Answers"}
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>

//           {/* Show the review section only if showReview is true */}
//           {showReview && (
//             <div className="review-questions quizpart p-4">
//               <h4 className="text-center">Review Your Answers</h4>
//               {attemptData.map((attempt) => (
//                 <div key={attempt.id}>
//                   {attempt.result.map((question, index) => (
//                     <div
//                       key={question.question_id}
//                       className="question-review my-3"
//                     >
//                       <h6>Question {index + 1}:</h6>
//                       <div
//                         dangerouslySetInnerHTML={{
//                           __html: question.questionText, // Assuming questionText is part of response
//                         }}
//                       />
//                       <div>
//                         <strong>Your Answer:</strong>{" "}
//                         {question.user_answer || "Not answered"}
//                       </div>
//                       <div>
//                         <strong>Correct Answer:</strong>{" "}
//                         {question.correct_answer || "Not available"}
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               ))}
//             </div>
//           )}
//         </>
//       )}
//     </div>
//   );
// }

// export default Score;

import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useParams, Link } from "react-router-dom";
function Score() {
  const { state } = useLocation();
  const { score, total, reviewData } = state;
  const [showScore, setShowScore] = useState(false);
  const [showReview, setShowReview] = useState(false);
  const [attemptData, setAttemptData] = useState([]);
  const [selectedAttempt, setSelectedAttempt] = useState(null); // New state to store the selected attempt
  const { id, course, quiz_type } = useParams();
  const handleViewScore = () => {
    setShowScore(true);
  };

  const handleReviewToggle = (attemptId) => {
    if (selectedAttempt === attemptId) {
      setSelectedAttempt(null); 
    } else {
      setSelectedAttempt(attemptId); 
    }
  };

  // Fetch the quiz attempt data on component mount
  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_API_URL}quiz/quiz-attempts/user/${id}/${course}/${quiz_type}`
      )
      .then((res) => {
        setAttemptData(res.data.data); // Set all attempts data
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id, course, quiz_type]);

  return (
    <div className="d-flex flex-column justify-content-center align-items-center">
      {!showScore ? (
        <div className="container quizpart p-4 d-flex flex-column justify-content-center align-items-center m-2">
          <h4 className="text-center">Your answers were submitted.</h4>
          <button
            className="p-2 scbtn btn btn-success"
            onClick={handleViewScore}
          >
            View Score
          </button>
        </div>
      ) : (
        <>
          <h4
            className="summarytext my-3"
            style={{
              fontFamily: "Montserrat, sans-serif",
              fontSize: "20px",
              margin: "10px 0px",
              color: "#001040",
            }}
          >
            Summary of Your Previous Attempts
          </h4>

          <div className="table-responsive">
            <table className="table mt-4 border-0 tabletextpart">
              <thead>
                <tr className="tabletextpart">
                  <th>Attempt</th>
                  <th>State</th>
                  <th>Marks</th>
                  <th>Grade</th>
                  <th>Review</th>
                </tr>
              </thead>
              <tbody style={{ border: "0px" }}>
                {attemptData.map((attempt) => (
                  <tr key={attempt.id} style={{ border: "0px" }}>
                    <td>{attempt.id}</td>
                    <td>
                      Finished
                      <br />
                      Submitted
                      <br />
                      {new Date(attempt.timestamp).toLocaleString("en-US", {
                        weekday: "long",
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </td>
                    <td>{`${attempt.score} / ${attempt.totalquestion}`}</td>
                    <td>{`${attempt.correctquestion} / ${attempt.totalquestion}`}</td>
                    <td>
                      <button
                        className="btn"
                        onClick={() => handleReviewToggle(attempt.id)} // Pass the attempt id to toggle review
                      >
                        {selectedAttempt === attempt.id
                          ? "Hide Review"
                          : "Review Answers"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Show the review section only if the selected attempt matches the clicked one */}
          {selectedAttempt && (
            <div className=" container review-questions quizpart p-4">
              <h4 className="text-center">Review Your Answers</h4>
              {attemptData
                .filter((attempt) => attempt.id === selectedAttempt) // Filter for selected attempt
                .map((attempt) => (
                  <div key={attempt.id}>
                    {attempt.result.map((question, index) => (
                      <div
                        key={question.question_id}
                        className="question-review my-3"
                      >
                        <h6>Question {index + 1}:</h6>
                        <div
                          dangerouslySetInnerHTML={{
                            __html: question.questionText, // Assuming questionText is part of response
                          }}
                        />
                        <div>
                          <strong>Your Answer:</strong>{" "}
                          {question.user_answer || "Not answered"}
                        </div>
                        <div>
                          <strong>Correct Answer:</strong>{" "}
                          {question.correct_answer || "Not available"}
                        </div>
                      </div>
                    ))}
                  </div>
                ))}

              <button>
                <Link to={`/exams/payment/${id}/${course}`} className="updatebtn text-decoration-none">Next Test</Link>
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Score;
