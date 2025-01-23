import React, { useEffect, useState } from "react";
import "./AddCourse.css";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


function AddCourse() {
  const [categories, setCategories] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newCategory, setNewCategory] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState(null); 
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
      });
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setNewCategory("");
  };

  const handleAddCategory = () => {
    if (newCategory.trim() === "") return;

    axios
      .post(`${process.env.REACT_APP_API_URL}category/addcategory`, {
        course_category_name: newCategory,
      })
      .then((response) => {
        if (response.data.message === "Category added successfully") {
          toast.success("Category added successfully");
          fetchCategories(); // Refresh the category list
        }
        handleCloseModal();
      })
      .catch((error) => {
        console.error("Error adding new category:", error);
        toast.error("Error adding new category");
      });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;
    const courseFullName = form.courseFullName.value;
    const courseShortName = form.courseShortName.value;
    const courseStartDate = form.courseStartDate.value;
    const courseEndDate = form.courseEndDate.value;
    const courseImage = form.courseImage.files[0];
    const courseDescription = form.courseDescription.value;

    // Validate required fields
    if (
      !courseFullName ||
      !courseShortName ||
      !courseStartDate ||
      !courseEndDate ||
      !courseImage ||
      !courseDescription ||
      !selectedCategoryId // Ensure a category is selected
    ) {
      alert("All fields are required.");
      return;
    }

    // Prepare form data for the API
    const formData = new FormData();
    formData.append("courseFullName", courseFullName);
    formData.append("courseShortName", courseShortName);
    formData.append("courseStartDate", courseStartDate);
    formData.append("courseEndDate", courseEndDate);
    formData.append("courseImage", courseImage); // Handle image upload in the backend
    formData.append("courseDescription", courseDescription);
    formData.append("courseCategoryId", selectedCategoryId); // Single ID for category

    console.log(formData);

    try {
      // Send the form data to the backend API
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}course/addcourse`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.message === "Course and context added successfully") {
        toast.success("Course added successfully");

        // Reset form fields
        form.reset();
        setSelectedCategoryId(null);
        setNewCategory("");
      } else {
        toast.error(response.data.message || "Failed to add course");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("An error occurred while submitting the form");
    }
  };

  return (
    <div className="container-fluid p-0">
      <ToastContainer />
      <h3 className="text-center mt-2 headinginstructor">Exam Creation</h3>
      <div className="frmbg p-0 p-lg-5 h-100 my-3 rounded-3">
        <form className="bg-light rounded-2 p-3" onSubmit={handleSubmit}>
          <div className="form-group">
            <div className="form-group-inner">
              <label htmlFor="courseFullName" className="labelcourse">Exam Full Name</label>
              <input
                id="courseFullName"
                name="courseFullName"
                type="text"
                className="form-control fc1"
              />
            </div>
          </div>
          <div className="form-group">
            <div className="form-group-inner">
              <label htmlFor="courseShortName" className="labelcourse">Exam Short Name</label>
              <input
                id="courseShortName"
                name="courseShortName"
                type="text"
                className="form-control fc1"
              />
            </div>
          </div>

          <div className="form-group">
            <div className="form-group-inner">
              <label htmlFor="courseCategory" className="labelcourse">Subcategory</label>
              <select
                id="courseCategory"
                name="courseCategory"
                className="form-control fc1 rounded-0"
                onChange={(e) => setSelectedCategoryId(e.target.value)} // Set single ID
                value={selectedCategoryId || ""}
              >
                <option value="">Select the Exam subcategory</option>
                {categories.map((category, i) => (
                  <option key={i} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
              <button
                type="button"
                className="btn btn-dark mx-2"
                onClick={handleOpenModal}
              >
                +
              </button>
            </div>
          </div>

          <div className="form-group">
            <div className="form-group-inner">
              <label htmlFor="courseStartDate" className="labelcourse">Start Date</label>
              <input
                id="courseStartDate"
                name="courseStartDate"
                type="date"
                className="form-control fc1"
              />
            </div>
          </div>
          <div className="form-group">
            <div className="form-group-inner">
              <label htmlFor="courseEndDate" className="labelcourse">End Date</label>
              <input
                id="courseEndDate"
                name="courseEndDate"
                type="date"
                className="form-control fc1"
              />
            </div>
          </div>
          <div className="form-group">
            <div className="form-group-inner">
              <label htmlFor="courseImage" className="labelcourse">Image</label>
              <input
                id="courseImage"
                name="courseImage"
                type="file"
                className="form-control fc1"
                // accept=".jpg, .jpeg"
                accept="image/*"
                required
              />
            </div>
            </div>






            {/* //extra fields */}

            {/* <div className="form-group">
            <div className="form-group-inner">
              <label htmlFor="courseImage" className="labelcourse">Exam frequency</label>
              <input
                id="exam freq"
                name="eamfreq"
                type="text"
                className="form-control fc1"
               
                required
              />
            </div>

            </div>


            <div className="form-group">
            <div className="form-group-inner">
              <label htmlFor="courseImage" className="labelcourse">Exam Level</label>
              <input
                id="examlevel"
                name="examlevel"
                type="text"
                className="form-control fc1"
                
                required
              />
            </div>

            </div>


            <div className="form-group">
            <div className="form-group-inner">
              <label htmlFor="courseImage" className="labelcourse">Exam Date</label>
              <input
                id="examlevel"
                name="examlevel"
                type="text"
                className="form-control fc1"
                
                required
              />
            </div>

            </div> */}

            {/* //extra fields */}
       
          <div className="form-group">
            <div className="form-group-inner">
              <label htmlFor="courseDescription" className="labelcourse">Description</label>
              <textarea
                id="courseDescription"
                name="courseDescription"
                className="form-control fc1 border-0"></textarea>
            </div>
          </div>
          <div className="d-flex justify-content-end">
          <input type="submit" value={"Submit"} className="frmbutton rounded-1 p-2" />
          </div>      
        </form>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="modal show d-block" tabIndex="-1" role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title categorytitle">Add New Category</h5>
              </div>
              <div className="modal-body">
                <input
                  type="text"
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  placeholder="Enter new category"
                  className="form-control"/>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn categorybtn1"
                  onClick={handleCloseModal}>
                  Close
                </button>
                <button
                  type="button"
                  className="btn categorybtn text-light"
                  onClick={handleAddCategory}>
                  Add Category
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AddCourse;
