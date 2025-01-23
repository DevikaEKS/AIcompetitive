// import React, { useEffect, useState } from 'react';
// import './Enrolled.css';
// import examimg from '../Asset/exam4.png';
// import axios from 'axios';

// function Enrolled() {
//   const [examnames, setExamnames] = useState([]);
//   const [examdata, setExamData] = useState([])


//   useEffect(() => {
//     axios
//       .get(`${process.env.REACT_APP_API_URL}course/getallcourse`)
//       .then((res) => {
//         console.log(res.data);
//         setExamData([]); // Save all courses
//       })
//       .catch((err) => {
//         console.log("Error fetching courses:", err);
//       });
//   }, []);

//   return (
//     <div className='bannerpage'>
//     <div className="container m-0" id="sapbanner">
//       <div className="row py-5">
//         {examdata.map((e, index) => (
//           <div className="col-sm-12 col-md-3" key={index}>
//             <div className="exampart d-flex justify-content-center align-items-center">
//               {/* <div className="exampart1 d-flex justify-content-center align-items-center">
//                 <img src={e.course_image} alt={e.examname} />
//               </div> */}
//             </div>
//             <p className="text-center py-2 examnames">{e.coursename}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//     </div>
//   );
// }

// export default Enrolled;



import React, { useEffect, useState } from 'react';
import './Enrolled.css';
import examimg from '../Asset/exam4.png'; // If you want to use this image as a fallback
import axios from 'axios';
import { Link } from 'react-router-dom';

function Enrolled() {
  const [examnames, setExamnames] = useState([]); 
  const [examdata, setExamData] = useState([]);

  // useEffect(() => {
  //   axios
  //     .get(`${process.env.REACT_APP_API_URL}course/getallcourse`)
  //     .then((res) => {
  //       console.log(res.data);
  //       setExamData(res.data); // Save the fetched courses into the state
  //     })
  //     .catch((err) => {
  //       console.log("Error fetching courses:", err);
  //     });
  // }, []);

  return (
    <div className="bannerpage">
      <div className="container m-0" id="sapbanner">
        <div className="row py-5">  
          {examdata.map((e, index) => (
            <div className="col-sm-12 col-md-3 p-3" key={index}>
              <Link to="/en">
              <div className='exampartmain'>
              <div className="exampart1 d-flex justify-content-center align-items-center">
                {/* If you have an image for the course, use it here */}
                <img src={e.course_image || examimg} alt={e.coursename} className="img-fluid" />
                <p>{e.certificate_id}</p>
              </div>
              </div>
              </Link>
              <div className='d-flex flex-column justify-content-center align-items-center'>
              <button className='enrolledbt py-2 px-2'>Enrolled</button>
              </div>
             
              <p className="text-center py-2 examnames">{e.coursename}</p>
            </div>
            
          ))}
        </div>
      </div>
    </div>
  );
}

export default Enrolled;
