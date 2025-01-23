import axios from "axios";
import React, { useEffect, useState } from "react";
import JoditEditor from "jodit-react"; // Assuming JoditEditor is already installed

function QuestionUpdate() {
  const [modules, setModules] = useState([]);
  const [selectedModuleId, setSelectedModuleId] = useState("");
  const [questions, setQuestions] = useState([]);
  const [updatedQuestions, setUpdatedQuestions] = useState({});
  const [showFeedbackEditor, setShowFeedbackEditor] = useState({}); // Track which feedback editors are visible

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}course/getmodule`)
      .then((res) => {
        setModules(res.data.result);
      })
      .catch((err) => {
        console.error("Error fetching modules:", err);
      });
  }, []);

  const sampleData = [
    {
      id: 1,
      text: "What is the place value of 7 in 5743?",
      options: [
        { option: "700", feedback: "" },
        { option: "7", feedback: "" },
        { option: "70", feedback: "" },
        { option: "7000", feedback: "" },
      ],
      correct_answer: "7000",
    },
    {
      id: 2,
      text: "Which of the following is a prime number?",
      options: [
        { option: "15", feedback: "" },
        { option: "9", feedback: "" },
        { option: "13", feedback: "" },
        { option: "21", feedback: "" },
      ],
      correct_answer: "13",
    },
    {
      id: 3,
      text: "What is the LCM of 4 and 6?",
      options: [
        { option: "12", feedback: "" },
        { option: "18", feedback: "" },
        { option: "24", feedback: "" },
        { option: "6", feedback: "" },
      ],
      correct_answer: "12",
    },
    {
      id: 4,
      text: "What is the HCF of 18 and 24?",
      options: [
        { option: "2", feedback: "" },
        { option: "4", feedback: "" },
        { option: "6", feedback: "" },
        { option: "8", feedback: "" },
      ],
      correct_answer: "6",
    },
    {
      id: 5,
      text: "How many whole numbers are there between 1 and 10?",
      options: [
        { option: "8", feedback: "" },
        { option: "9", feedback: "" },
        { option: "10", feedback: "" },
        { option: "11", feedback: "" },
      ],
      correct_answer: "9",
    },
    {
      id: 6,
      text: "What is the value of 2^3?",
      options: [
        { option: "6", feedback: "" },
        { option: "8", feedback: "" },
        { option: "9", feedback: "" },
        { option: "16", feedback: "" },
      ],
      correct_answer: "8",
    },
    {
      id: 7,
      text: "What is the remainder when 23 is divided by 5?",
      options: [
        { option: "1", feedback: "" },
        { option: "2", feedback: "" },
        { option: "3", feedback: "" },
        { option: "4", feedback: "" },
      ],
      correct_answer: "3",
    },
    {
      id: 8,
      text: "Which of the following is a perfect square?",
      options: [
        { option: "24", feedback: "" },
        { option: "36", feedback: "" },
        { option: "48", feedback: "" },
        { option: "54", feedback: "" },
      ],
      correct_answer: "36",
    },
    {
      id: 9,
      text: "If x = 7, then x^2 - 2x + 3 is:",
      options: [
        { option: "37", feedback: "" },
        { option: "43", feedback: "" },
        { option: "45", feedback: "" },
        { option: "49", feedback: "" },
      ],
      correct_answer: "37",
    },
    {
      id: 10,
      text: "Which of the following is an odd number?",
      options: [
        { option: "8", feedback: "" },
        { option: "12", feedback: "" },
        { option: "25", feedback: "" },
        { option: "30", feedback: "" },
      ],
      correct_answer: "25",
    },
  ];

  const handleModuleChange = (e) => {
    const moduleId = e.target.value;
    setSelectedModuleId(moduleId);

    axios
      .get(
        `${process.env.REACT_APP_API_URL}quiz/getmodulequestions/${moduleId}`
      )
      .then((res) => {
        console.log(res);

        setQuestions(res.data.result);
        const initialUpdatedQuestions = {};
        const initialShowFeedbackEditor = {};
        res.data.result.forEach((q) => {
          initialUpdatedQuestions[q.id] = {
            text: q.text,
            feedbacks: q.feedback,
            options: q.option.map((opt) => ({
              ...opt,
              feedback: opt.feedback, // Track feedback separately
              marks: opt.marks, // Add marks field
              keyword: opt.keyword, // Add keyword field
            })),
            correct_answer: q.correct_answer,
            check_data: q.check_data,
            question_type: q.question_type,
            subQuestions: q.subQuestions
              ? q.subQuestions.map((subQ) => ({
                  id: subQ.id,
                  subquestion_text: subQ.subquestion_text, // Add subquestion text
                  options: subQ.options.map((opt) => ({
                    id: opt.id,
                    option_text: opt.option_text,
                    is_correct: opt.is_correct,
                  })),
                }))
              : [], // If no subQuestions, default to an empty array
          };

          // Initially hide the feedback editor for each option
          q.option.forEach((opt, index) => {
            initialShowFeedbackEditor[`${q.id}_${index}`] = false;
          });
        });

        setUpdatedQuestions(initialUpdatedQuestions);
        setShowFeedbackEditor(initialShowFeedbackEditor);
      })
      .catch((err) => {
        console.error("Error fetching questions:", err);
      });
  };

  // console.log(updatedQuestions.feedback);

  const handleQuestionChange = (questionId, field, value) => {
    setUpdatedQuestions({
      ...updatedQuestions,
      [questionId]: {
        ...updatedQuestions[questionId],
        [field]: value,
      },
    });
  };

  const handleOptionChange = (
    questionId,
    subQIndex,
    field,
    value,
    optIndex = null
  ) => {
    const updatedQuestionsCopy = { ...updatedQuestions };

    if (updatedQuestionsCopy[questionId].question_type === "match") {
      if (field === "feedback") {
        // Update the general feedback for the "match" question type
        updatedQuestionsCopy[questionId] = {
          ...updatedQuestionsCopy[questionId],
          feedback: value,
        };
      } else {
        // Handle updating sub-questions and options for "match" question type
        const updatedSubQuestions = [
          ...updatedQuestionsCopy[questionId].subQuestions,
        ];

        if (field === "subquestion_text") {
          // Update the left side (subquestion_text)
          updatedSubQuestions[subQIndex] = {
            ...updatedSubQuestions[subQIndex],
            subquestion_text: value,
          };
        } else if (field === "option_text" && optIndex !== null) {
          // Update the right side (options -> option_text)
          const updatedOptions = [...updatedSubQuestions[subQIndex].options];
          updatedOptions[optIndex] = {
            ...updatedOptions[optIndex],
            option_text: value,
          };

          updatedSubQuestions[subQIndex] = {
            ...updatedSubQuestions[subQIndex],
            options: updatedOptions,
          };
        }

        updatedQuestionsCopy[questionId] = {
          ...updatedQuestionsCopy[questionId],
          subQuestions: updatedSubQuestions,
        };
      }
    } else {
      // Handle normal option update for non-match questions
      const updatedOptions = [...updatedQuestionsCopy[questionId].options];
      updatedOptions[subQIndex] = {
        ...updatedOptions[subQIndex],
        [field]: value,
      };

      updatedQuestionsCopy[questionId] = {
        ...updatedQuestionsCopy[questionId],
        options: updatedOptions,
      };
    }

    setUpdatedQuestions(updatedQuestionsCopy);
  };

  const toggleFeedbackEditor = (questionId, index) => {
    setShowFeedbackEditor((prevState) => ({
      ...prevState,
      [`${questionId}_${index}`]: !prevState[`${questionId}_${index}`],
    }));
  };

  const handleSubmit = () => {
    console.log(selectedModuleId, updatedQuestions);

    axios
      .post(`${process.env.REACT_APP_API_URL}quiz/updatequestion`, {
        moduleId: selectedModuleId,
        questions: updatedQuestions,
      })
      .then((res) => {
        console.log(res.data);
        if (
          res.data.error === "An error occurred while updating the question"
        ) {
          alert("An error occurred while updating the question");
        } else if (res.data.message === "Questions updated successfully") {
          alert("Questions updated successfully");
          window.location.reload();
        }
      })
      .catch((err) => {
        console.error("Error updating questions:", err);
        alert("Error updating questions:", err);
      });
  };

  return (
    <div className="container-fluid">
      <h2 className="text-center">Update Questions</h2>
      <div className=" container entirequizpart p-4 rounded-3">
        <form>
          <div className="form-group">
            <div className="form-group-inner">
              <label className="labelcourse">Select Module</label>
              <select value={selectedModuleId} onChange={handleModuleChange}>
                <option value="">Select Module</option>
                {modules.map((module) => (
                  <option key={module.moduleid} value={module.moduleid}>
                    {module.modulename}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </form>
        {/* Select Box for Modules */}

        {/* Display Questions */}
        <div className="py-5">
          <h5 className="labelcourse">Questions for Selected Module:</h5>
          {questions.length > 0 ? (
            <ul>
              {questions.map((question, index) => (
                <li key={question.id}>
                  {/* Rich text editor for question text */}
                  <JoditEditor
                    className="fc1"
                    value={updatedQuestions[question.id].text}
                    onBlur={(newText) =>
                      handleQuestionChange(question.id, "text", newText)
                    }
                  />

                  {/* Descriptive Question Type */}
                  {question.question_type === "descriptive" && (
                    <div>
                      <h4>Descriptive</h4>
                      {updatedQuestions[question.id].options.map(
                        (opt, index) => (
                          <div key={index} style={{ marginBottom: "15px" }}>
                            <label className="labelcourse">Option:</label>
                            <textarea
                              value={opt.keyword}
                              onChange={(e) =>
                                handleOptionChange(
                                  question.id,
                                  index,
                                  "keyword",
                                  e.target.value
                                )
                              }
                              rows={3}
                              cols={40}
                            />

                            {/* Add Feedback Button */}
                            <button
                              style={{
                                marginLeft: "10px",
                                backgroundColor: "#291571",
                                color: "white",
                                border: "none",
                                padding: "5px 10px",
                                cursor: "pointer",
                              }}
                              onClick={() =>
                                toggleFeedbackEditor(question.id, index)
                              }
                            >
                              {showFeedbackEditor[`${question.id}_${index}`]
                                ? "Hide Feedback"
                                : "Add Feedback"}
                            </button>

                            {/* Conditionally show rich text editor for feedback */}
                            {showFeedbackEditor[`${question.id}_${index}`] && (
                              <div style={{ marginTop: "10px" }}>
                                <label className="labelcourse">Feedback</label>
                                <JoditEditor
                                  className="jod fc1"
                                  value={opt.feedback}
                                  onBlur={(newFeedback) =>
                                    handleOptionChange(
                                      question.id,
                                      index,
                                      "feedback",
                                      newFeedback
                                    )
                                  }
                                />
                              </div>
                            )}
                          </div>
                        )
                      )}
                    </div>
                  )}

                  {/* Multiple Choice Question Type */}
                  {question.question_type === "multiple_choice" && (
                    <div>
                      <h4>Multiple Choice Options</h4>
                      {updatedQuestions[question.id].options.map(
                        (opt, index) => (
                          <div key={index} style={{ marginBottom: "15px" }}>
                            <label className="labelcourse"> Option:</label>
                            <textarea
                              className="opttext"
                              value={opt.option}
                              onChange={(e) =>
                                handleOptionChange(
                                  question.id,
                                  index,
                                  "option",
                                  e.target.value
                                )
                              }
                              rows={2}
                              cols={40}
                            />

                            {/* Add Feedback Button */}
                            <button
                              className="rounded-2"
                              style={{
                                marginLeft: "10px",
                                backgroundColor: "#291571",
                                color: "white",
                                border: "none",
                                padding: "5px 10px",
                                cursor: "pointer",
                              }}
                              onClick={() =>
                                toggleFeedbackEditor(question.id, index)
                              }
                            >
                              {showFeedbackEditor[`${question.id}_${index}`]
                                ? "Hide Feedback"
                                : "Add Feedback"}
                            </button>

                            {/* Conditionally show rich text editor for feedback */}
                            {showFeedbackEditor[`${question.id}_${index}`] && (
                              <div style={{ marginTop: "10px" }}>
                                <label>Feedback:</label>
                                <JoditEditor
                                  className="fc1"
                                  value={opt.feedback}
                                  onBlur={(newFeedback) =>
                                    handleOptionChange(
                                      question.id,
                                      index,
                                      "feedback",
                                      newFeedback
                                    )
                                  }
                                />
                              </div>
                            )}
                          </div>
                        )
                      )}
                    </div>
                  )}

                  {/* Check Question Type */}
                  {question.question_type === "check" && (
                    <div>
                      <h4>Check Options</h4>
                      {updatedQuestions[question.id].options.map(
                        (opt, index) => (
                          <div key={index} style={{ marginBottom: "15px" }}>
                            <label>Option:</label>
                            <textarea
                              className="opttext"
                              value={opt.option}
                              onChange={(e) =>
                                handleOptionChange(
                                  question.id,
                                  index,
                                  "option",
                                  e.target.value
                                )
                              }
                              rows={3}
                              cols={40}
                            />

                            {/* Add Feedback Button */}
                            <button
                              style={{
                                marginLeft: "10px",
                                backgroundColor: "#291571",
                                color: "white",
                                border: "none",
                                padding: "5px 10px",
                                cursor: "pointer",
                              }}
                              onClick={() =>
                                toggleFeedbackEditor(question.id, index)
                              }
                            >
                              {showFeedbackEditor[`${question.id}_${index}`]
                                ? "Hide Feedback"
                                : "Add Feedback"}
                            </button>

                            {/* Conditionally show rich text editor for feedback */}
                            {showFeedbackEditor[`${question.id}_${index}`] && (
                              <div style={{ marginTop: "10px" }}>
                                <label>Feedback:</label>
                                <JoditEditor
                                  value={opt.feedback}
                                  onBlur={(newFeedback) =>
                                    handleOptionChange(
                                      question.id,
                                      index,
                                      "feedback",
                                      newFeedback
                                    )
                                  }
                                />
                              </div>
                            )}
                          </div>
                        )
                      )}
                    </div>
                  )}

                  {/* Match the Following Question Type */}
                  {question.question_type === "match" && (
                    <div>
                      <h4>Match the Following</h4>

                      {/* Single, constant feedback box for the entire match question */}
                      <div style={{ marginBottom: "15px" }}>
                        <label>General Feedback:</label>
                        <JoditEditor
                          value={
                            updatedQuestions[question.id].feedbacks &&
                            updatedQuestions[question.id].feedbacks.length > 0
                              ? updatedQuestions[question.id].feedbacks[0]
                                  .feedback // Access the first feedback object
                              : ""
                          }
                          onBlur={(newFeedback) =>
                            handleOptionChange(
                              question.id,
                              null,
                              "feedback",
                              newFeedback
                            )
                          }
                        />
                      </div>

                      {/* Iterate over subQuestions */}
                      {updatedQuestions[question.id].subQuestions.map(
                        (subQ, subQIndex) => (
                          <div key={subQIndex} style={{ marginBottom: "15px" }}>
                            {/* Left side (subquestion text) */}
                            <label>Left side:</label>
                            <textarea
                              className="opttext"
                              value={subQ.subquestion_text}
                              onChange={(e) =>
                                handleOptionChange(
                                  question.id,
                                  subQIndex,
                                  "subquestion_text", // Indicate it's the subquestion_text field (left side)
                                  e.target.value
                                )
                              }
                              rows={3}
                              cols={20}
                            />

                            {/* Right side (option text) */}
                            {subQ.options.map((opt, optIndex) => (
                              <span
                                key={optIndex}
                                style={{ marginLeft: "10px" }}
                              >
                                <label>Right side:</label>
                                <textarea
                                  className="opttext"
                                  value={opt.option_text}
                                  onChange={(e) =>
                                    handleOptionChange(
                                      question.id,
                                      subQIndex, // Subquestion index
                                      "option_text", // Indicate it's the option_text field (right side)
                                      e.target.value,
                                      optIndex // Option index
                                    )
                                  }
                                  rows={3}
                                  cols={20}
                                />
                              </span>
                            ))}
                          </div>
                        )
                      )}
                    </div>
                  )}

                  {/* Correct Answer (Common for all types) */}
                  <div>
                    <label className="labelcourse">Correct Answer:</label>
                    <input
                      type="text"
                      value={
                        question.question_type === "multiple_choice"
                          ? updatedQuestions[question.id].correct_answer || ""
                          : question.question_type === "check"
                          ? updatedQuestions[question.id].check_data || "" // Accessing first element of check_data array
                          : updatedQuestions[question.id].correct_answer || ""
                      }
                      onChange={(e) => {
                        const fieldToUpdate =
                          question.question_type === "multiple_choice"
                            ? "correct_answer"
                            : question.question_type === "check"
                            ? "check_data"
                            : "correct_answer";

                        // If it's a check type, we handle the array structure for check_data
                        if (question.question_type === "check") {
                          handleQuestionChange(question.id, fieldToUpdate, [
                            e.target.value,
                          ]); // Wrap in array
                        } else {
                          handleQuestionChange(
                            question.id,
                            fieldToUpdate,
                            e.target.value
                          );
                        }
                      }}
                    />
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p>No questions available for this module.</p>
          )}
        </div>
        <div className="d-flex justify-content-end">
          <button onClick={handleSubmit} className="updatebtn">
            Update Questions
          </button>
        </div>
      </div>
    </div>
  );
}

export default QuestionUpdate;
