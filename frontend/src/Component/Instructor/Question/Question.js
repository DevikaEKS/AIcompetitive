import React, { useState, useEffect, useRef } from "react";
import JoditEditor from "jodit-react";
import * as XLSX from "xlsx";
import axios from "axios"; // Make sure axios is imported
import "./Question.css";
import DropdownTreeSelect from "react-dropdown-tree-select";
import "react-dropdown-tree-select/dist/styles.css";
import { FaPlus, FaUpload } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload, faFileExcel } from "@fortawesome/free-solid-svg-icons";

const Question = () => {
  const [content, setContent] = useState("");
  const [questionType, setQuestionType] = useState("multiple_choice");
  const [correctOption, setCorrectOption] = useState("");
  const [options, setOptions] = useState([{ option: "", feedback: "" }]);
  const [showFeedback, setShowFeedback] = useState([
    false,
    false,
    false,
    false,
  ]);
  const [keywords, setKeywords] = useState([
    { keyword: "", marks: "", feedback: "" },
  ]);
  const [uploadedQuestions, setUploadedQuestions] = useState([]);
  const [selected, setSelected] = useState([]);
  const [moduleStructure, setModuleStructure] = useState([]); // State to store fetched data
  const [selectedModuleId, setSelectedModuleId] = useState(null);
  const [parentModuleId, setParentModuleId] = useState(null);
  const [matchLeft, setMatchLeft] = useState([""]); // State for left side items
  const [matchRight, setMatchRight] = useState([""]); // State for right side items
  const editorRef = useRef(null);
  const [correctOptions, setCorrectOptions] = useState([]);

  const [courses, setCourses] = useState([]);
  const [modules, setModules] = useState([]);
  const [submodules, setSubmodules] = useState([]);
  const [courseid, setCourseId] = useState(0);
  const [moduleid, setModuleId] = useState(0);
  const [submoduleid, setSubmoduleid] = useState(0);
  const [isNegativeMark, setIsNegativeMark] = useState(false);
  const [negativeMarkValue, setNegativeMarkValue] = useState("");
  const { id } = useParams();

  useEffect(() => {
    // Fetch all courses on component mount
    axios
      .get(`${process.env.REACT_APP_API_URL}course/getcourse`)
      .then((res) => {
        setCourses(res.data.result);
      })
      .catch((error) => {
        toast.error("Failed to fetch courses!");
        console.error(error);
      });
  }, []);

  useEffect(() => {
    if (courseid !== 0) {
      // Fetch modules based on selected course ID
      axios
        .get(`${process.env.REACT_APP_API_URL}course/getmodules/${courseid}`)
        .then((res) => {
          setModules(res.data);
        })
        .catch((error) => {
          toast.error("Failed to fetch modules!");
          console.error(error);
        });
    } else {
      setModules([]); // Clear modules if no course is selected
    }
  }, [courseid]);

  useEffect(() => {
    if (courseid !== 0) {
      // Fetch modules based on selected course ID
      axios
        .get(
          `${process.env.REACT_APP_API_URL}course/submodules/${courseid}/${moduleid}`
        )
        .then((res) => {
          // console.log(res.data);
          setSubmodules(res.data.results);
        })
        .catch((error) => {
          toast.error("Failed to fetch modules!");
          console.error(error);
        });
    } else {
      setSubmodules([]); // Clear modules if no course is selected
    }
  }, [moduleid]);

  const handleFileDownload = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}quiz/download-sample`, {
        responseType: "blob", // Ensure the response is treated as a file
      })
      .then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "Sample_Question_Format.csv"); // Set the file name
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      })
      .catch((error) => {
        console.error("Error downloading file:", error);
      });
  };
  const handleNegativeMarkChange = (event) => {
    setIsNegativeMark(event.target.value === "yes");
    if (event.target.value === "no") {
      setNegativeMarkValue(""); // Reset the value if "No" is selected
    }
  };


  const handleCourseChange = (event) => {
    setCourseId(event.target.value);
    setModuleId(0); // Reset selected module when course changes
  };

  const handleModuleChange = (event) => {
    setModuleId(event.target.value);
  };

  const handleSubmoduleChange = (e) => {
    setSubmoduleid(parseInt(e.target.value));
  };

  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleChange = (currentNode, selectedNodes) => {
    setSelected(selectedNodes);

    if (currentNode) {
      setSelectedModuleId(currentNode.value); // Use 'value' for module ID

      // Find the parent ID using the utility function
      const parentId = findParentNode(moduleStructure, currentNode.value);
      setParentModuleId(parentId);
    }

    if (currentNode && currentNode.label) {
      console.log(`Selected: ${currentNode.label}`);
    }

    console.log("Selected Nodes:", selectedNodes);
  };

  const handleOptionChange = (index, field, value) => {
    const newOptions = [...options];
    newOptions[index][field] = value;
    setOptions(newOptions);
  };

  const findParentNode = (data, childValue) => {
    for (let node of data) {
      if (node.children && node.children.length > 0) {
        if (node.children.some((child) => child.value === childValue)) {
          return node.value; // Found the parent
        }
        const parent = findParentNode(node.children, childValue);
        if (parent) {
          return parent;
        }
      }
    }
    return null; // No parent found
  };

  const handleEditorChange = (newContent) => {
    setContent(newContent);
  };

  const handleQuestionTypeChange = (event) => {
    setQuestionType(event.target.value);
    setCorrectOption("");
  };

  const handleCorrectOptionChange = (e) => {
    setCorrectOption(e.target.value);
  };

  const toggleFeedback = (index) => {
    const newShowFeedback = [...showFeedback];
    newShowFeedback[index] = !newShowFeedback[index];
    setShowFeedback(newShowFeedback);
  };

  const handleKeywordChange = (index, field, value) => {
    const newKeywords = [...keywords];
    newKeywords[index] = { ...newKeywords[index], [field]: value };
    setKeywords(newKeywords);
  };

  const addKeyword = () => {
    setKeywords([...keywords, { keyword: "", marks: "", feedback: "" }]);
  };

  const removeKeyword = (index) => {
    setKeywords(keywords.filter((_, i) => i !== index));
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet);
        setUploadedQuestions(jsonData);
      };
      reader.readAsArrayBuffer(file);
    }
  };

  const [matchFeedback, setMatchFeedback] = useState([{ feedback: "" }]); // Initialize feedback as an array of objects

  // Handler for changes in left/right items
  const handleMatchChange = (index, value, side) => {
    if (side === "left") {
      const newMatchLeft = [...matchLeft];
      newMatchLeft[index] = value;
      setMatchLeft(newMatchLeft);
    } else {
      const newMatchRight = [...matchRight];
      newMatchRight[index] = value;
      setMatchRight(newMatchRight);
    }
  };

  // Handler for feedback change
  const handleMatchFeedbackChange = (index, value) => {
    const newFeedback = [...matchFeedback];
    newFeedback[index].feedback = value; // Store feedback as an object
    setMatchFeedback(newFeedback);
  };

  // Function to add new match pairs
  const addMatchPair = () => {
    setMatchLeft([...matchLeft, ""]); // Add a new left item
    setMatchRight([...matchRight, ""]); // Add a new right item
    setMatchFeedback([...matchFeedback, { feedback: "" }]); // Initialize feedback for new pair
  };

  // Function to remove match pairs
  const removeMatchPair = (index) => {
    setMatchLeft(matchLeft.filter((_, i) => i !== index));
    setMatchRight(matchRight.filter((_, i) => i !== index));
    setMatchFeedback(matchFeedback.filter((_, i) => i !== index)); // Remove feedback for the pair
  };

  const handleSubmit = async () => {
    // Create a new FormData object
    const formData = new FormData();

    // Append form fields to the FormData object
    formData.append("content", content);
    formData.append("questionType", questionType);
    formData.append("correctOption", correctOption);
    formData.append("selectedModuleId", selectedModuleId);
    formData.append("parentModuleId", parentModuleId);
    formData.append("correct", JSON.stringify(correctOptions));
    formData.append("courseid", courseid);
    formData.append("moduleid", moduleid);
    formData.append("submoduleid", submoduleid);

    if (questionType === "multiple_choice" || questionType === "true/false") {
      formData.append("options", JSON.stringify(options));
    }

    if (questionType === "description") {
      formData.append("keywords", JSON.stringify(keywords));
    }

    if (questionType === "check") {
      formData.append("options", JSON.stringify(options));
    }

    if (questionType === "match_following") {
      const matches = matchLeft.map((left, index) => ({
        leftItem: left,
        rightItem: matchRight[index],
      }));
      formData.append("matches", JSON.stringify(matches));
      formData.append("feedback", JSON.stringify(matchFeedback));
    }

    // Conditionally append the file if it exists
    if (file) {
      formData.append("file", file); // Attach file to form data
    }

    console.log(formData);

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}quiz/addquestion`,
        formData
      );

      if (res.data.message === "quiz_added") {
        toast.success("Added successfully");

        // Clear all input and box values by resetting state
        setContent("");
        setQuestionType("multiple choice");
        setCorrectOption("");
        setOptions([
          { option: "", feedback: "" },
          { option: "", feedback: "" },
          { option: "", feedback: "" },
          { option: "", feedback: "" },
        ]);
        setShowFeedback([false, false, false, false]);
        setKeywords([{ keyword: "", marks: "", feedback: "" }]);
        setUploadedQuestions([]);
        setSelected([]);
        setSelectedModuleId(null);
        setParentModuleId(null);
        setFile(null); // Clear file input state

        // Reset the JoditEditor content
        if (editorRef.current) {
          editorRef.current.editor.setValue(""); // Clear the editor content
        }
      } else if (res.data.error === "db_error") {
        toast.error(res.data.error);
      }
    } catch (error) {
      console.error("Error submitting form", error);
      // toast.error("Error submitting form");
    }
  };

  const FileSubmit = async () => {
    // Create a new FormData object
    const formData = new FormData();
    // Append form fields to the FormData object
    formData.append("courseid", courseid);
    formData.append("moduleid", moduleid);
    formData.append("submoduleid", submoduleid);
    // Conditionally append the file if it exists
    if (file) {
      formData.append("file", file); // Attach file to form data
    }
    console.log(formData);
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}quiz/uploadquestions`,
        formData
      );
      console.log(res);

      if (res.data.message === "quiz_added") {
        toast.success("Added successfully");
 // Clear all input and box values by resetting state
        setContent("");
        setQuestionType("multiple choice");
        setCorrectOption("");
        setOptions([
          { option: "", feedback: "" },
          { option: "", feedback: "" },
          { option: "", feedback: "" },
          { option: "", feedback: "" },
        ]);
        setShowFeedback([false, false, false, false]);
        setKeywords([{ keyword: "", marks: "", feedback: "" }]);
        setUploadedQuestions([]);
        setSelected([]);
        setSelectedModuleId(null);
        setParentModuleId(null);
        setFile(null); // Clear file input state

        // Reset the JoditEditor content
        if (editorRef.current) {
          editorRef.current.editor.setValue(""); // Clear the editor content
        }
      } else if (res.data.error === "db_error") {
        toast.error(res.data.error);
      }
    } catch (error) {
      console.error("Error submitting form", error);
      toast.error("Error submitting form");
    }
  };

  const addOption = () => {
    setOptions([...options, { option: "", feedback: "" }]); // Add new empty option
    setShowFeedback([...showFeedback, false]); // Add corresponding feedback toggle for the new option
  };

  return (
    <div className="container-fluid">
      <ToastContainer />
      <h3 className="text-center headinginstructor">Quiz</h3>
      <div className="modpart p-0 p-lg-5 rounded-3">
        <form>
          <div className="w-100">
            <div className="form-group">
              <div className="form-group-inner">
              <label htmlFor="courseSelect" className="labelcourse">Select Course</label>
              <select
                id="courseSelect"
                className="form-control rounded-0"
                value={courseid}
                onChange={handleCourseChange}>
                <option value={0} disabled>
                  Select a course
                </option>
                {courses.map((course) => (
                  <option key={course.courseid} value={course.courseid}>
                    {course.coursename}
                  </option>
                ))}
              </select>
            </div>
            </div>
            {modules.length > 0 && (
              <div className="form-group mt-3">
                  <div className="form-group-inner">
                <label htmlFor="moduleSelect" className="labelcourse">Select Module</label>
                <select
                  id="moduleSelect"
                  className="form-control rounded-0"
                  value={moduleid}
                  onChange={handleModuleChange}>
                  <option value={0} disabled>
                    Select a module
                  </option>
                  {modules.map((module) => (
                    <option key={module.moduleid} value={module.moduleid}>
                      {module.modulename}
                    </option>
                  ))}
                </select>
              </div>
              </div>
            )}

            {submodules.length > 0 && (
              <div className="form-group mt-3">
                <div className="form-group-inner">
                <label htmlFor="submoduleSelect" className="labelcourse">Select Submodule</label>
                <select
                  id="submoduleSelect"
                  className="form-control rounded-0"
                  value={submoduleid}
                  onChange={handleSubmoduleChange}>
                  <option value={0} disabled>
                    Select a submodule
                  </option>
                  {submodules.map((submodule) => (
                    <option
                      key={submodule.submodule_id}
                      value={submodule.submodule_id} >
                      {submodule.submodulename}
                    </option>
                  ))}
                </select>
              </div>
              </div>
            )}
          </div>

          <div className="form-group">
            <div className="form-group-inner w-100">
              <label htmlFor="questionType" className="labelcourse">
                Select Question Type
              </label>
              <select
                id="questionType"
                value={questionType}
                onChange={handleQuestionTypeChange}
                className="w-100 fc1 rounded-0">
                <option value="multiple choice">Multiple Choice</option>
                <option value="description">Description</option>
                <option value="match_following">match_following</option>
                <option value="check">Multi Select</option>
              </select>
            </div>
          </div>
        </form>

        <div className="d-flex justify-content-between align-items-center py-2">
          <label className="labelcourse" >Quiz Question</label>
          <div className="d-flex align-items-center">
            {/* Upload Excel */}
            <input
              type="file"
              accept=".xlsx, .xls, .csv"
              onChange={handleFileChange}
              style={{ display: "none" }}
              id="excelFileInput"
              className="uploadexcell"/>
            <label htmlFor="excelFileInput" className="btn btn-light mx-2">
              <FontAwesomeIcon icon={faFileExcel} color="#28a745" size="lg" />
              <span className="ml-2">Upload Excel</span>
            </label>
            <button onClick={FileSubmit} className="btn btn-primary mx-2">
              Upload
            </button>

            {/* Download Icon */}
            <button
              onClick={handleFileDownload}
              className="btn btn-success mx-2">
              <FontAwesomeIcon icon={faDownload} size="lg" />
              <span className="ml-2"></span>
            </button>
          </div>
          <Link to={`/instructordashboard/${id}/updatequestion`}>
            <button
              className="btn updatebtn"
              style={{ color: "#fff", backgroundColor: "#291571" }} >
              Update Question
            </button>
          </Link>
        </div>

        <JoditEditor
          className="fc1"
          ref={editorRef}
          value={content}
          config={{
            readonly: false,
            toolbar: true,
          }}
          onBlur={handleEditorChange}/>

        {/* {questionType === "check" && (
          <div style={{ marginTop: "10px" }}>
            {options.map((optionObj, index) => (
              <div key={index} style={{ marginBottom: "20px" }}>
                <div className="form-group">
                  <div className="form-group-inner">
                <label htmlFor={`option${index + 1}`} className="labelcourse">
                  Option{index + 1}:
                </label>
                <input
                  className="py-2 fc1 border-0 w-75"
                  type="text"
                  placeholder={`Option ${String.fromCharCode(65 + index)}`} 
                  value={optionObj.option}
                  onChange={(e) =>
                    handleOptionChange(index, "option", e.target.value)
                  }/>
               <input type="number" placeholder="Enter mark" className="p-1 rounded-1 w-25"/>
                </div>
                <label className="my-1 labelcourse text-start">Negative Mark</label>
<div className="d-flex align-items-center">
  <label className="form-check-label">
    <input
      className="custom-radio mx-2"
      type="radio"
      name="negativeMark"
      value="yes"
      checked={isNegativeMark}
      onChange={handleNegativeMarkChange}/>
    Yes
  </label>
  <label className="form-check-label">
    <input
      className="custom-radio mx-2"
      type="radio"
      name="negativeMark"
      value="no"
      checked={!isNegativeMark}
      onChange={handleNegativeMarkChange}
    />
    No
  </label>
</div>
          {isNegativeMark && (
        <div className="mt-3"> 
          <input
            type="number"
            className="form-control w-25"
            placeholder="Enter negative mark value"
            min="0"
            value={negativeMarkValue}
            onChange={(e) => setNegativeMarkValue(e.target.value)} />  
        </div>
      )}
               </div>
                <button
                  className="m-3 feedbackbtn rounded-2"
                  onClick={() => toggleFeedback(index)}>
                  {showFeedback[index] ? "Hide Feedback" : "Add Feedback"}
                </button>
                {showFeedback[index] && (
                  <div className="feedback" style={{ marginTop: "10px" }}>
                    <label className="labelcourse">Feedback for Option {index + 1}:</label>
                    <JoditEditor
                      className="fc1"
                      value={optionObj.feedback}
                      config={{
                        readonly: false,
                        toolbar: true,
                      }}
                      onBlur={(newContent) =>
                        handleOptionChange(index, "feedback", newContent)
                      }/>
                  </div>
                )}
              </div>
            ))}

           
            <div className="add-option-btn mt-3">
              <button className="btn btn-outline-danger" onClick={addOption}>
                <FaPlus /> Add Option
              </button>
            </div>

           
            <div style={{ marginTop: "10px", marginBottom: "10px" }}>
              <label className="labelcourse">Select Correct Options:</label>
              <div style={{ marginLeft: "10px"}}>
                {options.map(
                  (option, index) =>
                    option.option.trim() && (
                      <div key={index}>
                        <input
                          type="checkbox"
                          id={`correctOption${index}`}
                          checked={correctOptions.includes(option.option)} // Check if this option is in the correctOptions array
                          onChange={(e) => {
                            const updatedCorrectOptions = e.target.checked
                              ? [...correctOptions, option.option] // Add the option if checked
                              : correctOptions.filter(
                                  (opt) => opt !== option.option // Remove the option if unchecked
                                );
                            setCorrectOptions(updatedCorrectOptions);
                          }} />
                        <label
                          htmlFor={`correctOption${index}`}
                          style={{ marginLeft: "8px" }}>
                          {option.option}
                        </label>
                      </div>
                    )
                )}
              </div>
            </div>
          </div>
        )} */}




{questionType === "check" && (
  <div style={{ marginTop: "10px" }}>
    {options.map((optionObj, index) => (
      <div key={index} style={{ marginBottom: "20px" }}>
        <div className="form-group">
          <div className="form-group-inner">
            <label htmlFor={`option${index + 1}`} className="labelcourse">
              Option {index + 1}:
            </label>
            <input
              className="py-2 fc1 border-0 w-75"
              type="text"
              placeholder={`Option ${String.fromCharCode(65 + index)}`}
              value={optionObj.option}
              onChange={(e) =>
                handleOptionChange(index, "option", e.target.value)
              }
            />
            <input
              type="number"
              placeholder="Enter mark"
              className="p-1 rounded-1 w-25"
              value={optionObj.marks || ""}
              onChange={(e) =>
                handleOptionChange(index, "marks", parseFloat(e.target.value) || 0)
              }
            />
          </div>
          <label className="my-1 labelcourse text-start">Negative Mark</label>
          <div className="d-flex align-items-center">
            <label className="form-check-label">
              <input
                className="custom-radio mx-2"
                type="radio"
                name={`negativeMark${index}`}
                value="yes"
                checked={optionObj.isNegativeMark}
                onChange={() => handleOptionChange(index, "isNegativeMark", true)}
              />
              Yes
            </label>
            <label className="form-check-label">
              <input
                className="custom-radio mx-2"
                type="radio"
                name={`negativeMark${index}`}
                value="no"
                checked={!optionObj.isNegativeMark}
                onChange={() => handleOptionChange(index, "isNegativeMark", false)}
              />
              No
            </label>
          </div>
          {optionObj.isNegativeMark && (
            <div className="mt-3">
              <input
                type="number"
                className="form-control w-25"
                placeholder="Enter negative mark value"
                min="0"
                value={optionObj.negativeMarkValue || ""}
                onChange={(e) =>
                  handleOptionChange(
                    index,
                    "negativeMarkValue",
                    parseFloat(e.target.value) || 0
                  )
                }
              />
            </div>
          )}
        </div>
        <button
          className="m-3 feedbackbtn rounded-2 p-2"
          onClick={() => toggleFeedback(index)}>
          {showFeedback[index] ? "Hide Feedback" : "Add Feedback"}
        </button>
        {showFeedback[index] && (
          <div className="feedback" style={{ marginTop: "10px" }}>
            <label className="labelcourse">Feedback for Option {index + 1}:</label>
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

    {/* Display total marks */}
    <div style={{ marginTop: "20px" }}>
      <strong>Total Marks for this question is: </strong>
      {options.reduce((total, opt) => total + (opt.marks || 0), 0)}
    </div>

    {/* Add the "+" button to add new options dynamically */}
    <div className="add-option-btn mt-3">
      <button className="btn btn-outline-danger" onClick={addOption}>
        <FaPlus /> Add Option
      </button>
    </div>

    {/* Checkbox for correct options */}
    <div style={{ marginTop: "10px", marginBottom: "10px" }}>
      <label className="labelcourse">Select Correct Options:</label>
      <div style={{ marginLeft: "10px" }}>
        {options.map(
          (option, index) =>
            option.option.trim() && (
              <div key={index}>
                <input
                  type="checkbox"
                  id={`correctOption${index}`}
                  checked={correctOptions.includes(option.option)} // Check if this option is in the correctOptions array
                  onChange={(e) => {
                    const updatedCorrectOptions = e.target.checked
                      ? [...correctOptions, option.option] // Add the option if checked
                      : correctOptions.filter((opt) => opt !== option.option); // Remove the option if unchecked
                    setCorrectOptions(updatedCorrectOptions);
                  }}
                />
                <label htmlFor={`correctOption${index}`} style={{ marginLeft: "8px" }}>
                  {option.option}
                </label>
              </div>
            )
        )}
      </div>
    </div>
  </div>
)}

        {questionType === "match_following" && (
          <div style={{ marginTop: "10px" }}>
            <h5>Match the Following:</h5>
            {matchLeft.map((leftItem, index) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  marginBottom: "20px",
                }} >
                <div style={{ display: "flex", marginBottom: "10px" }}>
                  <input
                    type="text"
                    value={leftItem}
                    onChange={(e) =>
                      handleMatchChange(index, e.target.value, "left")
                    }
                    placeholder={`Question ${index + 1}`}
                    className="form-control mx-1"
                    style={{ width: "200px" }}/>
                  <input
                    type="text"
                    value={matchRight[index] || ""}
                    onChange={(e) =>
                      handleMatchChange(index, e.target.value, "right")
                    }
                    placeholder={`Answer ${index + 1}`}
                    className="form-control mx-1"
                    style={{ width: "200px" }}/>
                  <button
                    onClick={() => removeMatchPair(index)}
                    className="btn btn-danger btn-sm mx-1">
                    Remove
                  </button>
                </div>
                <div style={{ marginTop: "10px" }}>
                  <label>Feedback for Pair {index + 1}:</label>
                  <JoditEditor
                    className="fc1"
                    value={matchFeedback[index]?.feedback || ""} // Controlled value as a string
                    config={{ readonly: false, toolbar: true }}
                    onBlur={
                      (newContent) =>
                        handleMatchFeedbackChange(index, newContent) // Store feedback
                    }
                  />
                </div>
              </div>
            ))}
            <button onClick={addMatchPair} className="btn btn-secondary mt-2">
              <FaPlus /> Add Pair
            </button>
          </div>
        )}
        {questionType === "multiple_choice" && (
          <div style={{ marginTop: "10px" }}>
            {options.map((optionObj, index) => (
              <div key={index} style={{ marginBottom: "20px" }}>
                <label htmlFor={`option${index + 1}`} className="labelcourse">
                  Option {index + 1}:
                </label>
                <div className="d-flex justify-content-around">
                <input
                  type="text"
                  placeholder={`Option ${String.fromCharCode(65 + index)}`} // A, B, C, D, etc.
                  value={optionObj.option}
                  onChange={(e) =>
                    handleOptionChange(index, "option", e.target.value)}/>
                 
                  </div> 
                  <label className="my-1 labelcourse">Negative Mark</label>
                  <div className="d-flex">
                  <label className="form-check-label" htmlFor="negativeMarkYes">
          <input
            className="custom-radio mx-2"
            type="radio"
            id="negativeMarkYes"
            name="negativeMark"
            value="yes"
            checked={isNegativeMark}
            onChange={handleNegativeMarkChange}/>
            Yes
          </label>
          <label className="form-check-label" htmlFor="negativeMarkNo">
          <input
            className="custom-radio mx-2"
            type="radio"
            id="negativeMarkNo"
            name="negativeMark"
            value="no"
            checked={!isNegativeMark}
            onChange={handleNegativeMarkChange}/>
            No
          </label> 
                  </div>
                  <div className="form-group">
      <div className="d-flex align-items-center">
        
      </div>

      {isNegativeMark && (
        <div className="mt-3"> 
          <input
            type="number"
            className="form-control w-25"
            placeholder="Enter negative mark value"
            min="0"
            value={negativeMarkValue}
            onChange={(e) => setNegativeMarkValue(e.target.value)} />  
        </div>
      )}
    </div>
     <button
                  className="my-3 feedbackbtn rounded-2 p-2"
                  onClick={() => toggleFeedback(index)} >
                  {showFeedback[index] ? "Hide Feedback" : "Add Feedback"}
                </button>
                {showFeedback[index] && (
                  <div className="feedback" style={{ marginTop: "10px" }}>
                    <label>Feedback for Option {index + 1}:</label>
                    <JoditEditor
                      className="fc1"
                      value={optionObj.feedback}
                      config={{
                        readonly: false,
                        toolbar: true,
                      }}
                      onBlur={(newContent) =>
                        handleOptionChange(index, "feedback", newContent)
                      }/>
                  </div>
                )}
              </div>
            ))}

       
            <div className="add-option-btn mt-3">
              <button className="btn btn-outline-danger" onClick={addOption}>
                <FaPlus /> Add Option
              </button>
            </div>

            <div style={{ marginTop: "10px", marginBottom: "10px" }}>
              <label className="labelcourse">Select Correct Option</label>{" "}
              &nbsp;
              <select
                value={correctOption}
                onChange={(e) => setCorrectOption(e.target.value)} >
                <option>Select Correct Option</option>
                {options.map(
                  (option, index) =>
                    option.option.trim() && (
                      <option key={index} value={option.option}>
                        {option.option}
                      </option>
                    )
                )}
              </select>
            </div>
          </div>
        )}

        {questionType === "description" && (
          <div style={{ marginTop: "20px" }}>
            <h5>Keywords</h5>
            {keywords.map((keyword, index) => (
              <div key={index} style={{ marginBottom: "20px" }}>
                <label>Keyword {index + 1}:</label>
                <input
                  type="text"
                  value={keyword.keyword}
                  onChange={(e) =>
                    handleKeywordChange(index, "keyword", e.target.value)
                  }
                  style={{ marginLeft: "10px" }} />
                <label style={{ marginLeft: "20px" }}>Marks:</label>
                <input
                  type="text"
                  value={keyword.marks}
                  onChange={(e) =>
                    handleKeywordChange(index, "marks", e.target.value)
                  }
                  style={{ marginLeft: "10px" }}
                />

                {/* Feedback for each keyword */}
                <div style={{ marginTop: "10px" }}>
                  <label>Feedback:</label>
                  <JoditEditor
                    className="fc1"
                    value={keyword.feedback}
                    config={{ readonly: false, toolbar: true }}
                    onBlur={(newContent) =>
                      handleKeywordChange(index, "feedback", newContent)
                    }/>
                </div>

                <button
                  className="btn btn-danger btn-sm mt-2"
                  onClick={() => removeKeyword(index)}>
                  {" "}
                  Remove
                </button>
              </div>
            ))}

            <div className="mt-3">
              <button className="btn btn-outline-primary" onClick={addKeyword}>
                <FaPlus /> Add Keyword
              </button>
            </div>
          </div>
        )}

        <div className="col-sm-12 col-md-6 mt-4">
          <button
            className="btn"
            style={{ color: "#fff", backgroundColor: "#291571" }}
            onClick={handleSubmit}>
            Submit Question
          </button>
        </div>
      </div>
    </div>
  );
};

export default Question;
