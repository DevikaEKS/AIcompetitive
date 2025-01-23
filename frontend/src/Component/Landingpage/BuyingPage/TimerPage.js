import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function TimerPage() {
  const [timer, setTimer] = useState(3); // Countdown duration in seconds
  const navigate = useNavigate();
  const { id, course, quizTypeId } = useParams();

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev === 1) {
          clearInterval(interval);
          navigate(`/quizattempt/${id}/${course}/${quizTypeId}`);
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [navigate, id, course, quizTypeId]);

  return (
    <div className="d-flex flex-column justify-content-center align-items-center vh-100">
      <h1>Get Ready!</h1>
      <p>Your quiz will start in {timer} seconds...</p>
    </div>
  );
}

export default TimerPage;
