import React, { useEffect } from "react";
import { motion } from "framer-motion";
import "./Sidebarinstructor.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faBars,
  faBook,
  faFile,
  faFileUpload,
  faLightbulb,
  faPowerOff,
  faLayerGroup,
  faFileLines,
  faFileArrowDown,
  faFileArchive,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const sidebarVariants = {
  open: { width: "200px" },
  closed: { width: "50px" },
};

const linkVariants = {
  open: { opacity: 1, display: "block" },
  closed: { opacity: 0, display: "none" },
};

function Sidebarinstructor({ isOpen, toggleSidebar }) {
  const { id } = useParams();

  const navigate = useNavigate();

  // useEffect(() => {
  //   const verifyToken = async () => {
  //     try {
  //       const response = await axios.get(
  //         `${process.env.REACT_APP_API_URL}auth/protected`,
  //         {
  //           withCredentials: true,
  //         }
  //       );
  //       console.log("Token is valid:", response.data);
  //     } catch (error) {
  //       console.error("Token verification error:", error);
  //       navigate("/login");
  //     }
  //   };

  //   verifyToken();
  // }, [navigate]);

  const handleLogout = async () => {
    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL}auth/logout`,
        {},
        { withCredentials: true }
      );
      document.cookie =
        "authToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <motion.div
      className="sidebar"
      initial={false}
      animate={isOpen ? "open" : "closed"}
      variants={sidebarVariants}>
      <div className="toggle-btn" onClick={toggleSidebar}>
        <FontAwesomeIcon icon={faBars} />
      </div>
      <ul>
        <li>
          <Link
            style={{ textDecoration: "none" }}
            to={`/instructordashboard/${id}/courselist`}
            className="d-flex" >
            <FontAwesomeIcon icon={faHome} className="mx-1 text-light" />
            <motion.span
              variants={linkVariants}
              className="text ms-1 text-light">
              Home
            </motion.span>
          </Link>
        </li>
        <li>
          <Link
            style={{ textDecoration: "none" }}
            to={`/instructordashboard/${id}/category`}
            className="d-flex">
            <FontAwesomeIcon
              icon={faLayerGroup}
              className="mx-1 text-light"/>
            <motion.span
              variants={linkVariants}
              className="text ms-1 text-light">
              Add Category
            </motion.span>
          </Link>
        </li>
        <li>
          <Link
            style={{ textDecoration: "none" }}
            to={`/instructordashboard/${id}/coursecreation`}
            className="d-flex"
          >
            <FontAwesomeIcon icon={faFile} className="mx-1 text-light" />
            <motion.span
              variants={linkVariants}
              className="text-white text-decoration-none ms-1"
            >
              Add Exams
            </motion.span>
          </Link>
        </li>
        <li>
          <Link
            style={{ textDecoration: "none" }}
            // to={`/instructordashboard/${id}/coursemodule`}
            to={`/instructordashboard/${id}/addmodule`}
            className="d-flex">
            <FontAwesomeIcon
              icon={faFileArchive}
              className="mx-1 text-light"/>
            <motion.span
              variants={linkVariants}
              className="text ms-1 text-light">
              Module
            </motion.span>
          </Link>
        </li>
        <li>
          <Link
            style={{ textDecoration: "none" }}
            // to={`/instructordashboard/${id}/coursemodule`}
            to={`/instructordashboard/${id}/addsubmodule`}
            className="d-flex">
            <FontAwesomeIcon
              icon={faFileLines}
              className="mx-1 text-light"/>
            <motion.span
              variants={linkVariants}
              className="text ms-1 text-light">
              Sub Module
            </motion.span>
          </Link>
        </li>
        <li>
          <Link
            style={{ textDecoration: "none" }}
            to={`/instructordashboard/${id}/samplequestionupload`}
            className="d-flex">
            <FontAwesomeIcon
              icon={faFileArrowDown}
              className="mx-1 text-light" />
            <motion.span
              variants={linkVariants}
              className="text ms-1 text-light" >
             Sample Quiz
            </motion.span>
          </Link>
        </li>
        <li>
          <Link
            style={{ textDecoration: "none" }}
            to={`/instructordashboard/${id}/addquestion`}
            className="d-flex" >
            <FontAwesomeIcon
              icon={faLightbulb}
              className="mx-1 text-light"/>
            <motion.span
              variants={linkVariants}
              className="text ms-1 text-light">
              Quiz
            </motion.span>
          </Link>
        </li>
        <li>
          <Link
            style={{ textDecoration: "none" }}
            to={`/instructordashboard/${id}/aiquiz`}
            className="d-flex"
          >
            <FontAwesomeIcon icon={faFile} className="mx-1 text-light" />
            <motion.span
              variants={linkVariants}
              className="text-white text-decoration-none ms-1"
            >
             AI QUIZ
            </motion.span>
          </Link>
        </li>
        <li>
          <Link
            style={{ textDecoration: "none" }}
            to={`/instructordashboard/${id}/questionbank`}
            className="d-flex" >
            <FontAwesomeIcon icon={faBook} className="mx-1 text-light" />
            <motion.span
              variants={linkVariants}
              className="text ms-1 text-light"
            >
              Question Bank
            </motion.span>
          </Link>
        </li>
        <li>
          <Link
            style={{ textDecoration: "none" }}
            to={`/instructordashboard/${id}/test`}
            className="d-flex">
            <FontAwesomeIcon icon={faFileUpload} className="mx-1 text-light" />
            <motion.span
              variants={linkVariants}
              className="text-white text-decoration-none ms-1">
              Test creation
            </motion.span>
          </Link>
        </li>
        <li>
          <Link
            style={{ textDecoration: "none" }}
            onClick={handleLogout}
            className="d-flex">
            <FontAwesomeIcon
              icon={faPowerOff}
              className="mx-1 text-light"/>
            <motion.span
              variants={linkVariants}
              className="text ms-1 text-light">
              Logout
            </motion.span>
          </Link>
        </li>
      </ul>
    </motion.div>
  );
}
export default Sidebarinstructor;


