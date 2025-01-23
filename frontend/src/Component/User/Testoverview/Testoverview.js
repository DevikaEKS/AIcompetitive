import React, { useState } from 'react';
import './Testoverview.css'; 
import { Link } from 'react-router-dom';
import testimg from "../../../Asset/Taketest.png";
function Testoverview() {
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);

  const toggleAccordion = () => {
    setIsAccordionOpen(!isAccordionOpen);
  };

  return (
    <div className="container-fluid testoverviewpage">
      {/* Accordion Menu for Small Devices */}
      <div className="accordion-menu d-lg-none">
        <button className="accordion-toggle" onClick={toggleAccordion}>
          Menu
        </button>
        {isAccordionOpen && (
          <div className="accordion-content">
         
            <Link to="#sbi-clerk">SBI Clerk</Link>
            <Link to="#sbi-cbo">SBI CBO</Link>
            <Link to="#ibps-po">IBPS PO</Link>
          </div>
        )}
      </div>

      <div className="row">
        {/* Sidebar for Large Devices */}
        <div className="col-lg-2 sidebar1 d-none d-lg-block mx-4">
          <a href="#sbi-clerk">SBI Clerk</a>
          <a href="#sbi-cbo">SBI CBO</a>
          <a href="#ibps-po">IBPS PO</a>
        </div>

        {/* Content Section */}
        <div className="col-lg-8 contentpart">
          <h3 id="sbi-clerk">SBI Clerk</h3>
          <p>The SBI Clerk Exam is held annually by the State Bank of India to recruit candidates for the position of Junior Associate (Customer Support and Sales) in its branches across the country. The SBI Clerk exam is highly sought after, attracting a large number of candidates each year. In 2024, the State Bank of India will conduct both the Prelims and Mains examinations for the SBI Clerk to shortlist candidates for available vacancies. This year, the SBI Clerk Notification 2024 is expected to be released in December 2024, along with complete details regarding the recruitment exam.</p>
          <p>The SBI Clerk (Junior Associate) is responsible for all client interactions and related operations. Candidates who are recruited as SBI clerks are designated as cashiers, depositors and other posts that form the face of a particular SBI Bank branch. Here, in this article, we'll talk about the SBI Clerk 2024 Exam, Important Dates, Online Form, Exam Pattern, Syllabus, Salary & more.</p>

<h3>SBI Clerk 2024 Notification</h3>
<p>The SBI Clerk Notification 2024 PDF for Junior Associates (Customer Support and Sales) posts will be released by the State Bank of India at https://sbi.co.in/web/careers in the month of December 2024. Candidates who are interested in Junior Associate posts in the clerical cadre must go through the notification pdf link when released officially. Till then the candidates can have a look at the SBI Clerk Notification PDF of last year for more information by clicking the below link.</p>

<h3>SBI Clerk 2024 Exam Summary</h3>
<p>The selection of the eligible candidates will be done through a two-stage selection process- Preliminary Exam and Mains Exam. State Bank of India (SBI) will announce huge number of vacancies of Clerk (Junior Associates) posts to be filled for the recruitment year 2024. </p>

<div className="row sampletestarea p-2 my-4 mx-2">

  <div className="col-sm-12 col-md-6 d-flex justify-content-center align-items-center">
    <img src={testimg} alt="Test Image" />
  </div>

  <div className="col-sm-12 col-md-6 d-flex justify-content-center align-items-center">
    <div className="text-center">
      <h4>Ready to Test Your Skills? Take a Free Sample Test!</h4>
     <Link to={"/terms"}><button className="Taketestbtn mt-3 rounded-5 p-3">Take Test</button></Link> 
    </div>
  </div>
</div>



<h3>SBI Clerk 2024 Important Dates</h3>
<p>The dates for prelims and mains examination for the SBI Clerk Exam will be released with official SBI Clerk Notification 2024. Candidates must keep visiting this page regularly to stay updated about the important updates for the SBI Clerk 2024 Exam. It is expected that SBI Clerk Notification can be released in the beginning of December 2024. </p>


<h3>SBI Clerk 2024 Important Dates</h3>
<table className='tablearea w-100 rounded-5'>
    
    <thead >
    <tr><th colSpan={2}>SB1 Clerk 2024 Important Dates</th></tr>
        <tr className='bg-light'>
            <th>Events</th>
            <th>SBI Clerk 2024 Dates</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>SBI Clerk Notification 2024</td>
            <td>Dec 2024 Dynamic</td>
        </tr>
        <tr>
            <td>SBI Clerk Notification 2024</td>
            <td>Dec 2024 Dynamic</td>
        </tr>
        <tr>
            <td>SBI Clerk Notification 2024</td>
            <td>Dec 2024 Dynamic</td>
        </tr>
    </tbody>
</table>
          {/* <h2 id="sbi-cbo">SBI CBO</h2>
          <p>SBI CBO details...</p>

          <h2 id="ibps-po">IBPS PO</h2>
          <p>IBPS PO details...</p> */}
        </div>
      </div>
    </div>
  );
}

export default Testoverview;
