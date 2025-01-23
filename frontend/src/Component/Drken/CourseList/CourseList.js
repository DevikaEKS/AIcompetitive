import axios from "axios";
import React, { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { useNavigate, useParams } from "react-router-dom";
import "./CourseList.css";

const stripePromise = loadStripe(
  "pk_test_51OT2FaSHtllxmCJSGKaAzZmIfYDedAkOkUhZqLs8GAvPlEQsasgY7zKxH0iDm4E1Nu11OEyVv7kCPp3MhvK7P85i00ecnTPLf9"
);

function UserCourseList() {
  const [sessionId, setSessionId] = useState(null);
  const [course, setCourse] = useState([]); // All available courses
  const [enrolledCourses, setEnrolledCourses] = useState([]); // User's enrolled courses
  const [processingCourse, setProcessingCourse] = useState(null); // Track which course is processing
  const [price] = useState(499); // Default price

  const navigate = useNavigate();
  const { id } = useParams();

  // Fetch user's enrolled courses
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}user/user/data/${id}`)
      .then((res) => {
        console.log(res.data.user);
        setEnrolledCourses(res.data.user.enrolled_courses || []); // Save enrolled courses
      })
      .catch((err) => {
        console.log("Error fetching user data:", err);
      });
  }, [id]);

  // Fetch all available courses
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}course/getallcourse`)
      .then((res) => {
        setCourse(res.data); // Save all courses
      })
      .catch((err) => {
        console.log("Error fetching courses:", err);
      });
  }, []);

  const handleEnroll = async (courseid) => {
    setProcessingCourse(courseid); // Set the current course as processing
    try {
      // Fetch course name based on courseid
      const courseRes = await axios.get(
        `${process.env.REACT_APP_API_URL}course/getcourse/${courseid}`
      );

      const coursename = courseRes.data.result[0].coursename;

      // Trigger checkout process
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}payment/create-payment-intent/${id}`,
        {
          items: [
            { name: coursename, price: price, quantity: 1, courseid: courseid },
          ],
        }
      );

      const { id: sessionId } = response.data;
      setSessionId(sessionId);

      const stripe = await stripePromise;
      const { error } = await stripe.redirectToCheckout({
        sessionId,
      });

      if (error) {
        console.error("Stripe Checkout Error:", error);
      } else {
        navigate(`/user/${id}`);
      }
    } catch (error) {
      console.error("Error during enrollment:", error);
    } finally {
      setProcessingCourse(null); // Reset processing state
    }
  };

  const handleStartCourse = (courseid) => {
    navigate(`/userpart/${id}/dash/${courseid}`); // Redirect to the course page
  };

  return (
    <div className="courselist-container">
      <h3 className="heading-center">Course Overview</h3>
      <div className="course-cards-container">
        {course.map((e, index) => {
          const isEnrolled = enrolledCourses.includes(e.courseid); // Check if the user is enrolled
          return (
            <div className="course-card" key={index}>
              <div
                className="inner-card course-image-card"
                style={{ cursor: "pointer" }}
              >
                <img
                  src={e.course_image.replace(/\\/g, "/")}
                  alt={e.coursename}
                  className="course-image"
                />
                <h5 className="course-title text-start">{e.coursename}</h5>
              </div>
              {/* Button logic */}
              <div className="enroll-button-container">
                {isEnrolled ? (
                  <button
                    className="enroll-button enrolled-button"
                    onClick={() => handleStartCourse(e.courseid)}
                  >
                    Start Course
                  </button>
                ) : (
                  <button
                    className="enroll-button"
                    onClick={() => handleEnroll(e.courseid)}
                    disabled={processingCourse === e.courseid}
                  >
                    {processingCourse === e.courseid
                      ? "Processing..."
                      : "Enroll"}
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default UserCourseList;
