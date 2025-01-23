import React, { useState } from 'react'
import Testsidebar from '../Testsidebar/Testsidebar'
import { Outlet } from "react-router-dom";
import "./Testdashboard.css";
function Testdashboard() {
    const[isOpen,setIsOpen]=useState(false);
const toggleSidebar=()=>{
    setIsOpen(!isOpen);
}
  return (
    <div className='dashboard-container'>
        <Testsidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />
        <div className={`dashboard-content${isOpen? "expanded":"collapsed"}`}>
        <Outlet />
        </div>
    </div>
  )
}

export default Testdashboard