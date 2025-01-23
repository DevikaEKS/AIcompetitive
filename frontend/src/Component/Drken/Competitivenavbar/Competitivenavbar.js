import React, { useState, useEffect } from "react";
import { Navbar, Nav, Container, Dropdown } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faSearch, faUser } from "@fortawesome/free-solid-svg-icons";
import { NavLink, useParams } from "react-router-dom";
import Mainlogo from "../../Landingpage/Asset/GL.png";
import "./Competitivenavbar.css";
import axios from "axios";

function Competitivenavbar() {
  const [showSearch, setShowSearch] = useState(false);
  const [dropdownItems, setDropdownItems] = useState([]);
  const { id } = useParams();
  const [selectedOption, setSelectedOption] = useState("Government Exams");

  const handleSelect = (eventKey) => {
    setSelectedOption(eventKey);
  };
  const toggleSearch = () => {
    setShowSearch((prev) => !prev);
  };

  useEffect(() => {
    // Fetch certificate ID and set dropdown items based on certificate ID
    const fetchCertificateId = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}user/user/data/${id}`
        );
        const certificateId = response.data.user.certificate_id;
        const crname=response.data.user.name
   
        if (certificateId === 1) {
        
          setDropdownItems(["AWS"]);
        } else if (certificateId === 2) {
         
          setDropdownItems(["Railways"]);
        }
      } catch (error) {
        console.error("Error fetching certificate ID:", error);
      }
    };

    fetchCertificateId();
  }, [id]);

  return (
    <Navbar expand="lg" className="navbarcontenttext">
      <Container>
        <Navbar.Brand as={NavLink} to="/" className="d-flex align-items-center">
          <img
            src={Mainlogo}
            alt="Main Logo"
            className="logoken" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          {/* Mobile View */}
          <Nav className="d-lg-none mx-auto">
            <Nav.Link
              as={NavLink}
              to={`/banner/${id}`}
              className="navpart px-3"
              activeClassName="active-link">
              Home
            </Nav.Link>
            <Nav.Link
              as={NavLink}
              to={`/mytest/${id}`}
              className="navpart px-3"
              activeClassName="active-link" >
             Exams
            </Nav.Link>
      <Dropdown onSelect={handleSelect} className="px-3">
      <Dropdown.Toggle
        variant="link"
        className="navpart1 text-light fw-bold">
        {selectedOption}
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item eventKey="Government Exams" className="test-dark">Government Exams</Dropdown.Item>
        <Dropdown.Item eventKey="Global Certifications" className="test-dark">Global Certifications</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>

            {/* <Dropdown>
              <Dropdown.Toggle
                variant="link"
                className="navpart px-3 text-light"
              >
                  {id === "1" ? "Government Exams" : "Global Certifications"}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {dropdownItems.map((item, index) => (
                  <Dropdown.Item key={index} href="#">
                    {item}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown> */}

            <Nav.Link
              as={NavLink}
              to=""
              className="navpart px-3"
              activeClassName="active-link">
              Notification
            </Nav.Link>
            <Nav.Link
              as={NavLink}
              to=""
              className="navpart px-3"
              activeClassName="active-link">
              Profile
            </Nav.Link>
            {showSearch && (
              <div className="search-bar d-flex align-items-center px-3 mt-2 bg-light rounded">
                <FontAwesomeIcon icon={faSearch} className="search-icon me-2" />
                <input
                  type="search"
                  placeholder="Search"
                  className="border-0 searchinput bg-light"/>
              </div>
            )}
            <Nav.Link
              as={NavLink}
              to="/login"
              className="navpart px-3"
              activeClassName="active-link" >
              Login
            </Nav.Link>
          </Nav>

          {/* Desktop View */}
          <Nav className="w-100 d-none d-lg-flex align-items-center justify-content-between">
            <div className="d-flex flex-grow-1 justify-content-center">
              <NavLink
                to={`/banner/${id}`}
                className="navpart px-3"
                activeClassName="active-link" >
                Home
              </NavLink>
              <NavLink
                to={`/mytest/${id}`}
                className="navpart px-3"
                activeClassName="active-link" >
              Exams
              </NavLink>
              <Dropdown onSelect={handleSelect}>
      <Dropdown.Toggle
        variant="link"
        className="navpart1 px-3 text-light fw-bold">
        {selectedOption}
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item eventKey="Government Exams">Government Exams</Dropdown.Item>
        <Dropdown.Item eventKey="Global Certifications">Global Certifications</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
              {/* <Dropdown>
                <Dropdown.Toggle
                  variant="link"
                  className="navpart1 px-3 text-light fw-bold">
                  {id === "1" ? "Government Exams" : "Global Certifications"}
                 
               
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  {dropdownItems.map((item, index) => (
                    <Dropdown.Item key={index} href="#">
                      {item}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown> */}
            </div>
            {showSearch && (
              <div className="search-bar d-flex align-items-center p-2 bg-light rounded">
                <FontAwesomeIcon icon={faSearch} className="search-icon me-2" />
                <input
                  type="search"
                  placeholder="Search"
                  className="border-0 searchinput bg-light"
                />
              </div>
            )}
            <Nav.Link onClick={toggleSearch} className="ms-3">
              <FontAwesomeIcon icon={faSearch} />
            </Nav.Link>
            <Nav.Link as={NavLink} to="/notifications" className="ms-3">
              <FontAwesomeIcon icon={faBell} />
            </Nav.Link>
            <Nav.Link as={NavLink} to="/login" className="ms-3">
              Login
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Competitivenavbar;
