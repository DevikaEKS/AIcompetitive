import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { Modal, Button } from "react-bootstrap";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import logim from "../Asset/usericon.png";
import google1 from "../Asset/googlepic.png";
import linkedin1 from "../Asset/lnk.png";
function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Modal state
  const navigate = useNavigate();
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const emailPattern =
    /^[a-zA-Z][a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const validateInput = () => {
    let valid = true;

    if (!username) {
      setUsernameError("Username is required");
      valid = false;
    } else if (!emailPattern.test(username)) {
      setUsernameError("Invalid email format");
      valid = false;
    } else {
      setUsernameError("");
    }

    if (!password) {
      setPasswordError("Password is required");
      valid = false;
    } else {
      setPasswordError("");
    }
    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateInput()) return;

    const loginData = { email: username, password };

    try {
      setIsLoading(true); // Start loading
      await axios
        .post(`${process.env.REACT_APP_API_URL}auth/login`, loginData, {
          withCredentials: true,
        })
        .then((res) => {
          // console.log(res.data);

          if (res.data.message === "Invalid email or password") {
            toast.error("Invalid Email or password");
          } else if (res.data.message === "login success") {
            const { user, token } = res.data;
            const { role_id, user_id, company_id, email, certificate_id } = user;
            console.log(user);
            if (role_id === 4) {
              if(certificate_id == 2){
              navigate(`/banner/${user_id}`);
              }
              else if(certificate_id == 1){
                navigate(`/banner/${user_id}`);
              }
            } else if (role_id === 5) {
              navigate(`/admindashboard/${company_id}/dashboard`);
            } else if (role_id === 2) {
              navigate(`/instructordashboard/${user_id}/courselist`);
            } else if (email === "admin@gmail.com") {
              navigate(`/superadmin/${user_id}/dashboard`);
            }
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.error(err);
      toast.error("Invalid email or password");
    } finally {
      setIsLoading(false); 
    }
  };


  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  
  //   if (!validateInput()) return;
  
  //   const loginData = { email: username, password };
  
  //   try {
  //     setIsLoading(true); // Start loading
  //     await axios
  //       .post(`${process.env.REACT_APP_API_URL}auth/login`, loginData, {
  //         withCredentials: true,
  //       })
  //       .then((res) => {
  //         if (res.data.message === "Invalid email or password") {
  //           toast.error("Invalid Email or password");
  //         } else if (res.data.message === "login success") {
  //           const { user, token } = res.data;
  //           const { role_id, user_id, company_id, email, certificate_id } = user;
  
  //           // First time login logic
  //           if (localStorage.getItem("hasLoggedIn") === null) {
  //             // Mark as logged in for the first time
  //             localStorage.setItem("hasLoggedIn", "true");
  
  //             // Navigate based on certificate_id
  //             if (certificate_id === 2) {
  //               navigate("/terms");
  //             }
  //           } else {
  //             // Subsequent logins
  //             if (certificate_id === 2) {
  //               // navigate(`/banner/${user_id}`);
  //               navigate("/terms");
  //             } else if (certificate_id === 1) {
  //               navigate(`/banner/${user_id}`);
  //             }
  //           }
  
  //           // Other role-based navigation (you can keep as is)
  //           if (role_id === 5) {
  //             navigate(`/admindashboard/${company_id}/dashboard`);
  //           } else if (role_id === 2) {
  //             navigate(`/instructordashboard/${user_id}/courselist`);
  //           } else if (email === "admin@gmail.com") {
  //             navigate(`/superadmin/${user_id}/dashboard`);
  //           }
  //         }
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //   } catch (err) {
  //     console.error(err);
  //     toast.error("Invalid email or password");
  //   } finally {
  //     setIsLoading(false); 
  //   }
  // };
  














  const handleRegisterClick = () => {
    setShowRegisterModal(true); // Show the modal
  };

  const handleCloseModal = () => {
    setShowRegisterModal(false); // Close the modal
  };

  const handleIndividualLogin = () => {
    navigate("/register");
  };

  const handleBusinessLogin = () => {
    navigate("/business_register");
  };

  return (
    <div className="container-fluid d-flex justify-content-end align-items-end vh-100 loginbg ">
      <div className="row d-flex flex-column justify-content-end align-items-end me-0 me-md-5 pe-0 pe-md-5 ">
        <div className="col-sm-12 LoginApp card">
          <ToastContainer />
          <div className="px-4">
            <div className="login-form">
            <div className="text-center">
      <img src={logim} alt="login" style={{height:"50px",width:"50px"}}/>
      <h3 className="text-center signuptxt">Log In</h3>
      </div>
              {/* <p className="logpara text-center">How can we help you today?</p> */}
              <form onSubmit={handleSubmit}>
                <div className="form-group py-3" >
                  {/* <label htmlFor="username" className="text-start text-light">
                    Email
                  </label> */}
                  <input
                    type="text"
                    id="username"
                    name="username"
                    placeholder="Enter your email"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className={`border-0 ${usernameError ? "error-input" : ""}`}/>
                  {usernameError && (
                    <div className="error-text text-start">{usernameError}</div>
                  )}
                </div>

                <div className="form-group">
                  {/* <label htmlFor="password" className="text-start">
                    Password
                  </label> */}
                  <div style={{ position: "relative", width: "100%" }}>
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      name="password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className={`border-0 form-control ${
                        passwordError ? "error-input" : ""
                      }`}
                      style={{
                        paddingRight: "40px", // To make space for the eye icon
                      }}
                    />
                    <span
                      onClick={togglePasswordVisibility}
                      style={{
                        position: "absolute",
                        right: "10px",
                        top: "50%",
                        transform: "translateY(-50%)",
                        cursor: "pointer",
                        color: "#555",
                      }} >
                      {showPassword ? <AiFillEye /> : <AiFillEyeInvisible />}
                    </span>
                  </div>
                  {passwordError && (
                    <div className="error-text text-start">{passwordError}</div>
                  )}
                  <div className="d-flex justify-content-end mt-1">
                    <a href="/forgot_password" className="forget-password-link">
                      Forget Password?
                    </a>
                  </div>
                </div>
             
                  <button
                    type="submit"
                    className="rounded-5 subbtn1 w-100 my-2"
                    disabled={isLoading}>
                    {isLoading ? "Logging in..." : "Sign In"}
                  </button>

<div class="line-with-text">
  <span>or continue with</span>
</div>


<div className="d-flex justify-content-evenly py-2">

<div className="bg-light p-2 rounded-5">
<img src={google1} alt="Google" style={{height:"20px"}}/>
</div>
<div className="bg-light p-2 rounded-5">
<img src={linkedin1} alt="LinkedIn" style={{height:"20px"}}/>
</div>

</div>
                <p className="text-center noaccounttext">
                  Don't have an account?{" "}
                  <span
                    className="register-link fw-bold "
                    onClick={handleRegisterClick}>
                    Register
                  </span>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Modal for Register Selection */}
      <Modal show={showRegisterModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title style={{color:"#291571"}}>Select Account Type</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p style={{color:"#291571"}}>Please select the type of account you want to create:</p>
          <div className="d-flex justify-content-around">
            <button className="subbtn1 rounded-3" onClick={handleIndividualLogin}>
              Individual
            </button>
            <button className="subbtn1 rounded-3" onClick={handleBusinessLogin}>
              Business
            </button>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default Login;
