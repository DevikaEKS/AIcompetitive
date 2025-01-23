// import React from 'react';
// import { useNavigate, useParams } from 'react-router-dom';

// function Starttest() {
//   const navigate = useNavigate(); // Initialize the navigate function
//   const { id, course, quizTypeId } = useParams();
//   const handleStartTest = (quizTypeId) => {
//      navigate(`/quizattempt/${id}/${course}/${quizTypeId}`); 
//   };

//   return (
//     <div className='container p-1 p-md-5 mx-0 mx-md-5 testoverviewpage'>
//       <div className='d-flex flex-column justify-content-center align-items-center'>
//         <h3 className='py-3 '>Here’s the Format for the Sample Test.</h3>
//         <p className='text-center'>
//           Dive in to assess your knowledge, reinforce your learning, and ensure you're well-prepared. Answer all the questions to gain comprehensive insights into the topics covered.
//         </p>
//         <table className='w-100 tablearea my-4'>
//           <thead>
//             <tr className='bg-light '>
//               <th>Section</th>
//               <th>No of Questions</th>
//               <th>Total Marks</th>
//               <th>Duration</th>
//             </tr>
//           </thead>
//           <tbody>
//             <tr>
//               <td>English Language</td>
//               <td>10</td>
//               <td>20</td>
//               <td>5 minutes</td>
//             </tr>
//             <tr>
//               <td>English Language</td>
//               <td>10</td>
//               <td>20</td>
//               <td>5 minutes</td>
//             </tr>
//             <tr>
//               <td>English Language</td>
//               <td>10</td>
//               <td>20</td>
//               <td>5 minutes</td>
//             </tr>
//           </tbody>
//           <tfoot>
//             <tr>
//               <td>Total</td>
//               <td>20</td>
//               <td>30</td>
//               <td>30 Minutes</td>
//             </tr>
//           </tfoot>
//         </table>

//         <h5>Start the Sample Test Now and Take a Step Closer to Your Dream Job!</h5>
//         <button
//           className='Taketestbtn rounded-5 py-2 px-4 my-4'
//           onClick={handleStartTest} 
//         >
//           Start Test
//         </button>
//       </div>
//     </div>
//   );
// }

// export default Starttest;




import React from 'react'; 
import { useNavigate, useParams } from 'react-router-dom';

function Starttest() {
  const navigate = useNavigate(); // Initialize the navigate function
  const { id, course,quizTypeId } = useParams(); // Destructure only `id` and `course` from params

  // Function to handle test start
  const handleStartTest = (quizTypeId) => {
   
    navigate(`/quizattempt/${id}/${course}/${quizTypeId}`); 
  };

  return (
    <div className='container p-1 p-md-5 mx-0 mx-md-5 testoverviewpage'>
      <div className='d-flex flex-column justify-content-center align-items-center'>
        <h3 className='py-3 '>Here’s the Format for the Sample Test.</h3>
        <p className='text-center'>
          Dive in to assess your knowledge, reinforce your learning, and ensure you're well-prepared. Answer all the questions to gain comprehensive insights into the topics covered.
        </p>
        <table className='w-100 tablearea my-4'>
          <thead>
            <tr className='bg-light '>
              <th>Section</th>
              <th>No of Questions</th>
              <th>Total Marks</th>
              <th>Duration</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>English Language</td>
              <td>10</td>
              <td>20</td>
              <td>5 minutes</td>
            </tr>
            <tr>
              <td>English Language</td>
              <td>10</td>
              <td>20</td>
              <td>5 minutes</td>
            </tr>
            <tr>
              <td>English Language</td>
              <td>10</td>
              <td>20</td>
              <td>5 minutes</td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td>Total</td>
              <td>20</td>
              <td>30</td>
              <td>30 Minutes</td>
            </tr>
          </tfoot>
        </table>

        <h5>Start the Sample Test Now and Take a Step Closer to Your Dream Job!</h5>
        <button
          className='Taketestbtn rounded-5 py-2 px-4 my-4'
          onClick={handleStartTest} 
        >
          Start Test
        </button>
      </div>
    </div>
  );
}

export default Starttest;
