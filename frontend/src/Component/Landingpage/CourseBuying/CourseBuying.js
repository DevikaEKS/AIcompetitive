import React, { useEffect, useState } from "react";
import "./CourseBuying.css";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import coins from "../Asset/coins.png";

function CourseBuying() {
  const { id, sub } = useParams(); // Get the `id` and `sub` params from the URL

  const [courses, setCourses] = useState([]); // State to store the courses

  // Fetch courses based on the `sub` parameter
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}category/subcourses/${sub}`)
      .then((res) => {
        console.log(res.data.courses); // Log the courses from the API
        setCourses(res.data.courses); // Update the courses state with the data
      })
      .catch((error) => {
        console.error("Error fetching courses:", error); // Handle errors
      });
  }, [sub]); // Dependency array, refetch courses if `sub` changes

  return (
    <div className="container majortest">
      {/* Dynamically render the courses */}
      {courses.length > 0 ? (
        courses.map((course) => (
          <Link
            key={course.courseid}
            to={`/exams/payment/${id}/${course.courseid}`} // Construct dynamic URL for navigation
            className="text-decoration-none"
          >
            <div className="testpart my-3 p-2 rounded-3 d-flex justify-content-between align-items-center">
              <span className="px-3 d-flex align-items-center">
                {course.coursename}
              </span>
              <img src={coins} alt="Coins" />
            </div>
          </Link>
        ))
      ) : (
        <p>No courses available.</p> // Display a message if no courses are returned
      )}
    </div>
  );
}

export default CourseBuying;
