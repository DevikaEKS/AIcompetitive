import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import JoditEditor from "jodit-react";
import { FaPlus } from "react-icons/fa";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileExcel, faDownload } from "@fortawesome/free-solid-svg-icons";

function SampleQuestionUpload() {
  const [certificates, setCertificates] = useState([]); // To store certificates data
  const [certificateId, setCertificateId] = useState(""); // Selected certificate id
  const [categories, setCategories] = useState([]); // To store categories data
  const [subCategoryId, setSubCategoryId] = useState([]); // Selected subcategory id
  const [courses, setCourses] = useState([]); // To store courses data
  const [courseId, setCourseId] = useState(0);
  const [questionType, setQuestionType] = useState(0);
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState([{ option: "", feedback: "" }]);
  const [correctOption, setCorrectOption] = useState("");
  const [showFeedback, setShowFeedback] = useState([]);
  const editorRef = useRef(null);

  const [year,setYear] = useState()

  // Fetch certificates on mount
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}category/certificates`)
      .then((res) => setCertificates(res.data.certificates))
      .catch((error) => {
        console.error("Error fetching certificates:", error);
        // You could display an error toast here if desired
      });
  }, []);

  // Fetch categories when certificateId changes
  useEffect(() => {
    if (certificateId) {
      axios
        .get(
          `${process.env.REACT_APP_API_URL}category/subcategories/${certificateId}`
        )
        .then((res) => {
          console.log(res.data.categories);
          setCategories(res.data.categories);
        })
        .catch((error) => {
          console.error("Error fetching categories:", error);
        });
    }
  }, [certificateId]);

  // Fetch courses when subCategoryId changes
  useEffect(() => {
    if (subCategoryId) {
      axios
        .get(`http://localhost:5000/subcourses/${subCategoryId}`)
        .then((response) => setCourses(response.data.courses)) // Update courses state
        .catch((error) => console.error("Error fetching courses:", error));
    }
  }, [subCategoryId]);
  // useEffect(() => {
  //   if (subCategoryId) {
  //     axios
  //       .get(
  //         `${process.env.REACT_APP_API_URL}category/subcourses/${subCategoryId}`
  //       )
  //       .then((res) => {
  //         setCourses(res.data.courses);
  //       })
  //       .catch((error) => {
  //         console.error("Error fetching courses:", error);
  //       });
  //   }
  // }, [subCategoryId]);

  // Handle select change for certificate
  const handleCertificateChange = (e) => {
    setCertificateId(e.target.value);
    setSubCategoryId(""); // Reset subcategory when certificate changes
    setCourses([]); // Reset courses when certificate changes
  };

  // Handle select change for category
  const handleCategoryChange = (e) => {
    setSubCategoryId(e.target.value);
  };

  // Handle select change for course
  const handleCourseChange = (e) => {
    setSubCategoryId(e.target.value);
  };

  // Handle select change for question type
  const handleQuestionTypeChange = (e) => {
    setQuestionType(e.target.value);
  };

  // Handle correct option change
  const handleCorrectOptionChange = (e) => {
    const selectedOption = options[e.target.value]; // Get the selected option object
    setCorrectOption(selectedOption.option); // Store the option text
  };

  // Handle option input change
  const handleOptionChange = (index, field, value) => {
    const updatedOptions = [...options];
    updatedOptions[index][field] = value;
    setOptions(updatedOptions);
  };

  // Toggle feedback visibility
  const toggleFeedback = (index) => {
    const updatedFeedback = [...showFeedback];
    updatedFeedback[index] = !updatedFeedback[index];
    setShowFeedback(updatedFeedback);
  };

  // Add new option dynamically
  const addOption = () => {
    setOptions([...options, { option: "", feedback: "" }]);
    setShowFeedback([...showFeedback, false]);
  };

  // Handle question submission
  // Handle question submission
  const handleSubmit = () => {
    const data = {
      courseId,
      questionType,
      question,
      options,
      correctOption, // This will now be the option text, not index
      year
    };

    console.log(data);

    axios
      .post(`${process.env.REACT_APP_API_URL}quiz/storesamplequestion`, data)
      .then((res) => {
        if (res.data.message === "All fields are required") {
          alert("All fields are required");
        } else if (res.data.message === "Invalid questionType") {
          alert("Invalid questionType");
        } else if (res.data.message === "Database error") {
          alert("Try again");
        } else if (res.data.message === "Data successfully stored") {
          alert("Question successfully stored");
          setCertificateId(""); // Reset selected certificate
          setSubCategoryId(""); // Reset selected subcategory
          setCourseId(0); // Reset selected course
          setQuestionType(0); // Reset question type
          setQuestion(""); // Reset question text
          setOptions([{ option: "", feedback: "" }]); // Reset options
          setCorrectOption(""); // Reset correct option
          setShowFeedback([]); // Reset feedback visibility
        }
      })
      .catch((error) => console.error("Error submitting question:", error));
  };

  return (
    <div className="container mt-4">
       <h3 className="text-center my-2 headinginstructor">Sample Quiz</h3>
      <div className="modpart p-3">
     
      {/* Certificate Selection */}
      <div className="form-group">
      <div className="form-group-inner">
        <label htmlFor="certificateSelect" className="labelcourse">Select Category</label>
        <select
          id="certificateSelect"
          className="form-control fc1 rounded-0"
          value={certificateId}
          onChange={handleCertificateChange}>
          <option value="" disabled>
            Select a Category
          </option>
          {certificates.map((certificate) => (
            <option
              key={certificate.certificate_id}
              value={certificate.certificate_id}>
              {certificate.name}
            </option>
          ))}
        </select>
        </div>
      </div>

      {/* Category Selection */}
      {certificateId && (
        <div className="form-group">
     <div className="form-group-inner">
          <label htmlFor="categorySelect" className="labelcourse">Select SubCategory</label>
          <select
            id="categorySelect"
            className="form-control fc1 rounded-0"
            value={subCategoryId}
            onChange={handleCategoryChange}>
            <option value="" disabled>
              Select a subcategory
            </option>
            {categories.map((category) => (
              <option
                key={category.course_category_id}
                value={category.course_category_id}>
                {category.course_category_name}
              </option>
            ))}
          </select>
          </div>
        </div>
      )}

      {/* Course Selection */}
      {subCategoryId && (
        <div className="form-group">
            <div className="form-group-inner">
          <label htmlFor="courseSelect" className="labelcourse">Select Course</label>
          <select
            id="courseSelect"
            className="form-control fc1 rounded-0"
            value={courseId}
            onChange={handleCourseChange}
          >
            <option value={0} disabled>
              Select a course
            </option>
            {courses.map((course) => (
              <option key={course.id} value={course.courseid}>
                {course.coursename}
              </option>
            ))}
          </select>
        </div>
        </div>
      )}

      {/* Question Type Selection */}
      <div className="form-group">
      <div className="form-group-inner">
        <label htmlFor="questionType" className="labelcourse">Select Question Type</label>
        <select
          id="questionType"
          className="form-control fc1 rounded-0"
          value={questionType}
          onChange={handleQuestionTypeChange}
        >
          <option value={0} disabled>
            Select a question type
          </option>
          <option value={1}>Past Paper</option>
          <option value={2}>Mock Test</option>
          <option value={3}>Module Practice</option>
        </select>
      </div>
      </div>
      {/* Select year Selection */}
      <div className="form-group">
      <div className="form-group-inner">
        <label htmlFor="questionType" className="labelcourse">Select Question Year</label>
        <select
          id="questionType"
          className="form-control fc1 rounded-0"
          value={year}
          onChange={(e) => setYear(e.target.value)}
        >
          <option value={`2014 - 2019`} disabled>
            Select Question Year
          </option>
          <option value={`2014 - 2019`}>Year 2014 - 2019</option>
          <option value={`2020 - 2024`}>Year 2020 - 2024</option>
        </select>
      </div>
      </div>
      {/* Question Input */}
      <div className="form-group">
      <div className="form-group-inner">
        <label htmlFor="questionInput" className="labelcourse">Enter Question</label>
        <JoditEditor
          ref={editorRef}
          value={question}
          config={{
            readonly: false,
            toolbar: true,
          }}
          onBlur={(content) => setQuestion(content)}
        />
      </div>
      </div>
      {/* Options Input */}
      <div style={{ marginTop: "10px" }}>
        {options.map((optionObj, index) => (
          <div key={index} style={{ marginBottom: "20px" }} className="form-group">
            <label htmlFor={`option${index + 1}`} className="labelcourse text-start">
              Option {index + 1}:
            </label>
            <input
              type="text"
              placeholder={`Option ${String.fromCharCode(65 + index)}`} // A, B, C, D, etc.
              value={optionObj.option}
              onChange={(e) =>
                handleOptionChange(index, "option", e.target.value)
              }
              className="form-control fc1"/>
            <button
              className="btn btn-secondary my-3"
              onClick={() => toggleFeedback(index)}
            >
              {showFeedback[index] ? "Hide Feedback" : "Add Feedback"}
            </button>
            {showFeedback[index] && (
              <div className="feedback" style={{ marginTop: "10px" }}>
                <label className="text-start">Feedback for Option {index + 1}:</label>
                <JoditEditor
                  className="fc1"
                  value={optionObj.feedback}
                  config={{
                    readonly: false,
                    toolbar: true,
                  }}
                  onBlur={(newContent) =>
                    handleOptionChange(index, "feedback", newContent)
                  }
                />
              </div>
            )}
          </div>
        ))}

        {/* Add new option */}
        <button onClick={addOption} className="btn btn-outline-success mt-2">
          <FontAwesomeIcon icon={FaPlus} />+
        </button>
      </div>

      {/* Correct Answer Selection */}
      {/* Correct Answer Selection */}
      <div className="form-group mt-3">
        <div className="form-group-inner">
        <label htmlFor="correctAnswer" className="labelcourse">Select Correct Answer</label>
        <select
          id="correctAnswer"
          className="form-control fc1 rounded-0"
          value={options.findIndex(
            (optionObj) => optionObj.option === correctOption
          )} 
          onChange={handleCorrectOptionChange}>
          <option value="" disabled>
            Select correct option
          </option>
          {options.map((optionObj, index) => (
            <option key={index} value={index}>
              {optionObj.option} {/* Display the actual value of the option */}
            </option>
          ))}
        </select>
      </div>
      </div>
      {/* Submit Button */}
      <div className="text-center mt-3">
        <button className="btn btn-primary" onClick={handleSubmit}>
          Submit Question
        </button>
      </div>
    </div>
    </div>
  );
}

export default SampleQuestionUpload;
