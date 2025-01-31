import React, { useEffect, useState } from "react";
import "./CourseBuying.css";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import coins from "../Asset/coins.png";

function CourseBuying() {
  const { sub } = useParams(); // Get the `sub` parameter from the URL
  const [courses, setCourses] = useState([]); // State to store the courses

  // Fetch courses based on the `sub` parameter
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}category/subcourses/${sub}`)
      .then((res) => {
        setCourses(res.data.courses || []); // Update the courses state
      })
      .catch((error) => {
        console.error("Error fetching courses:", error); // Handle errors
      });
  }, [sub]);

  return (
    <div className="container majortest">
      {/* Dynamically render the courses */}
      {courses.length > 0 ? (
        courses.map((course, index) => (
          <Link
            key={index}
            to={`/exams/payment/${sub}/${index + 1}`} // Dynamic URL for navigation
            className="text-decoration-none">
            <div className="testpart my-3 p-2 rounded-3 d-flex justify-content-between align-items-center">
              <span className="px-3 d-flex align-items-center">
                {course.course_name}
              </span>
              <img src={coins} alt="Coins" />
            </div>
          </Link>
        ))
      ) : (
        <p>No courses available.</p> 
      )}
    </div>
  );
}

export default CourseBuying;
