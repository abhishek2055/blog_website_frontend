import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { AuthContext } from "../context/authContext.jsx";
import "./login.css";

const Login = () => {
  const [loginInputs, setLoginInputs] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const { login } = useContext(AuthContext);

  const handleChange = (e) => {
    setLoginInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleSubmit = async (e) => {
    try {
      await login(loginInputs);
      navigate("/");
    } catch (err) {
      setError(err.response.data);
    }
  };
  return (
    <div className="login">
      <div className="login-card">
        <h1>Log In</h1>
        <div className="username">
          <label htmlFor="username">Username</label>
          <input type="text" name="username" onChange={handleChange} />
        </div>
        <div className="password">
          <label htmlFor="password">Password</label>
          <input type="password" name="password" onChange={handleChange} />
        </div>

        <button className="login-btn" onClick={handleSubmit}>Login</button>
        {error && <p className="error">error!!! {error}</p>}
        <div className="dont-have-account">
          Don't have an account <Link to="/register">register?</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
