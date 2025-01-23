import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Availablecourses.css";
import { Link, useParams } from "react-router-dom";
import ProgressBar from "react-bootstrap/ProgressBar";
import coursecontent1 from "../../../Asset/who suffers.png";
import coursecontent2 from "../../../Asset/Coursecontent2.jpg";
import axios from "axios";

function Availablecourses() {
  const now = 60;

  const { id } = useParams();
  const [Course, setCourse] = useState([]);
  const [user, setUser] = useState({
    first_name: "",
    last_name: "",
    profile_image: "",
    completion_percentage: 0,
  });

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}course/getallcourse`)
      .then((res) => {
        console.log(res.data);
        setCourse(res.data[0]);
      })
      .catch((err) => {
        console.log("error", err);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}user/user/${id}`)
      .then((res) => {
        const userData = res.data;
        setUser({
          first_name: userData.first_name.trim(),
          // last_name: userData.last_name.trim(),
          completion_percentage: parseFloat(userData.completion_percentage),
        });
      })
      .catch((err) => {
        console.log("Error fetching user data", err);
      });
  }, [id]);

  return (
    <div className="container bgfullpath mb-5">
      <div className="container card mt-3 bgpurplecard border-0">
        <h3 className="text-start p-4">Enrolled Courses</h3>
        <hr />
        <div className="row">
          <div className="col-sm-12 col-md-4 mb-3">
            <div className="card">
              <img src={Course.course_image} className="card-img-top" alt="Course" />
              <div className="card-body">
                <h5 className="card-title">{Course.coursename}</h5>
                {/* <p className="card-text">Description</p> */}
                <ProgressBar
                  now={user.completion_percentage}
                  label={`${user.completion_percentage}%`}
                  className="m-2 custom-progress-bar"
                />
                <div className="my-4">
                  <Link
                    to={`/user/${id}`}
                    className="coursebutton text-decoration-none p-3 rounded-3"
                  >
                    Go to course
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Availablecourses;
