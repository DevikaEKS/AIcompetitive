import React, { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableRow, Checkbox, Button } from '@mui/material';
import axios from 'axios';

function AIpart() {
  const [selectedRows, setSelectedRows] = useState([]);
  const[courses,setCourses]=useState("")
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}course/getcourse`)
      .then((res) => setCourses(res.data.result))
      .catch((error) => {
        alert("Failed to fetch courses!");
        console.error(error);
      });
  }, []);

  const [rows, setRows] = useState([
    { id: 1, name: 'John', age: 30},
    { id: 2, name: 'Jane', age: 25},
    { id: 3, name: 'Sam', age: 35},
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

  return (
    <div className='container'>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              <Checkbox
                checked={isAllSelected}
                onChange={handleSelectAll}
                indeterminate={selectedRows.length > 0 && selectedRows.length < rows.length}/>
            </TableCell>
            <TableCell>Course</TableCell>
            <TableCell>Age</TableCell>
            <TableCell>City</TableCell>
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
              <TableCell>{row.age}</TableCell>
              <TableCell>{row.city}</TableCell>
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
  );
}

export default AIpart;
