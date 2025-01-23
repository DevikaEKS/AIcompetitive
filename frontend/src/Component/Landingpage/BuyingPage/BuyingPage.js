import React, { useEffect, useState } from "react";
import "./BuyingPage.css";
import axios from "axios";
import coins from "../Asset/coins.png"; // Ensure the correct path for the coin image
import { useNavigate, useParams } from "react-router-dom";

function BuyingPage() {
  const [content, setContent] = useState([]); // State to store the API data
  const [selectedQuizzes, setSelectedQuizzes] = useState([]); // Track selected quizzes
  const [totalPrice, setTotalPrice] = useState(0); // Track the total price
  const [isEnrolled, setIsEnrolled] = useState(false); // State to track if the user has clicked Enroll
  const navigate = useNavigate();

  const { id, course } = useParams();

  useEffect(() => {
    // Fetch the quiz types from the API
    axios
      .get(`${process.env.REACT_APP_API_URL}course/sidebar`)
      .then((res) => {
        setContent(res.data.data); // Update state with API data
      })
      .catch((error) => {
        console.error("Error fetching data:", error); // Handle errors
      });
  }, []);

  // Function to handle Sample Test button click
  const handleSampleTestClick = (quizTypeId) => {
    // navigate(`/quizattempt/${id}/${course}/${quizTypeId}`);
    navigate(`/terms/${id}`) 
  };
  

  // const handleSampleTestClick = (quizTypeId) => {
  //   // navigate(`/timer/${id}/${course}/${quizTypeId}`); 
  //   navigate(`/terms/${id}`); 
  // };
  



  // Handler for checkbox change
  const handleCheckboxChange = (quizId, isChecked, type) => {
    const pricePerQuiz = 500; // Price for each selected quiz

    if (type === "year") {
      // Handle year checkboxes (5 Years, 10 Years)
      if (!isChecked) {
        setSelectedQuizzes((prevState) =>
          prevState.filter((id) => id !== quizId)
        );
        setTotalPrice(0); // Reset price to 0 when any checkbox is unchecked
      } else {
        setSelectedQuizzes((prevState) => [...prevState, quizId]);
        setTotalPrice((prevState) => prevState + pricePerQuiz);
      }
    } else if (type === "test") {
      // Handle test checkboxes (Test 1, Test 2)
      if (!isChecked) {
        setSelectedQuizzes((prevState) =>
          prevState.filter((id) => id !== quizId)
        );
        setTotalPrice((prevState) => prevState - pricePerQuiz);
      } else {
        setSelectedQuizzes((prevState) => [...prevState, quizId]);
        setTotalPrice((prevState) => prevState + pricePerQuiz);
      }
    }
  };

  // Handler for Enroll button click
  const handleEnrollClick = () => {
    if (selectedQuizzes.length > 0) {
      setIsEnrolled(true); // Set the Enrolled state to true when button is clicked
    } else {
      alert("Please select at least one quiz to enroll.");
    }
  };

  // Navigate to purchased page
  const handlePurchase = () => {
    // navigate("/purchased");
    navigate(`/login`); 
  };

  return (
    <div className="container py-4 majortest">
      <div className="d-flex flex-column justify-content-center align-items-center bg-light rounded">
        <table className="w-100 buying-table">
          <tbody>
            {content.map((item, index) => (
              <tr key={item.quiz_type_id} className="bg-white p-3 rounded">
                {/* Dynamically render quiz type names */}
                <td className="fw-bold">{item.quiz_type_name}</td>
                <td>
                  <button
                    className="testbutton paybutton"
                    onClick={() => handleSampleTestClick(item.quiz_type_id)}>
                    Sample Test
                  </button>
                </td>

                {/* First row: 5 Years and 10 Years checkboxes */}
                {index === 0 && (
                  <>
                    <td>
                      <input
                        type="checkbox"
                        id={`fiveYears-${item.quiz_type_id}`}
                        onChange={(e) =>
                          handleCheckboxChange(
                            item.quiz_type_id,
                            e.target.checked,
                            "year"
                          )
                        }
                      />
                      <label
                        htmlFor={`fiveYears-${item.quiz_type_id}`}
                        className="ms-2"
                      >
                        5 Years
                      </label>
                    </td>
                    <td>
                      <input
                        type="checkbox"
                        id={`tenYears-${item.quiz_type_id}`}
                        onChange={(e) =>
                          handleCheckboxChange(
                            item.quiz_type_id,
                            e.target.checked,
                            "year"
                          )
                        }
                      />
                      <label
                        htmlFor={`tenYears-${item.quiz_type_id}`}
                        className="ms-2"
                      >
                        10 Years
                      </label>
                    </td>
                  </>
                )}

                {/* Second row: Test-related checkboxes */}
                {index === 1 && (
                  <>
                    <td>
                      <input
                        type="checkbox"
                        id={`test1-${item.quiz_type_id}`}
                        onChange={(e) =>
                          handleCheckboxChange(
                            item.quiz_type_id,
                            e.target.checked,
                            "test"
                          )
                        }
                      />
                      <label
                        htmlFor={`test1-${item.quiz_type_id}`}
                        className="ms-2"
                      >
                        10 Test
                      </label>
                    </td>
                    <td>
                      <input
                        type="checkbox"
                        id={`test2-${item.quiz_type_id}`}
                        onChange={(e) =>
                          handleCheckboxChange(
                            item.quiz_type_id,
                            e.target.checked,
                            "test"
                          )
                        }
                      />
                      <label
                        htmlFor={`test2-${item.quiz_type_id}`}
                        className="ms-2"
                      >
                        50 Test
                      </label>
                    </td>
                  </>
                )}

                {/* Third row (Empty or non-functional) */}
                {index === 2 && <td colSpan="2"></td>}

                <td>
                  <button
                    className="enroll-btn d-flex align-items-center"
                    onClick={handleEnrollClick}
                  >
                    <img src={coins} alt="Coins" className="me-2" />
                    Enroll
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Purchase Section */}
        <div className="purchase-section mt-4">
          {isEnrolled && totalPrice > 0 && (
            <div className="d-flex justify-content-end">
              <img src={coins} alt="Coins" className="me-2" />
              <span className="fs-5 fw-bold">Rs. {totalPrice}</span>
            </div>
          )}
          <button
            className="purchase-btn paybutton mt-3"
            onClick={handlePurchase}
          >
            PURCHASE
          </button>
        </div>
      </div>
    </div>
  );
}

export default BuyingPage;
