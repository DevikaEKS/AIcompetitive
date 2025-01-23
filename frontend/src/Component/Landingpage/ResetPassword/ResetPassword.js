import React, { useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./ResetPassword.css";

const ResetPassword = () => {
  const { token } = useParams(); // Assuming token is passed in the URL
  console.log(token);

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(""); 
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if passwords match
    if (newPassword !== confirmPassword) {
      // alert("Passwords do not match");
      // return;
      setError("Passwords do not match");
      return;
    }
setError("")
    // Send only the confirmed password to the API
    try {
      axios
        .post(`${process.env.REACT_APP_API_URL}auth/reset_password`, {
          token,
          newPassword: confirmPassword, // Sending confirmPassword since they match
        })
        .then((response) => {
          if (response.data.message === "Password updated successfully in both tables") {
            toast.success("Password updated successfully");
            setTimeout(() => {
              navigate("/login"); // Redirect to login page after success
            }, 2000);
          } else if (response.data.message === "Invalid or expired token") {
            toast.error("Invalid or expired token");
          } else {
            toast.success(
              response.data.message ||
                "Error resetting password. Please try again."
            );
          }
        });
    } catch (error) {
      console.error("Error resetting password:", error);
      toast.error("Error resetting password. Please try again.");
    }
  };

  return (
    <div className="container bgparts">
       <h2 className="text-center labeltext1 my-5">Reset Password</h2>
    <div className="reset-password-container d-flex align-items-center justify-content-center">
      <ToastContainer />
     
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="labeltext1 text-start">New Password</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label className="labeltext1 text-start">Confirm Password</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
           {error && (
              <small className="text-danger mt-1 d-block">
                {error}
              </small>
            )}
        </div>
        <div className="d-flex flex-column justify-content-center">
        <button type="submit" className="subbtn">Reset Password</button>
        </div>
      </form>
    </div>
    </div>
  );
};

export default ResetPassword;
