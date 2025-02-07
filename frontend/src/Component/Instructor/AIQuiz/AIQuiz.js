import React, { useState, useEffect, useRef } from "react";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios"; 
function AIQuiz() {
     const [courses, setCourses] = useState([]);
     const [courseid, setCourseId] = useState(0);
     const [moduleid, setModuleId] = useState(0);
     const [modules, setModules] = useState([]);
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

      
  const handleCourseChange = (event) => {
    setCourseId(event.target.value);
    setModuleId(0); // Reset selected module when course changes
  };
  
  const handleModuleChange = (event) => {
    setModuleId(event.target.value);
  };

  return (
    <div className='container-fluid'>
              <h3 className="text-center headinginstructor">AI Quiz</h3> 
    <div className='modpart'>
     <form>
     <div className="w-100">
     <div className="form-group">
        <div className='form-group-inner'>
         <label htmlFor="courseSelect" className="labelcourse">Select Category</label>
        <select
                id="courseSelect"
                className="form-control rounded-0">
                <option value={0} disabled>
                  Select a category
                </option> 
              </select>
        </div>
        </div>

        <div className="form-group">
        <div className='form-group-inner'>
         <label htmlFor="courseSelect" className="labelcourse">Select Subcategory</label>
        <select
                id="courseSelect"
                className="form-control rounded-0">
                <option value={0} >
                  Select subcategory
                </option> 
              </select>
        </div>
        </div>

        <div className="form-group">
        <div className='form-group-inner'>
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


        <div className="form-group">
        <div className='form-group-inner'>
         <label htmlFor="courseSelect" className="labelcourse">Select SubModule</label>
        <select
                id="courseSelect"
                className="form-control rounded-0">
                <option value={0} disabled>
                  Select a SubModule
                </option> 
              </select>
        </div>
        </div>
        </div>
        
        <div className="form-group">
        <div className='form-group-inner'>
         <label htmlFor="courseSelect" className="labelcourse">Select Difficulty Level</label>
        <select
                id="courseSelect"
                className="form-control rounded-0">
                <option value={0} disabled>
                  Select the difficulty level
                </option> 
                <option value={1}>
                  Easy
                </option> 
                <option value={2}>
                 Medium
                </option> 
                <option value={3}>
                  Hard
                </option> 
              </select>
        </div>
        </div>

        <div className="form-group">
        <div className='form-group-inner'>
         <label htmlFor="courseSelect" className="labelcourse">Select Total Number of Questions</label>
        <input type='number'/>
        </div>
        </div>

        <button
            className="btn"
            style={{ color: "#fff", backgroundColor: "#291571" }}>
            Submit Question
          </button>

        </form>   
    </div>
    </div>
  )
}

export default AIQuiz