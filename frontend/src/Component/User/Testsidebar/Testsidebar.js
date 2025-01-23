import React, { useEffect } from "react";
import { motion } from "framer-motion";
import "./Testsidebar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faUser,
  faBars,
 
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

function Testsidebar({ isOpen, toggleSidebar }) {
  // const [isOpen, setIsOpen] = React.useState(false);

  const { id } = useParams();
 
  const navigate = useNavigate();

//   useEffect(() => {
//     const verifyToken = async () => {
//       try {
//         const response = await axios.get(
//           `${process.env.REACT_APP_API_URL}auth/protected`,
//           {
//             withCredentials: true,
//           }
//         );
//         console.log("Token is valid:", response.data);
//       } catch (error) {
//         console.error("Token verification error:", error);
//         navigate("/login");
//       }
//     };

//     verifyToken();
//   }, [navigate]);

//   const handleLogout = async () => {
//     try {
//       await axios.post(
//         `${process.env.REACT_APP_API_URL}auth/logout`,
//         {},
//         { withCredentials: true }
//       );
//       document.cookie =
//         "authToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
//       navigate("/login");
//     } catch (error) {
//       console.error("Logout error:", error);
//     }
//   };

  return (
    <motion.div
      className="sidebar"
      initial={false}
      animate={isOpen ? "open" : "closed"}
      variants={sidebarVariants} >
      <div className="toggle-btn" onClick={toggleSidebar}>
        <FontAwesomeIcon icon={faBars} />
      </div>
      <ul>
        <li>
          <Link
            style={{ textDecoration: "none" }}
            to={`/testpart/examspart`}
            className="d-flex">
            <FontAwesomeIcon icon={faHome} className="mx-1 text-light" />
            <motion.span
              variants={linkVariants}
              className="text ms-1 text-light"
            >
              Home
            </motion.span>
          </Link>
        </li>
        
       
        
      </ul>
    </motion.div>
  );
}

export default Testsidebar;


