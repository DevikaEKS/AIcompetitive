import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
function Enrolledcourses() {
  return (
    <div className="container majortest py-5">
      {/* Test Part 1 */}
      <div className="testpart my-3 p-2 rounded-3 d-flex justify-content-between align-items-center">
        <span className="px-3 d-flex align-items-center">SBI SO</span>
        <Link to="/std"><FontAwesomeIcon icon={faAngleRight} className="px-3 text-light" />
       </Link>
        
       </div>
      {/* Test Part 2 */}
      <div className="testpart my-3 p-2 rounded-3 d-flex justify-content-between align-items-center">
        <span className="px-3 d-flex align-items-center">SBI PO</span>
        <Link to="/std"><FontAwesomeIcon icon={faAngleRight} className="px-3 text-light" />
       </Link>
        
      </div>

      {/* Test Part 3 */}
      <div className="testpart my-3 p-2 rounded-3 d-flex justify-content-between align-items-center">
        <span className="px-3 d-flex align-items-center">SBI Clerk</span>
        <Link to="/std"><FontAwesomeIcon icon={faAngleRight} className="px-3 text-light" />
       </Link>
        
      </div>
    </div>
  )
}

export default Enrolledcourses