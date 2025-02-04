import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom'; // To access the category ID from the URL
import './Subcourse.css';

function Subcourse() {
  const [subcourse, setSubcourse] = useState([]);
  const { categoryId } = useParams();  // Destructure categoryId from the URL

  useEffect(() => {
    // Fetch subcourses based on the category ID
    axios
      .get(`http://localhost:5000/course/getcourse/${categoryId}`)
      .then((res) => setSubcourse(res.data))
      .catch((err) => console.log(err)); // Catch errors
  }, [categoryId]);  // Run the effect when categoryId changes

  return (
    <div className='container'>
      {subcourse.map((e, index) => (
        <div key={index} className='card subcoursebgcard p-2'>
          <p>{e.course_name}</p>  {/* Display subcourse name */}
        </div>
      ))}
    </div>
  );
}

export default Subcourse;
