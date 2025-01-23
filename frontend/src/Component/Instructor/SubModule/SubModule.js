import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useParams } from "react-router-dom";
import "./SubModule.css";

function SubModule() {
  const [courses, setCourses] = useState([]);
  const [modules, setModules] = useState([]);
  const [courseid, setCourseId] = useState(0);
  const [moduleid, setModuleId] = useState(0);
  const [submodulename, setSubmoduleName] = useState("");
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

  const handleCourseChange = (event) => {
    setCourseId(event.target.value);
    setModuleId(0); // Reset selected module when course changes
  };

  const handleModuleChange = (event) => {
    setModuleId(event.target.value);
  };

  const handleSubmoduleNameChange = (event) => {
    setSubmoduleName(event.target.value);
  };

  const handleSubmit = () => {
    if (!courseid || !moduleid || !submodulename) {
      toast.error("Please select a course, module, and enter a submodule name.");
      return;
    }

    const payload = { courseid, moduleid, submodulename };
    console.log(payload);
    
    axios
      .post(`${process.env.REACT_APP_API_URL}course/addsubmodule`, payload)
      .then((res) => {
        console.log(res);
        toast.success("Submodule added successfully!");
        setSubmoduleName(""); // Clear the input after submission
      })
      .catch((error) => {
        toast.error("Failed to add submodule!");
        console.error(error);
      });
  };

  return (
    <div className="container-fluid">
      <ToastContainer />
      <h3 className="text-center my-2 headinginstructor">Add Sub Module</h3>
      <div className="modpart p-3">
      <div className="form-group">
        <div className="form-group-inner">
        <label htmlFor="courseSelect" className="labelcourse">Select Course</label>
        <select
          id="courseSelect"
          className="form-control fc1 rounded-0"
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
            className="form-control fc1 rounded-0"
            value={moduleid}
            onChange={handleModuleChange} >
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

      {moduleid > 0 && (
        <div className="form-group mt-3">
          <div className="form-group-inner">
          <label htmlFor="submoduleInput" className="labelcourse">Submodule Name</label>
          <input
            type="text"
            id="submoduleInput"
            className="form-control fc1"
            value={submodulename}
            onChange={handleSubmoduleNameChange}
            placeholder="Enter submodule name"
          />
        </div>
        </div>
      )}

      <button
        className="btn btn-primary mt-3"
        onClick={handleSubmit}
        disabled={!courseid || !moduleid || !submodulename}
      >
        Add Submodule
      </button>
    </div>
    </div>
  );
}

export default SubModule;
