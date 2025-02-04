import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Testcreation.css";
import { Table, TableBody, TableCell, TableHead, TableRow, Checkbox, Button } from '@mui/material';

function Testcreation() {
  const [courses, setCourses] = useState([]);
  const [modules, setModules] = useState([]);
  const [submodules, setSubmodules] = useState([]);
  const [courseid, setCourseId] = useState(0);
  const [moduleid, setModuleId] = useState(0);
  const [submoduleid, setSubmoduleid] = useState(0);
  const [addedSubmodules, setAddedSubmodules] = useState([]);
  const [questionCounts, setQuestionCounts] = useState({}); // Tracks difficulty counts
  const [totalQuestions, setTotalQuestions] = useState();
  const [testName, setTestName] = useState("");
  const [testTiming, setTestTiming] = useState("");
  const [image, setImage] = useState(null);
  const[showTable,setShowTable]=useState(false);
  const [questionnaireType, setQuestionnaireType] = useState("Fixed");

   const [selectedRows, setSelectedRows] = useState([]);//AI Table
    const [rows, setRows] = useState([
      { id: 1, name: 'Train', age: 30 },
      { id: 2, name: 'Speed', age: 25 },
      { id: 3, name: 'Distance', age: 35 },
    ]);
  
    // Handle select all checkbox change
    const handleSelectAll = (event) => {
      if (event.target.checked) {
        setSelectedRows(rows.map((row) => row.id)); // Select all rows
      } else {
        setSelectedRows([]); // Deselect all rows
      }
    };
  
    // Handle individual row checkbox change
    const handleSelectRow = (event, rowId) => {
      if (event.target.checked) {
        setSelectedRows((prevSelectedRows) => [...prevSelectedRows, rowId]); // Add row to selected
      } else {
        setSelectedRows((prevSelectedRows) => prevSelectedRows.filter((id) => id !== rowId)); // Remove row from selected
      }
    };
  
    // Handle delete for selected rows
    const handleDeleteSelected = () => {
      const updatedRows = rows.filter((row) => !selectedRows.includes(row)); // Filter out the selected rows
      setRows(updatedRows); // Update the rows state
      setSelectedRows([]); // Reset selected rows
    };
  
    // Check if all rows are selected
    const isAllSelected = rows.length > 0 && selectedRows.length === rows.length;



  const handleQuestionCountChange = (submoduleId, level, value) => {
    setQuestionCounts((prevCounts) => {
      const updatedCounts = { ...prevCounts };
      if (!updatedCounts[submoduleId]) {
        updatedCounts[submoduleId] = { easy: 0, medium: 0, difficulty: 0 };
      }
      updatedCounts[submoduleId][level] = parseInt(value) || 0; // Safely parse the value
      return updatedCounts;
    });
  };

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}course/getcourse`)
      .then((res) => setCourses(res.data.result))
      .catch((error) => {
        toast.error("Failed to fetch courses!");
        console.error(error);
      });
  }, []);

  useEffect(() => {
    if (courseid !== 0) {
      axios
        .get(`${process.env.REACT_APP_API_URL}course/getmodules/${courseid}`)
        .then((res) => setModules(res.data))
        .catch((error) => {
          toast.error("Failed to fetch modules!");
          console.error(error);
        });
    } else {
      setModules([]);
    }
  }, [courseid]);

  useEffect(() => {
    if (moduleid !== 0){
      axios
        .get(
          `${process.env.REACT_APP_API_URL}course/submodules/${courseid}/${moduleid}`
        )
        .then((res) => {
          setSubmodules(res.data.results);
        })
        .catch((error) => {
          toast.error("Failed to fetch submodules!");
          console.error(error);
        });
    } else {
      setSubmodules([]);
    }
  }, [moduleid, courseid]);

  const handleCourseChange = (event) => {
    setCourseId(parseInt(event.target.value, 10));
    setModuleId(0);
    setSubmoduleid(0);
    setModules([]);
    setSubmodules([]);
  };
  const handleModuleSelect = (event) => {
    setModuleId(parseInt(event.target.value, 10));
    setSubmoduleid(0);
  };
  const handleSubmoduleSelect = (event) => {
    const selectedSubmoduleId = parseInt(event.target.value, 10);
    // Only proceed if a valid submodule is selected
    if (selectedSubmoduleId !== 0) {
      const submoduleToAdd = submodules.find(
        (submodule) => submodule.submodule_id === selectedSubmoduleId
      ); 
      if (submoduleToAdd) {
        const isAlreadyAdded = addedSubmodules.some(
          (submodule) => submodule.submodule_id === submoduleToAdd.submodule_id
        ); 
       
        if (isAlreadyAdded) {
          // Add submodule to the array with default question counts
          setAddedSubmodules((prev) => [
            ...prev,
            submoduleToAdd,
          ]);
          setQuestionCounts((prev) => ({
            ...prev,
            [submoduleToAdd.submodule_id]: { easy: 0, medium: 0, difficulty: 0 },
          }));
        } else {
          toast.error("Submodule already added!");
        }
      } else {
        toast.error("Submodule not found!");
      }
    } else {
      toast.error("No submodule selected!");
    }
    setSubmoduleid(0);//reset selection
  };
  ;
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

const handleSubmit = (e) => {
    e.preventDefault();
    if ((!totalQuestions) &&  (!testName)){
      toast.error("Please select Total number of questions");
      return;
    }
   
    if(!testTiming){
      toast.error("Please select Test Timing");
      return;
    }
    const calculatedTotalQuestions = Object.keys(questionCounts).reduce(
      (total, submoduleId) => {
        const submoduleCounts = questionCounts[submoduleId] || {};
        return (
          total +
          (parseInt(submoduleCounts.easy, 10) || 0) +
          (parseInt(submoduleCounts.medium, 10) || 0) +
          (parseInt(submoduleCounts.difficulty, 10) || 0)
        );
      },
      0
    );
  
    const parsedTotalQuestion = parseInt(totalQuestions, 10);
  
    // Validate if the total matches
    if (parsedTotalQuestion !== calculatedTotalQuestions) {
      alert("Total questions do not match the sum of difficulty levels.");
      return;
    }
else{
  alert("Form submitted successfully")
}
    const formData = {
      test_name: testName,
      test_timing: testTiming,
      total_questions: calculatedTotalQuestions,
      submodules: addedSubmodules.map((submodule) => ({
        submodule_id: submodule.submodule_id,
        question_count: questionCounts[submodule.submodule_id],
      })),
      image,
    };
    console.log("Form Data to Submit:", formData);
    resetForm();
  };
   // Reset the form data to empty
   const resetForm = () => {
    setCourses([]);
    setModules([]);
    setSubmodules([]);
    setCourseId(0);
    setModuleId(0);
    setSubmoduleid(0);
    setAddedSubmodules([]);
    setQuestionCounts({});
    setTotalQuestions(0);
    setTestName("");
    setTestTiming("");
    setImage(null);
    setShowTable(false);
    setQuestionnaireType("Fixed");
  };
  const handleInputChange = (type, submoduleId, value) => {  
    setQuestionCounts((prev) => {
      const updatedCounts = { ...prev };
      if (!updatedCounts[submoduleId]) {
        updatedCounts[submoduleId] = { easy: 0, medium: 0, difficulty: 0 };
      }
      if ((type === "easy")||(type==="medium")||(type==="difficulty")) {
        if (questionnaireType === "Fixed") {
          updatedCounts[submoduleId][type] = parseInt(value) || 0; // Allow numeric input for easy level in "Fixed" mode
        } else {
          updatedCounts[submoduleId][type] = value ? 1 : 0;  // checkbox logic for "Adaptive"
        }
      } else {
        updatedCounts[submoduleId][type] = value;  // For "medium" and "difficulty"
      }  
      return updatedCounts;
    });
  };
  
  const handleButtonClick = (buttonName) => {
    setShowTable(buttonName);
  };

  
  const handleQuestionnaireChange = (event) => {
    setQuestionnaireType(event.target.value);
  };
  const calculateTotalMarks = (submoduleId) => {
    const submoduleCounts = questionCounts[submoduleId];
    if (!submoduleCounts) return 0;
    const { easy, medium, difficulty } = submoduleCounts;
    return (parseInt(easy, 10) || 0) + (parseInt(medium, 10) || 0) + (parseInt(difficulty, 10) || 0);
  };

  return (
    <div className="container-fluid">
      <h3 className="text-center headinginstructor">Test Creation</h3>
      <form onSubmit={handleSubmit}>
      <div className="form-group">
            <div className="form-group-inner">
              <label className="labelcourse">Test Name</label>
              <input
                type="text"
                className="fc1"
                placeholder="Enter your Test Name"
                value={testName}
                onChange={(e) => setTestName(e.target.value)} />
            </div>
          </div>

          <div className="form-group">
            <div className="form-group-inner">
              <label className="labelcourse">Test Category</label>
              <select className="fc1 rounded-0">
                <option>Select the Test Category</option>
                <option>Government Exams</option>
                <option>Global Certifications</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <div className="form-group-inner">
              <label className="labelcourse">Test Date</label>
              <input type="datetime-local" className="fc1" required/>
            </div>
          </div>

          <div className="form-group">
            <div className="form-group-inner">
              <label className="labelcourse">Test Timing (in minutes)</label>
              <input
                type="number"
                min={1}
                className="fc1 rounded-0 border-0"
                placeholder="Enter test duration"
                value={testTiming}
                onChange={(e) => setTestTiming(e.target.value)}/>
            </div>
          </div>

          <div className="form-group">
            <div className="form-group-inner">
              <label className="labelcourse">Upload Image</label>
              <input
                type="file"
                className="border-0 fc1"
                onChange={handleFileUpload}
                accept="image/*" required/>
            </div>
          </div>

          <div className="form-group">
        <div className="form-group-inner">
          <label className="labelcourse">Course Selection</label>
          <select
            className="fc1 w-100 rounded-0"
            onChange={handleCourseChange}
            value={courseid}>
            <option value={0}>Select the course</option>
            {courses.map((course) => (
              <option key={course.id} value={course.courseid}>
                {course.coursename}
              </option>
            ))}
          </select>
        </div>
        </div>

        <div className="form-group">
          <div className="form-group-inner">
          <label className="labelcourse">Section Module</label>
          <select
            className="fc1 w-100 py-1 rounded-0"
            onChange={handleModuleSelect}
            value={moduleid || ""}>
            <option value="">Select the Module</option>
            {modules.map((module) => (
              <option key={module.moduleid} value={module.moduleid}>
                {module.modulename}
              </option>
            ))}
          </select>
        </div>
        </div>
        
        <div className="form-group">
        <div className="form-group-inner">
          <label className="labelcourse">Select Submodule</label>
          <select
            className="fc1 rounded-0"
            onChange={handleSubmoduleSelect}
            value={submoduleid}>
            <option value="0">Select Submodule</option>
            {submodules.map((submodule) => (
              <option key={submodule.submodule_id} value={submodule.submodule_id}>
                {submodule.submodulename}
              </option>
            ))}
          </select>
        </div>
        </div>
          <div className="form-group">
      <div className="form-group-inner">
      <label className="labelcourse">Mode of Generating</label> 
      <div>
        <button className="m-1 btn btn-outline-primary" onClick={() => handleButtonClick("AI")}>AI Integrated</button>
        <button className="m-1 btn btn-outline-primary" onClick={() => handleButtonClick("Past")}>Past Paper</button>
        <button className="m-1 btn btn-outline-primary" onClick={() => handleButtonClick("Manual")}>Manual Questions</button>
      </div>
      </div>
      {showTable === "AI" &&  (
        <div className="mt-3  w-100">
          <Table>
                 <TableHead>
                   <TableRow>
                     <TableCell >
                       <Checkbox
                         checked={isAllSelected}
                         onChange={handleSelectAll}
                         indeterminate={selectedRows.length > 0 && selectedRows.length < rows.length}
                          className="text-light" />
                     </TableCell>
                     <TableCell className="text-light">Topic</TableCell>
                     <TableCell  className="text-light">Difficulty Level</TableCell>
                     <TableCell  className="text-light">Number of Questions</TableCell>
                     <TableCell>
                       <Button variant="contained" color="secondary" onClick={handleDeleteSelected}>
                         Delete
                       </Button>
                     </TableCell>
                   </TableRow>
                 </TableHead>
                 <TableBody>
                   {rows.map((row) => (
                     <TableRow key={row.id}>
                       <TableCell>
                         <Checkbox
                           checked={selectedRows.includes(row.id)}
                           onChange={(event) => handleSelectRow(event, row.id)}
                         />
                       </TableCell>
                       <TableCell>{row.name}</TableCell>
                       <TableCell><select>
                       <option value="Easy">Easy</option>
                    <option value="Medium">Medium</option>
                    <option value="Hard">Hard</option>
                        </select></TableCell>
                       <TableCell><input type="number" className="w-50" min={1}/></TableCell>
                       <TableCell>
                         <Button
                           variant="contained"
                           color="secondary"
                           onClick={() => {
                             // Delete the selected row from the rows array
                             setRows((prevRows) => prevRows.filter((r) => r.id !== row.id));
                           }}>
                           Delete
                         </Button>
                       </TableCell>
                     </TableRow>
                   ))}
                 </TableBody>
               </Table>
        </div>
      )}



{showTable === "Past" &&  (
        <div className="mt-3 w-100">
          <table className="table w-100">
            <thead>
              <tr>
              <th className="text-light">Topic</th>
              <th className="text-light">Year</th>
              <th className="text-light">Difficulty Level</th>
              <th className="text-light">Number of Questions</th>
            
              <th className="text-light">Delete</th>
              </tr>
            </thead>
            <tbody>
              <tr>
              <td>Train</td>
              <td><select className="fc1 rounded-0">
                  <option value=""></option>
                  <option value=""></option>
                  </select></td>
                <td><select className="fc1 rounded-0">
                <option value="Easy">Easy</option>
                    <option value="Medium">Medium</option>
                    <option value="Hard">Hard</option>
                  </select></td>
                <td><input type="number" min={1} className="border border-2 text-dark w-50"/></td>  
                <td><button className="btn btn-danger">Delete</button></td> 
              </tr>
              <tr>  
              <td>Age</td>
              <td><select className="fc1 rounded-0">
                  <option value=""></option>
                  <option value=""></option>
                  </select></td>
                <td>
                  <select className="fc1 rounded-0">
                  <option value="Easy">Easy</option>
                    <option value="Medium">Medium</option>
                    <option value="Hard">Hard</option>
                  </select>
                </td>
                <td><input type="number" min={1} className="border border-2 w-50"/></td>
                <td><button className="btn btn-danger">Delete</button></td> 
              </tr>
            </tbody>
          </table>
        </div>
      )}

{showTable === "Manual" &&  (
        <div className="mt-3 w-100">
               {addedSubmodules.length > 0 && (
          <table className="table">
            <thead>
              <tr>
                <th className="text-light">Submodule Name</th>
                <th className="text-light">Easy</th>
                <th className="text-light">Medium</th>
                <th className="text-light">Difficulty</th>
                <th className="text-light">Total Questions</th>
                <th className="text-light">Total Marks</th>
              </tr>
            </thead>
            <tbody>
  {addedSubmodules.map((submodule) => (
  <tr key={submodule.submodule_id}>
    <td>{submodule.submodulename}</td>  
    <td>
  {questionnaireType === "Adaptive" ? (
    <input
      type="checkbox"
      className="w-50 border-2"
      checked={questionCounts[submodule.submodule_id]?.easy === 1}
      onChange={(e) => handleInputChange("easy", submodule.submodule_id, e.target.checked ? 1 : 0)}/>
  ) : (
    <input
      type="number"
      className="w-50 border-2"
      min={1}
      value={questionCounts[submodule.submodule_id]?.easy || 0}
      onChange={(e) => handleInputChange("easy", submodule.submodule_id, e.target.value)}
    />
  )}
</td>
<td>
      {questionnaireType === "Adaptive" ? (
        <input
          type="checkbox"
          className="w-50 border-2"
          checked={questionCounts[submodule.submodule_id]?.medium === 1}
          onChange={(e) => handleInputChange("medium", submodule.submodule_id, e.target.checked)}/>
      ) : (
        <input
          type="number"
          className="w-50 border-2"
          min={1}
          value={questionCounts[submodule.submodule_id]?.medium || 0}
          onChange={(e) => handleInputChange("medium", submodule.submodule_id, e.target.value)}/>
      )}
    </td>
    <td>
    {questionnaireType === "Adaptive" ? (
        <input
          type="checkbox"
          className="w-50 border-2"
          checked={questionCounts[submodule.submodule_id]?.difficulty === 1}
          onChange={(e) => handleInputChange("difficulty", submodule.submodule_id, e.target.checked)} />
      ) : (
        <input
          type="number"
          className="w-50 border-2"
          min={1}
          value={questionCounts[submodule.submodule_id]?.difficulty || 0}
          onChange={(e) => handleInputChange("difficulty", submodule.submodule_id, e.target.value)}/>
      )}
    </td>
   
    <td>
      {/* Calculate Total Marks for this submodule */}
      <input
        type="number"
        className="w-50 border-2"
        value={calculateTotalMarks(submodule.submodule_id)}
        readOnly />
    </td>
    <td><input type="number" className="border-2"/></td>
  </tr>
))}

<tr>
  <td>Questions</td>
  <td colSpan={4}></td>
  <td>
  <input
  type="number"
  className="border-2 bd1"
  value={Object.keys(questionCounts).reduce((total, submoduleId) => {
    const submoduleCounts = questionCounts[submoduleId];
    const totalMarks =
      (parseInt(submoduleCounts.easy, 10) || 0) +
      (parseInt(submoduleCounts.medium, 10) || 0) +
      (parseInt(submoduleCounts.difficulty, 10) || 0);
    return total + totalMarks;
  }, 0)}
  readOnly/>
  </td> 
</tr>
   </tbody>
          </table>
        )} 
          {/* <table className="table">
            <thead>
              <tr>
              <th className="text-light">Topic</th>
              <th className="text-light">Difficulty Level</th>
              <th className="text-light">Number of Questions</th>
              <th className="text-light">
    <div className="d-flex flex-start">
      <input type="checkbox"/>
      <label className="mb-0">Delete</label>
    </div>
  </th>
              </tr>
            </thead>
            <tbody>
              <tr>
              <td>Train</td>
                <td><select className="fc1 rounded-0">
                    <option>Easy</option>
                    <option>Medium</option>
                    <option>Hard</option>
                   </select></td>
                <td><input type="number" min={1} className="border border-3 text-dark w-25"/></td> 
                <td><button className="btn btn-danger">Delete</button></td>   
              </tr>
              <tr>  
              <td>Age</td>
                <td>
                  <select className="fc1 rounded-0">
                    <option>Easy</option>  
                    <option>Medium</option>
                    <option>Hard</option>
                  </select>
                </td>
                <td><input type="number" min={1} className="w-25 border border-2"/></td> 
                <td><button className="btn btn-danger">Delete</button></td>          
              </tr>
            </tbody>
          </table> */}
        </div>
      )}
      </div>

      <div className="form-group">
  <div className="form-group-inner">
    <label className="labelcourse">Total Number of Questions</label>
    <input
      type="number"
      min={1}
      className="fc1 bd2"
      placeholder="Enter the total number of Questions"
      required
      value={totalQuestions} onChange={(e) => setTotalQuestions(parseInt(e.target.value) || 0)} />
  </div>
</div>
      <div className="form-group">
  <div className="form-group-inner">
    <label className="labelcourse">Questionnaire</label>
    <select value={questionnaireType} onChange={handleQuestionnaireChange} className="fc1 rounded-0">
      <option value="Adaptive">Adaptive</option>
      <option value="Fixed">Fixed</option>
    </select>
  </div>
</div>
        
     
        {/* {addedSubmodules.length > 0 && (
          <table className="table">
            <thead>
              <tr>
                <th className="text-light">Submodule Name</th>
                <th className="text-light">Easy</th>
                <th className="text-light">Medium</th>
                <th className="text-light">Difficulty</th>
                <th className="text-light">Total Questions</th>
                <th className="text-light">Total Marks</th>
              </tr>
            </thead>
            <tbody>
  {addedSubmodules.map((submodule) => (
  <tr key={submodule.submodule_id}>
    <td>{submodule.submodulename}</td>  
    <td>
  {questionnaireType === "Adaptive" ? (
    <input
      type="checkbox"
      className="w-50 border-2"
      checked={questionCounts[submodule.submodule_id]?.easy === 1}
      onChange={(e) => handleInputChange("easy", submodule.submodule_id, e.target.checked ? 1 : 0)}/>
  ) : (
    <input
      type="number"
      className="w-50 border-2"
      min={1}
      value={questionCounts[submodule.submodule_id]?.easy || 0}
      onChange={(e) => handleInputChange("easy", submodule.submodule_id, e.target.value)}
    />
  )}
</td>
<td>
      {questionnaireType === "Adaptive" ? (
        <input
          type="checkbox"
          className="w-50 border-2"
          checked={questionCounts[submodule.submodule_id]?.medium === 1}
          onChange={(e) => handleInputChange("medium", submodule.submodule_id, e.target.checked)}/>
      ) : (
        <input
          type="number"
          className="w-50 border-2"
          min={1}
          value={questionCounts[submodule.submodule_id]?.medium || 0}
          onChange={(e) => handleInputChange("medium", submodule.submodule_id, e.target.value)}/>
      )}
    </td>
    <td>
    {questionnaireType === "Adaptive" ? (
        <input
          type="checkbox"
          className="w-50 border-2"
          checked={questionCounts[submodule.submodule_id]?.difficulty === 1}
          onChange={(e) => handleInputChange("difficulty", submodule.submodule_id, e.target.checked)} />
      ) : (
        <input
          type="number"
          className="w-50 border-2"
          min={1}
          value={questionCounts[submodule.submodule_id]?.difficulty || 0}
          onChange={(e) => handleInputChange("difficulty", submodule.submodule_id, e.target.value)}/>
      )}
    </td>
   
    <td>
     
      <input
        type="number"
        className="w-50 border-2"
        value={calculateTotalMarks(submodule.submodule_id)}
        readOnly />
    </td>
    <td><input type="number" className="border-2"/></td>
  </tr>
))}

<tr>
  <td>Questions</td>
  <td colSpan={4}></td>
  <td>
  <input
  type="number"
  className="border-2 bd1"
  value={Object.keys(questionCounts).reduce((total, submoduleId) => {
    const submoduleCounts = questionCounts[submoduleId];
    const totalMarks =
      (parseInt(submoduleCounts.easy, 10) || 0) +
      (parseInt(submoduleCounts.medium, 10) || 0) +
      (parseInt(submoduleCounts.difficulty, 10) || 0);
    return total + totalMarks;
  }, 0)} */}
  {/* readOnly/>
  </td> 
</tr>
   </tbody>
          </table>
        )}    */}
        <input type="submit"  className="updatebtn border-0"/>
      </form>
      <ToastContainer />
    </div>
  );
}

export default Testcreation;
