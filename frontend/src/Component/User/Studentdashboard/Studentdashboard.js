import React, { useState } from 'react';
import "./Studentdashboard.css";
import { Link, useParams } from 'react-router-dom';

function StudentDashboard() {
    const { user_id} = useParams();
  const [selectedContent, setSelectedContent] = useState('pastPaper');


  const tableData = {
    pastPaper: [
      { sno: 1, year: '2023', month: 'January', score: '-', examName: 'SBI BPO' },
      { sno: 2, year: '2022', month: 'February', score: '90', examName: 'SBI BPO' },
      { sno: 1, year: '2023', month: 'January', score: '-', examName: 'SBI BPO' },
      { sno: 2, year: '2022', month: 'February', score: '90', examName: 'SBI BPO' },
      { sno: 1, year: '2023', month: 'January', score: '-', examName: 'SBI BPO' },
      { sno: 2, year: '2022', month: 'February', score: '90', examName: 'SBI BPO' },
      
    ],
    mockTest: [
      { sno: 1, year: '2023', month: 'March', score: '-', examName: 'Mock Test A' },
      { sno: 2, year: '2023', month: 'April', score: '85', examName: 'Mock Test B' },
    ],
    modulePractise: [
      { sno: 1, year: '2024', month: 'May', score: '-', examName: 'Module 1' },
      { sno: 2, year: '2024', month: 'June', score: '88', examName: 'Module 2' },
    ],
  };

  return (
    <div className='container-fluid p-0 m-0 '>
      {/* Collapsible Navbar for Small Devices */}
      <nav className="navbar navbar-expand-lg navbar-dark navbarstudent d-block d-md-none mb-4">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">Dashboard</a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse " id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="nav-link text-light" href="#">Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-link text-light" href="#">Payment Status</a>
              </li>
              <li className="nav-item">
                <a className="nav-link text-light" href="#">Settings</a>
              </li>
              <li className="nav-item">
                <a className="nav-link text-light" href="#">Notifications</a>
              </li>
              <li className="nav-item">
                <a className="nav-link text-light" href="#">Profile</a>
              </li>
              <li className="nav-item">
                <a className="nav-link text-light" href="#">Logout</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
  
      <div className='row py-3 py-md-3 my-2 my-md-5 mx-0 mx-md-3'>
        <h2 className='text-center pb-5 dashhead'>Dashboard</h2>
        {/* Sidebar for larger screens */}
        <div className='col-sm-2 d-none d-md-block sidebardash py-4'>
            <Link  to={`/banner/${user_id}`} className='text-light text-decoration-none d-block p-2'>Home</Link>
            <Link to="" className='text-light text-decoration-none d-block p-2'>Payment Status</Link>   
          <Link to="" className='text-light text-decoration-none d-block p-2' href="#">Settings</Link>
          <Link to="" className='text-light text-decoration-none d-block p-2' href="#">Notification</Link>
          <Link to="" className='text-light text-decoration-none d-block p-2' href="#">Profile</Link>
          <Link to="/" className='text-light text-decoration-none d-block p-2' href="#">Logout</Link>
        </div>

        {/* Main Content */}
        <div className='col-sm-10'>
          <div className='d-flex justify-content-center'>
            {/* Navigation Options */}
            <button
              className='mx-3 paperbtn px-3 py-2 rounded-3'
              style={{ cursor: 'pointer', color: selectedContent === 'pastPaper' ? 'blue' : 'black' }}
              onClick={() => setSelectedContent('pastPaper')}>Past Paper</button>
            <button
              className='mx-3 paperbtn px-3 py-2 rounded-3'
              style={{ cursor: 'pointer', color: selectedContent === 'mockTest' ? 'blue' : 'black' }}
              onClick={() => setSelectedContent('mockTest')}>Mock Test</button>
            <button
              className='mx-3 paperbtn px-3 py-2 rounded-3'
              style={{ cursor: 'pointer', color: selectedContent === 'modulePractise' ? 'blue' : 'black' }}
              onClick={() => setSelectedContent('modulePractise')}>Module Practise</button>
          </div>

          {/* Display the selected table */}
          <div className='mt-4 rounded-4'>
            <table className='table studtable'>
              <thead>
                <tr>
                  <th>S.NO</th>
                  <th>Year</th>
                  <th>Month</th>
                  <th>Score</th>
                  <th>Exam Name</th>
                </tr>
              </thead>
              <tbody>
                {tableData[selectedContent].map((item) => (
                  <tr key={item.sno}>
                    <td>{item.sno}</td>
                    <td>{item.year}</td>
                    <td>{item.month}</td>
                    <td>{item.score}</td>
                    <td>{item.examName}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentDashboard;
