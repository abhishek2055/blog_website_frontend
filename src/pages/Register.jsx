import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./register.css";

const Register = () => {
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState(null);
  const [dp, setDp] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const uploadDp = async () => {
    try {
      const formData = new FormData();
      formData.append("displayPic", dp);
      const res = await axios.post("http://localhost:8800/uploadDp", formData);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    const dpUrl = await uploadDp();
    e.preventDefault();
    try {
      const registerationData = { ...inputs, dpUrl };
      await axios.post(
        "http://localhost:8800/api/auth/register",
        registerationData
      );
      navigate("/login");
    } catch (error) {
      console.log(error);
      setError(error.response.data);
    }
  };
  return (
    <div className="register">
      <div className="register-card">
        <h1>Register</h1>
        <div className="username">
          <label htmlFor="username" className="labels">Username</label>
          <input type="text" name="username" className="inputs" onChange={handleChange} />
        </div>
        <div className="email">
          <label className="labels" htmlFor="email">Email</label>
          <input className="inputs" type="email " name="email" onChange={handleChange} />
        </div>
        <div className="displayPic">
          <label className="labels" htmlFor="displayPic">Select Your Profile Picture</label>
          <div className="image-box">
            <img
    
             src="https://t3.ftcdn.net/jpg/04/48/06/74/360_F_448067440_hTWoSx63cvavKS0qYDs1BR2Qg5C0JVB7.jpg"
              alt="upload-pic"
            />

          </div>
          <input
            className="choose-btn"
            type="file"
            id="displayPic"
            name="displayPic"
            onChange={(e) => setDp(e.target.files[0])}
          />
        </div>
        <div className="password">
          <label className="labels" htmlFor="password">Password</label>
          <input className="inputs" type="password" name="password" onChange={handleChange} />
        </div>
        <button className="register-btn" onClick={handleSubmit}>Register</button>
        {error && <p className="error">**{error}</p>}
        <div className="dont-have-account">
          Already have an account <Link to="/login">login?</Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
