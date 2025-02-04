import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "./Banner.css";

function Banner() {
  const [categories, setCategories] = useState([]); // Initialize as empty array
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("Government Exams");
  const navigate = useNavigate();
  const{sub}=useParams([]);
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}category/getcategory`)
      .then((res) => {
        console.log("API Response:", res.data);
        setCategories(res.data.result || []); // Ensure categories is an array
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching categories:", err);
        setCategories([]); // Ensure categories is an empty array in case of error
        setLoading(false);
      });
  }, []); // Empty dependency array to run only once

  const handleEnroll = (categoryId) => {
    navigate(`/subcourse/${categoryId}`);
  };

  const handleCategoryChange = (categoryName) => {
    setSelectedCategory(categoryName);
  };

  if (loading) {
    return <p>Loading categories...</p>;
  }

  // Ensure categories is always an array and filter based on selection
  const filteredCategories =
    Array.isArray(categories) &&
    selectedCategory === "Government Exams"
      ? categories.filter((category) => category.certificate_id === 1)
      : Array.isArray(categories) &&
        selectedCategory === "Global Certifications"
      ? categories.filter((category) => category.certificate_id === 2)
      : [];

  return (
    <div className="bannerpage">
      <div className="container m-0" id="sapbanner">
        {/* Navbar */}
        <div className="d-flex justify-content-center my-4">
          <button
            className={`btn mx-2 ${
              selectedCategory === "Government Exams"
                ? "btn-primary"
                : "btn-outline-primary"
            }`}
            onClick={() => handleCategoryChange("Government Exams")}
          >
            Government Exams
          </button>
          <button
            className={`btn mx-2 ${
              selectedCategory === "Global Certifications"
                ? "btn-primary"
                : "btn-outline-primary"
            }`}
            onClick={() => handleCategoryChange("Global Certifications")}
          >
            Global Certifications
          </button>
        </div>

        {/* Selected Category */}
        <h4 className="text-center pb-4 bannertxt">
          {selectedCategory.toUpperCase()}
        </h4>
        <div className="row py-5">
          {filteredCategories.length > 0 ? (
            filteredCategories.map((category) => (
              <div
                key={category.course_category_id}
                className="col-sm-12 col-md-3 mb-4"
              >
                <div
                  className="exampartmain d-flex justify-content-center align-items-center bg-light"
                  onClick={() => handleEnroll(category.course_category_id)}
                >
                  <div className="exampart1 d-flex justify-content-center align-items-center bg-light">
                    <img
                      src={`http://localhost:5000${category.image}`}
                      alt={category.course_category_name}
                    />
                  </div>
                </div>
                <p className="text-center py-2 examnames">
                  {category.course_category_name}
                </p>
              </div>
            ))
          ) : (
            <p>No categories available for the selected option.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Banner;

