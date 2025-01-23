import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Register.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Country, State, City } from "country-state-city";
import axios from "axios";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import logim from "../Asset/usericon.png";
function Registerpage() {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [qualification, setQualification] = useState("");
  const [jobStatus, setJobStatus] = useState("");
  const [otherProfession, setOtherProfession] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [countries, setCountries] = useState(Country.getAllCountries());
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]); // Store the categories from API
  const [selectedCategory, setSelectedCategory] = useState("");

  const handleCountryChange = (e) => {
    const countryCode = e.target.value;
    setSelectedCountry(countryCode);
    setStates(State.getStatesOfCountry(countryCode)); // Fetch states based on selected country
    setSelectedState(""); // Reset state selection
  };

  const handleStateChange = (e) => {
    const stateCode = e.target.value;
    setSelectedState(stateCode);
    if (stateCode) {
      setCities(City.getCitiesOfState(selectedCountry, stateCode)); // Fetch cities based on selected state
    }
    setSelectedCity(""); // Reset city selection
  };

  // useEffect(() => {
  //   setFormData((prev) => ({ ...prev, city: selectedCity }));
  // }, [selectedCity]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}auth/type-of-certificate`)
      .then((res) => {
        setCategories(res.data.result);
      });
  }, []);

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };
  const navigate = useNavigate();
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const emailPattern =
    /^[a-zA-Z][a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const phnopattern = /^[6-9][0-9]{9}$/;
  const validateInput = () => {
    let isValid = true;
    const newErrors = {};

    // Full name validation
    if (!fullname) {
      newErrors.fullname = "Full Name is required";
      isValid = false;
    }

    // Email validation
    if (!email) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!emailPattern.test(email)) {
      newErrors.email = "Invalid email format";
      isValid = false;
    }

    // Phone number validation
    if (!phone) {
      newErrors.phone = "Phone number is required";
      isValid = false;
    } else if (!phnopattern.test(phone)) {
      newErrors.phone = "Enter Valid Phone number";
      isValid = false;
    }

    // Qualification validation
    if (!qualification) {
      newErrors.qualification = "Qualification is required";
      isValid = false;
    }

    // If 'Other' is selected, validate the input for 'other profession'
    if (jobStatus === "Other" && !otherProfession) {
      newErrors.otherProfession = "Please specify your profession";
      isValid = false;
    }

    // Password validation
    if (!password) {
      newErrors.password = "Password is required";
      isValid = false;
    }

    // Confirm password validation
    if (!confirmPassword) {
      newErrors.confirmPassword = "Confirm Password is required";
      isValid = false;
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateInput()) return;

    const registrationData = {
      fullname,
      email,
      phone_no: phone,
      qualification,
      jobStatus: jobStatus === "Other" ? otherProfession : jobStatus, // If Other is selected, send the other profession
      password,
      selectedCity,
      selectedCountry,
      selectedState,
      selectedCategory
    };

    try {
      setIsLoading(true);
      await axios
        .post(`${process.env.REACT_APP_API_URL}auth/register`, registrationData)
        .then((res) => {
          if (res.data.message === "User registered successfully.") {
            toast.success("Registration successful!");
            navigate("/login");
            setFullname("");
            setEmail("");
            setPhone("");
            setQualification("");
            setJobStatus("");
            setOtherProfession("");
            setPassword("");
            setConfirmPassword("");
          } else if (
            res.data.message === "Registration failed. Please try again."
          ) {
            toast.error("Registration failed. Please try again.");
          } else if (
            res.data.message === "Email already exists in User table."
          ) {
            toast.error("user already registered");
          } else if (
            res.data.message === "Email already exists in Auth table."
          ) {
            toast.error("user already registered");
          }
        });
    } catch (err) {
      toast.error("Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container-fluid d-flex flex-column justify-content-end align-items-end loginbg h-100">
      <div className="row p-0 m-0">
        <div className="RegisterApp p-0">
          <ToastContainer />
          <div className="card p-2 register-form1">
            <div className="register-form p-4">
              <div className="text-center">
              <img src={logim} alt="login" style={{height:"50px",width:"50px"}}/>
              <h1 className="text-center p-1 signuptxt">Sign Up</h1>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-sm-12 col-md-6">
                    <div className="form-group">
                      {/* <label htmlFor="fullname" className="text-start">
                        Full Name
                      </label> */}
                      <input
                        type="text"
                        id="fullname"
                        name="fullname"
                        placeholder="Enter your full name"
                        value={fullname}
                        onChange={(e) => setFullname(e.target.value)}
                        className={`border-0 ${errors.fullname ? "error-input" : ""}`}
                      />
                      {errors.fullname && (
                        <div className="error-text text-start">
                          {errors.fullname}
                        </div>
                      )}
                    </div>

                    <div className="form-group">
                      {/* <label htmlFor="email" className="text-start">
                        Email
                      </label> */}
                      <input
                        type="text"
                        id="email"
                        name="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className={`border-0 ${errors.email ? "error-input" : ""}`}
                      />
                      {errors.email && (
                        <div className="error-text text-start">
                          {errors.email}
                        </div>
                      )}
                    </div>

                    <div className="form-group">
                      {/* <label htmlFor="phone" className="text-start">
                        Phone Number
                      </label> */}
                      <input
                        type="text"
                        id="phone"
                        name="phone"
                        placeholder="Enter your phone number"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className={`border-0 ${errors.phone ? "error-input" : ""}`}
                      />
                      {errors.phone && (
                        <div className="error-text text-start">
                          {errors.phone}
                        </div>
                      )}
                    </div>

                    <div className="form-group">
                      {/* <label htmlFor="qualification" className="text-start">
                        Qualification
                      </label> */}
                      <input
                        type="text"
                        id="qualification"
                        name="qualification"
                        placeholder="Enter your qualification"
                        value={qualification}
                        onChange={(e) => setQualification(e.target.value)}
                        className={`border-0 ${
                          errors.qualification ? "error-input" : ""
                        }`}
                      />
                      {errors.qualification && (
                        <div className="error-text text-start">
                          {errors.qualification}
                        </div>
                      )}
                    </div>

                    {/* Job Status Dropdown */}
                    <div className="form-group">
                      {/* <label htmlFor="jobStatus" className="text-start">
                        Profession
                      </label> */}
                      <select
                        id="jobStatus"
                        name="jobStatus"
                        value={jobStatus}
                        onChange={(e) => setJobStatus(e.target.value)}
                        className="form-control py-3"
                      >
                        <option value="">Select Job Status</option>
                        <option value="Student">Student</option>
                        <option value="Freelancer">Freelancer</option>
                        <option value="Employee">Employee</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>

                    <div className="form-group">
                      {/* <label htmlFor="category" className="text-start">
                        Category
                      </label> */}
                      <select
                        id="category"
                        name="category"
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="form-control py-3"
                      >
                        <option value="">Select Category</option>
                        {categories.map((category) => (
                          <option
                            key={category.certificate_id}
                            value={category.certificate_id}
                          >
                            {category.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Show input field if "Other" is selected */}
                    {jobStatus === "Other" && (
                      <div className="form-group">
                        {/* <label htmlFor="otherProfession" className="text-start">
                          Specify Your Profession
                        </label> */}
                        <input
                          type="text"
                          id="otherProfession"
                          name="otherProfession"
                          placeholder="Enter your profession"
                          value={otherProfession}
                          onChange={(e) => setOtherProfession(e.target.value)}
                          className={` ${
                            errors.otherProfession ? "error-input" : ""
                          }`}
                        />
                        {errors.otherProfession && (
                          <div className="error-text text-start">
                            {errors.otherProfession}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                  <div className="col-sm-12 col-md-6">
                    <div className="form-group">
                      {/* <label className="text-start">Select Country</label> */}
                      <select
                        className="form-control"
                        value={selectedCountry}
                        onChange={handleCountryChange}
                      >
                        <option value="">Select a Country</option>
                        {countries.map((country) => (
                          <option key={country.isoCode} value={country.isoCode}>
                            {country.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* State Dropdown */}
                    <div className="form-group">
                      {/* <label className="text-start">Select State</label> */}
                      <select
                        className="form-control bg-light"
                        value={selectedState}
                        onChange={handleStateChange}
                        disabled={!states.length}
                      >
                        <option value="">Select a State</option>
                        {states.map((state) => (
                          <option key={state.isoCode} value={state.isoCode} className="bg-light">
                            {state.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* City Dropdown */}
                    <div className="form-group">
                      {/* <label className="text-start">Select City</label> */}
                      <select
                        className="form-control form-element bg-light"
                        value={selectedCity}
                        onChange={(e) => setSelectedCity(e.target.value)}
                        disabled={!cities.length}
                      >
                        <option value="">Select a City</option>
                        {cities.map((city) => (
                          <option key={city.name} value={city.name} className="bg-light">
                            {city.name}
                          </option>
                        ))}
                      </select>
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
                            errors.password ? "error-input" : ""
                          }`}
                          style={{
                            paddingRight: "40px", // Adds space for the icon within the input
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
                          }}
                        >
                          {showPassword ? (
                            <AiFillEye />
                          ) : (
                            <AiFillEyeInvisible />
                          )}
                        </span>
                      </div>
                      {errors.password && (
                        <div className="error-text text-start">
                          {errors.password}
                        </div>
                      )}
                    </div>

                    <div className="form-group">
                      {/* <label htmlFor="confirmPassword" className="text-start">
                        Confirm Password
                      </label> */}
                      <div style={{ position: "relative", width: "100%" }}>
                        <input
                          type={showConfirmPassword ? "text" : "password"}
                          id="confirmPassword"
                          name="confirmPassword"
                          placeholder="Confirm your password"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          className={`form-control border-0 ${
                            errors.confirmPassword ? "error-input" : ""
                          }`}
                          style={{ paddingRight: "40px" }} // Space for the eye icon
                        />
                        <span
                          onClick={toggleConfirmPasswordVisibility}
                          style={{
                            position: "absolute",
                            right: "10px",
                            top: "50%",
                            transform: "translateY(-50%)",
                            cursor: "pointer",
                            color: "#555",
                          }}
                        >
                          {showConfirmPassword ? (
                            <AiFillEye />
                          ) : (
                            <AiFillEyeInvisible />
                          )}
                        </span>
                      </div>
                      {errors.confirmPassword && (
                        <div className="error-text text-start">
                          {errors.confirmPassword}
                        </div>
                      )}
                    </div>


                    <div className="d-flex justify-content-center">
                  <button
                    type="submit"
                    className="rounded-5 subbtn1 w-100"
                    disabled={isLoading}
                  >
                    {isLoading ? "Registering..." : "Sign Up"}
                  </button>
                </div>
                  </div>       
                </div>
               
              </form>

              <div className="mt-3 text-center">
                <p className="logpara">
                  Already have an account?{" "}
                  <Link to="/login"
                    style={{ textDecoration: "none", fontWeight: "600" }}
                    className="register-link">
                    Login
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Registerpage;
