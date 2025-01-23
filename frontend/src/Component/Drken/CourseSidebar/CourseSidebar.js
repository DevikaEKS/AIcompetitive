import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./CourseSidebar.css"; // Include CSS for styling

function CourseSidebar() {
  const { id, courseid } = useParams();
  const [sidebarData, setSidebarData] = useState([]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}course/sidebar`)
      .then((res) => {
        setSidebarData(res.data.data);
      })
      .catch((err) => {
        console.error("Error fetching sidebar data:", err);
      });
  }, []);

  // Function to determine the path for each quiz type
  const getPathForQuizType = (quizTypeName, quizTypeId) => {
    switch (quizTypeName) {
      case "Practice Test":
        return `/user/${id}/${courseid}/practice/${quizTypeId}`;
      case "Mock Test":
        return `/user/${id}/${courseid}/mock/${quizTypeId}`;
      case "Old Question Test":
        return `/user/${id}/${courseid}/old-questions/${quizTypeId}`;
      default:
        return `/quiz/${id}/${courseid}/${quizTypeId}`; // Default fallback path
    }
  };

  return (
    <div className="coursepart-container">
      <h3 className="sidebar-heading">Quiz Types</h3>
      <ul className="sidebar-list">
        {/* Manually Added Link */}
        <li className="sidebar-item">
          <Link to={`/user/${id}/dash/${courseid}`} className="sidebar-link">
            Dashboard
          </Link>
        </li>

        {/* Dynamically Rendered Links */}
        {sidebarData.map((item) => (
          <li key={item.quiz_type_id} className="sidebar-item">
            <Link
              to={getPathForQuizType(item.quiz_type_name, item.quiz_type_id)} // Determine the path dynamically
              className="sidebar-link"
            >
              {item.quiz_type_name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CourseSidebar;
