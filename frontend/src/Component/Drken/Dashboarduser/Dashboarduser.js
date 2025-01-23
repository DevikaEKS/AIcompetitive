import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import "./Dashboarduser.css";
import Sidebaruser from "../Sidebaruser/Sidebaruser";

const Dashboarduser = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="dashboard-container">
      <Sidebaruser isOpen={isOpen} toggleSidebar={toggleSidebar} />
      <div className={`dashboard-content ${isOpen ? "expanded" : "collapsed"}`}>
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboarduser;
