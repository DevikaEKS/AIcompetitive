

import React, { useState, useEffect } from "react";
import "./AddCategory.css";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AddCategory() {
  const [categories, setCategories] = useState([]);
  const [inputFields, setInputFields] = useState([{ id: 1, value: "" }]);
  const [certificates, setCertificates] = useState([]);
  const [selectedCertificate, setSelectedCertificate] = useState(null); // Store selected certificate ID
  const [selectedImage, setSelectedImage] = useState(null); // Store selected image

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}category/certificates`)
      .then((res) => {
        setCertificates(res.data.certificates);
      })
      .catch((error) => {
        console.error("Error fetching certificates:", error);
        toast.error("Error fetching certificates");
      });
  }, []);

  // Fetch categories when the component mounts
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}category/getcategory`)
      .then((res) => {
        const fetchedCategories = res.data.result.map((category) => ({
          name: category.course_category_name,
          id: category.course_category_id,
        }));
        setCategories(fetchedCategories);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
        toast.error("Error fetching categories");
      });
  };

  const handleAddCategory = () => {
    if (!selectedCertificate) {
      toast.error("Please select a certificate.");
      return;
    }

    if (!selectedImage) {
      toast.error("Please upload an image.");
      return;
    }

    // console.log(selectedCertificate, selectedImage);

    inputFields.forEach((input) => {
      if (input.value.trim()) {
        const formData = new FormData();
        formData.append("course_category_name", input.value);
        formData.append("certificate_id", selectedCertificate);
        formData.append("categoryImage", selectedImage); // Add the selected image

        axios
          .post(`${process.env.REACT_APP_API_URL}category/addcategory`, formData, {
            headers: { "Content-Type": "multipart/form-data" },
          })
          .then((response) => {
            if (
              response.data.message === "Category and image added successfully"
            ) {
              toast.success("Category added successfully");
              fetchCategories();
              setInputFields([{ id: 1, value: "" }]); // Reset input fields
              setSelectedImage(null); // Clear image field
            }
            else if(response.data.message === "course_category_name and certificate_id are required"){
              toast.error("kindly fill all the fields")
            }
            else if(response.data.message === "Category image is required"){
              toast.error("kindly select the image")
            }
          })
          .catch((error) => {
            console.error("Error adding new category:", error);
            toast.error("Error adding new category");
          });
      }
    });
  };

  const handleAddInputField = () => {
    setInputFields([...inputFields, { id: inputFields.length + 1, value: "" }]);
  };

  const handleInputChange = (id, newValue) => {
    setInputFields(
      inputFields.map((input) =>
        input.id === id ? { ...input, value: newValue } : input
      )
    );
  };

  const handleCertificateChange = (e) => {
    setSelectedCertificate(e.target.value);
  };

  const handleImageChange = (e) => {
    setSelectedImage(e.target.files[0]); // Store the selected file
  };

  return (
    <div className="container-fluid p-0">
      <ToastContainer />
      <h4 className="text-center mb-5 headinginstructor">
        Sub Category Creation
      </h4>
      <div className="row m-3 modpart p-1 p-lg-5">
        <div className="col-sm-12 col-md-7">
          {/* Select Certificate */}
          <div className="mb-4">
            <label htmlFor="certificateSelect" className="form-label">
              Select Category
            </label>
            <select
              id="certificateSelect"
              className="form-select fc1"
              onChange={handleCertificateChange}
            >
              <option value="">Choose a Category</option>
              {certificates.map((certificate) => (
                <option
                  key={certificate.certificate_id}
                  value={certificate.certificate_id}
                >
                  {certificate.name}
                </option>
              ))}
            </select>
          </div>

          {/* Image Upload */}
          <div className="mb-4">
            <label htmlFor="imageUpload" className="form-label">
              Upload Image
            </label>
            <input
              type="file"
              id="imageUpload"
              className="form-control fc1"
              onChange={handleImageChange}
              accept="image/*"
            />
          </div>

          {/* Input Fields */}
          {inputFields.map((input) => (
            <div key={input.id} className="d-flex align-items-center mb-2">
              <input
                type="text"
                className="fc1 form-control"
                placeholder="Enter Subcategory name"
                value={input.value}
                onChange={(e) => handleInputChange(input.id, e.target.value)}
              />
              {/* <button
                className="ms-2 plusbtn text-light px-2"
                onClick={handleAddInputField}
              >
                +
              </button> */}
            </div>
          ))}

          <button
            className="mt-4 rounded-2 updatebtn p-2"
            onClick={handleAddCategory}
          >
            Submit
          </button>
        </div>

        <div className="col-sm-12 col-md-5">
          <div className="px-0 px-md-5">
            <h4 className="mb-4 mt-4 mt-md-0 categorytitle">
              Added Category List
            </h4>
            <div>
              {categories.map((category) => (
                <div key={category.id} className="card p-2 fc1">
                  <p className="m-0">{category.name}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddCategory;
