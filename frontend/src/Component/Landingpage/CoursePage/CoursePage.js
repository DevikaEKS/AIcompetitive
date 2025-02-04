import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import axios from "axios";
import coins from "../Asset/coins.png";
function CoursePage() {
  const { categoryId } = useParams(); // Get category ID from URL
  const [subCategories, setSubCategories] = useState([]); // State to store subcategories
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/course/getcourse`)
      .then((res) => {
        // Filter subcategories based on `course_category_id`
        const filteredSubCategories = res.data.result.filter(
          (course) => course.course_category_id === parseInt(categoryId)
        );
        setSubCategories(filteredSubCategories);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching subcategories:", error);
        setLoading(false);
      });
  }, [categoryId]);

  if (loading) {
    return <p>Loading subcategories...</p>;
  }

  return (
    
    <div className="container mt-4 mx-0 mx-md-5 px-0 px-md-5">
      <h2 className="text-center">Subcategories</h2>
      <div className="row d-flex flex-column justify-content-center">
        {subCategories.length > 0 ? (
          subCategories.map((sub) => (
           <Link to="/exams/payment/:id/:course" className="text-decoration-none"> <div key={sub.courseid} className=" mb-3 mx-1 mx-md-4">
<div className="testpart my-3 p-2 rounded-3 d-flex justify-content-between align-items-center">
              <span className="px-3 d-flex align-items-center">
                {sub.coursename}
              </span>
              <img src={coins} alt="Coins" />
            </div>
         
            </div>
            </Link>
          ))
        ) : (
          <p className="text-center">No subcategories found.</p>
        )}
      </div>
    </div>
  );
}

export default CoursePage;
