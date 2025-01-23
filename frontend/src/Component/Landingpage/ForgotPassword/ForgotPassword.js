import React, { useState } from "react";
import axios from "axios";
import "./ForgotPassword.css"; // Import the CSS file for styling
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import imlogin from "../../../Asset/bannerlog.jpg";
const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleEmailChange = (e) => setEmail(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      setMessage("Please enter your email address.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      axios.post(`${process.env.REACT_APP_API_URL}auth/forgot_password`, { email })
      .then(res=>{
        if(res.data.message === "Email is required"){
            toast.error("Email is required")
        }
        else if(res.data.message === "User not found"){
            toast.error("you don't have an account for this email id")
        }
        else if(res.data.message === "Error sending reset email"){
            toast.error("Error sending reset email, check your connection")
        }
        else if(res.data.message === "Password reset link sent successfully. Please check your email."){
            toast.success("Password reset link sent successfully. Please check your email.")
        }
        setMessage(res.data.message);
      })
      
    } catch (error) {
      setMessage("Error sending reset email. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-fluid p-0 m-0 ">
      <div className="row p-0 m-0">
        {/* <div className="col-lg-5 d-none d-lg-block p-0 m-0">
          <img src={imlogin} className="login-image" alt="Login Banner" />
        </div>
        */}
        <div className="col-sm-12 py-5">     
    <div className="forgot-password p-4 my-5">
        <ToastContainer/>
      <h2 className="forgot-password_title">Forgot Password</h2>
      <form onSubmit={handleSubmit}>
        <div >
          <div className="text-start">
          <label htmlFor="email" className="labeltext2 my-3 text-start">
          Enter your email address
        </label>
        <br/>
        <input
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={handleEmailChange}
          className="formcontrolbox my-2 w-100"
          required
          placeholder="Enter your Email Address"
        />
          </div>
        </div>
       
       
        <button
          type="submit"
          className="forgot-password__button my-2"
          disabled={loading}
        >
          {loading ? "Sending..." : "Submit"}
        </button>
      </form>
      {message && <p className="forgot-password__message">{message}</p>}
    </div>
    </div>
    </div>
    </div>  
  );
};

export default ForgotPassword;




