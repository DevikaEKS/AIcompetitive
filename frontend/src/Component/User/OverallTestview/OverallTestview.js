
import React, { useState, useEffect } from "react";
import "./OverallTestview.css";
import { Link } from "react-router-dom";
import axios from "axios";

function OverallTestview() {
  const [categories, setCategories] = useState([]); // List of categories
  const [subcategories, setSubcategories] = useState([]); // List of subcategories for the selected category
  const [selectedCategory, setSelectedCategory] = useState(null); // Currently selected category
  const [loading, setLoading] = useState(true);
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);

  const toggleAccordion = () => {
    setIsAccordionOpen(!isAccordionOpen);
  };

  // Fetch categories on mount
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}category/getcategory`)
      .then((res) => {
        console.log("Categories API Response:", res.data);
        setCategories(res.data.result);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching categories:", err);
        setLoading(false);
      });
  }, []);

  // Fetch subcategories when a category is selected
  const handleCategoryClick = (categoryId) => {
    setSelectedCategory(categoryId); // Set the selected category
    axios
      .get(`${process.env.REACT_APP_API_URL}category/subcourses/${categoryId}`)
      .then((res) => {
        console.log("Subcategories API Response:", res.data);
        setSubcategories(res.data.courses || []); // Update subcategories
      })
      .catch((err) => {
        console.error("Error fetching subcategories:", err);
        setSubcategories([]); // Clear subcategories on error
      });
  };

  return (
    <div className="container my-3 testoverviewpage">
      {/* Accordion Menu for Small Devices */}
      <div className="accordion-menu d-lg-none">
        <button className="accordion-toggle" onClick={toggleAccordion}>
          Menu
        </button>
        {isAccordionOpen && (
          <div className="accordion-content">
            {categories.map((category) => (
              <button
                key={category.course_category_id}
                onClick={() => handleCategoryClick(category.course_category_id)}
                className="accordion-item">
                {category.course_category_name}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="row mt-5 bg-transparent">
        {/* Sidebar for Large Devices */}
        <div className="col-lg-2 sidebar1 d-none d-lg-block mx-2">
          {categories.map((category) => (
            <div key={category.course_category_id} className="sidebar-item">
              <button
                onClick={() => handleCategoryClick(category.course_category_id)}
                className="btn btn-link py-1 text-decoration-none linktxts"
              >
                {category.course_category_name}
              </button>
            </div>
          ))}
        </div>

        {/* Content Section */}
        <div className="col-lg-8 contentpart mt-3">
          {selectedCategory ? (
            <>
              
              {subcategories.length > 0 ? (
                <div className="subcategory-list">
                  {subcategories.map((sub, index) => (
                    <div key={index} className="card m-2 p-2">
                      <Link to={"/testoverview"} className="subcategorytxt text-decoration-none">{index+1} .{sub.course_name}</Link>
                    </div>
                  ))}
                </div>
              ) : (
                <p>No subcategories available for this category.</p>
              )}
            </>
          ) : (
            <p>Select a category to view its subcategories.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default OverallTestview;
