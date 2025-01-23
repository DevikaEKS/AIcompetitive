import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function TestPractice() {
  const { id, courseid } = useParams();
  const [modules, setModules] = useState([]);
  const [selectedModuleId, setSelectedModuleId] = useState(null);
  const [selectedModuleName, setSelectedModuleName] = useState("");
  const [submodules, setSubmodules] = useState([]);
  const [selectedSubmodules, setSelectedSubmodules] = useState([]);
  const [selectedLevel, setSelectedLevel] = useState(1);

  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}course/getmodules/${courseid}`)
      .then((res) => {
        setModules(res.data);
      })
      .catch((err) => {
        console.error("Error fetching modules:", err);
      });
  }, [courseid]);

  useEffect(() => {
    if (selectedModuleId) {
      axios
        .get(
          `${process.env.REACT_APP_API_URL}course/submodules/${courseid}/${selectedModuleId}`
        )
        .then((res) => {
          setSubmodules(res.data.results || []);
        })
        .catch((err) => {
          console.error("Error fetching submodules:", err);
        });
    } else {
      setSubmodules([]);
    }
  }, [selectedModuleId, courseid]);

  const handleModuleChange = (event) => {
    const selectedId = parseInt(event.target.value, 10);
    const selectedName =
      modules.find((module) => module.moduleid === selectedId)?.modulename || "";
    setSelectedModuleId(selectedId);
    setSelectedModuleName(selectedName);
  };

  const handleSubmoduleChange = (event) => {
    const submoduleId = parseInt(event.target.value, 10);
    const submoduleName =
      submodules.find((sub) => sub.submodule_id === submoduleId)?.submodulename || "";
  
    setSelectedSubmodules((prev) => {
      // Check if the submodule is already selected
      const alreadySelected = prev.find((sub) => sub.id === submoduleId);
      if (!alreadySelected) {
        return [...prev, { id: submoduleId, name: submoduleName }];
      }
      return prev; // If already selected, do nothing
    });
  
    // Reset the dropdown selection to default
    event.target.value = "";
  };
  

  const handleRemoveSubmodule = (id) => {
    setSelectedSubmodules((prev) =>
      prev.filter((submodule) => submodule.id !== id)
    );
  };

  const handleLevelChange = (event) => {
    setSelectedLevel(parseInt(event.target.value, 10));
  };

  const handleSubmit = () => {
    const submoduleIds = selectedSubmodules.map((sub) => sub.id);

    const payload = {
      user_id: id,
      submodule_id: submoduleIds,
      difficulty_level: selectedLevel,
    };

    axios
      .post(`${process.env.REACT_APP_API_URL}quiz/practicetest`, payload)
      .then((res) => {
        if (res.data.message === "Data inserted successfully") {
          const insertId = res.data.result.insertId;
          navigate(`/userpart/${id}/quiz/${insertId}`);
        } else {
          alert(res.data.message || "Error submitting data");
        }
      })
      .catch((err) => {
        console.error("Error submitting data:", err);
      });
  };

  return (
    <div className="p-3 modpart">
      <div className="form-group">
        <div className="form-group-inner">
        <label htmlFor="module-select">Select a Module</label>
        <select
          id="module-select"
          className="form-control"
          onChange={handleModuleChange}
          defaultValue="">
          <option value="" disabled>
            Select Module
          </option>
          {modules.map((module) => (
            <option key={module.moduleid} value={module.moduleid}>
              {module.modulename}
            </option>
          ))}
        </select>
      </div>
      </div>
      {selectedModuleId && submodules.length > 0 && (
  <div className="form-group">
    <div className="form-group-inner">
    <label htmlFor="submodule-select">Select a Submodule</label>
    <select
      id="submodule-select"
      className="form-control"
      onChange={handleSubmoduleChange}
      defaultValue="">
      <option value="" disabled>
        Select Submodule
      </option>
      {submodules.map((submodule) => (
        <option key={submodule.submodule_id} value={submodule.submodule_id}>
          {submodule.submodulename}
        </option>
      ))}
    </select>
  </div>
  </div>
)}

{/* {selectedSubmodules.length > 0 && (
  <div>
    <label><b>Selected Submodules</b></label>
      {selectedSubmodules.map((submodule) => (
        <table>
          <tr key={submodule.id}>
            <td>{submodule.name}{" "}</td>
            <td>
            <button
            onClick={() => handleRemoveSubmodule(submodule.id)}
            className="btn btn-danger btn-sm ml-2">
            Remove
          </button>
            </td>
          </tr>         
        </table>   
      ))}   
  </div>
)} */}

{selectedSubmodules.length > 0 && (
  <div className="mt-3">
    <label>
      <b>Selected Submodules</b>
    </label>
    <table className="table table-bordered mt-2 border-0">    
      <tbody>
        {selectedSubmodules.map((submodule) => (
          <tr key={submodule.id} className="border-0">
            <td className="border-0" style={{fontSize:"16px"}}>{submodule.name}</td>
            <td className="border-0">
              <button onClick={() => handleRemoveSubmodule(submodule.id)}className="btn btn-danger btn-sm"> Remove</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)}
      <div className="form-group">
        <div className="form-group-inner">
        <label htmlFor="level-select">Select Difficulty Level</label>
        <select
          className="form-control"
          id="level-select"
          onChange={handleLevelChange}
          value={selectedLevel}>
           <option value="" disabled>
            Select Difficulty Level
          </option>
          <option value={1}>Easy</option>
          <option value={2}>Medium</option>
          <option value={3}>Hard</option>
        </select>
      </div>
      </div>
      <button onClick={handleSubmit} className="updatebtn">
        Submit
      </button>
    </div>
  );
}

export default TestPractice;
