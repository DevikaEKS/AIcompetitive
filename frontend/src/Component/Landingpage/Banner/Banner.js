import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Banner.css";

function Banner() {
  const [certificateId, setCertificateId] = useState();
  const [categories, setCategories] = useState([]);
  const { id } = useParams(); // Get user ID from URL params
  const navigate = useNavigate(); 

  // Fetch certificate ID when the component mounts
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}user/user/data/${id}`)
      .then((res) => {
        setCertificateId(res.data.user.certificate_id);
      })
      .catch((error) => {
        console.error("Error fetching certificate ID:", error);
      });
  }, [id]);

  useEffect(() => {

    // const fetchCategory = async () => {
    //   try {
    //     const response = await fetch('http://localhost:5000/category/getcategory'); // Adjust the API URL if necessary
    //     console.log(response);
    
    //     if (!response.ok) {
    //       throw new Error('Failed to fetch bus data');
    //     }
    
    //     const data = await response.json();
    //     console.log(data);
    //     setCategories(data);
    //   } catch (err) {
    //     console.error("Error fetching categories:", err);
    //   }
    // };
    
    // fetchCategory();
    axios
      .get(
        `${process.env.REACT_APP_API_URL}category/getcategory`
      )
      .then((res) => {
        setCategories(res.data.result); // Set the categories data
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  }
, []);

// console.log(categories);




  // // Fetch categories based on certificate ID
  // useEffect(() => {
  //   if (certificateId) {
  //     axios
  //       .get(
  //         `${process.env.REACT_APP_API_URL}category/subcategories/${certificateId}`
  //       )
  //       .then((res) => {
  //         setCategories(res.data.categories); // Set the categories data
  //       })
  //       .catch((error) => {
  //         console.error("Error fetching categories:", error);
  //       });
  //   }
  // }, [certificateId]);

  // Function to handle the enroll button click
  const handleEnroll = (categoryId) => {
    navigate(`/exams/${id}/${categoryId}`); // Navigate to the test page with category ID
  };

  return (
    <div className="bannerpage">
      <div className="container m-0" id="sapbanner">
        <div className="row py-5 ">
          <h4 className="text-center pb-4 bannertxt">GOVERNMENT EXAMS</h4>
          {categories.map((category) => (
            <div className="col-sm-12 col-md-3 mb-4" key={category.course_category_id}>
              <div
                className="exampartmain d-flex justify-content-center align-items-center bg-light"
                onClick={() => handleEnroll(category.course_category_id)}>
                <div className="exampart1 d-flex justify-content-center align-items-center bg-light"> 
                  <img
                    src={category.image}
                    alt={category.course_category_name}/>
                </div>
              </div> 
              <p className="text-center py-2 examnames">
                {category.course_category_name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Banner;





