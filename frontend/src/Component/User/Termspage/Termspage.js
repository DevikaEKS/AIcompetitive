import React, { useState } from 'react';
import "./Termspage.css";
import { useNavigate, useParams } from 'react-router-dom';

function Termspage() {
  const [isChecked, setIsChecked] = useState(false);
  const navigate = useNavigate();
  const { id, course } = useParams();
  const handleCheckboxChange = (e) => {
    setIsChecked(e.target.checked);
  };

  const handleConfirmTest = () => {
    if (isChecked) {
    
  navigate(`/starttest/${id}`)
    // navigate(`/quizattempt/${id}/${course}/${quizTypeId}`); 
 
    } else {
      alert('Please agree to the terms and conditions to start the test.');
    }
  };

  return (
    <div className="container testoverviewpage p-1 p-md-5 mx-0 mx-md-5">
      <h3 className="text-center py-3">Welcome to the SBI Clerk Prelims Exam Sample Test!</h3>
      <p className="py-1 px-1 px-md-3 mx-0 mx-md-4">
        Prepare yourself for success in the SBI Clerk Exam with our specially designed sample test.
        This test follows the exact pattern of the preliminary examination to help you get familiar
        with the format and improve your speed and accuracy.
      </p>

      <div className="termspart rounded-3 p-1 p-md-5 m-0 m-md-5">
        <h3 className="text-center py-2 text-light">Test Instructions</h3>
        <ul>
          <li>
            Each question is compulsory. Choose the best possible answer from the options provided.
            The test would contain multiple-choice questions with 4 options. Questions can have
            single option or multi option solutions.
          </li>
          <li>Complete the test within the allotted time for an authentic exam experience.</li>
          <li>
            Each correct answer awards 2 Marks.
            <br />
            Negative marking: 0.25 marks will be deducted for every incorrect answer.
            <br />
            No marks will be deducted for unanswered questions.
          </li>
          <li>
            Ensure you answer all questions before submitting. Results will be sent via mail to you
            after submission.
          </li>
        </ul>
        <div className="text-center my-3">
          <input
            type="checkbox"
            style={{ width: "20px", height: "20px", cursor: "pointer" }}
            onChange={handleCheckboxChange}
          />{" "}
          <span>I Agree the following Statements & Start Test</span>
        </div>
        <div className="d-flex justify-content-center my-4">
          <button
            className="Taketestbtn rounded-5 py-2 px-4 text-decoration-none"
            onClick={handleConfirmTest}
          >
            Confirm Test
          </button>
        </div>
      </div>
    </div>
  );
}

export default Termspage;
