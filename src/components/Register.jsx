import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import API_URL from "../config";   

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateForm = () => {
    const tempErrors = {};
    if (!name.trim()) tempErrors.name = "Name is required";
    if (!email.trim()) tempErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(email)) tempErrors.email = "Email is invalid";
    if (!password) {
      tempErrors.password = "Password is required";
    } else if (password.length < 6) {
      tempErrors.password = "Password must be at least 6 characters";
    } else if (!/[!@#$%^&*]/.test(password)) {
      tempErrors.password =
        "Password must contain at least one special character such as '@', '$', '%', '&', or '!'.";
    }
    if (password !== confirmPassword)
      tempErrors.confirmPassword = "Passwords do not match";
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      const res = await axios.post(`${API_URL}/register`, {
        name,
        email,
        password,
      });
      alert(res.data.message);
      navigate("/loginpage"); 
    } catch (err) {
      alert(err.response?.data?.message || "Error registering user");
    }
  };

  return (
    <div className="row justify-content-center">
      <div className="col-md-6">
        <h2 className="mb-4">Register</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label  htmlFor="name" className="form-label">Full Name</label>
            <input
              type="text"
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            {errors.name && <p style={{ color: "red" }}>{errors.name}</p>}
          </div>

          <div className="mb-3">
            <label  htmlFor="email" className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}
          </div>

          <div className="mb-3">
            <label  htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {errors.password && <p style={{ color: "red" }}>{errors.password}</p>}
          </div>

          <div className="mb-3">
            <label  htmlFor="password" className="form-label">Confirm Password</label>
            <input
              type="password"
              className="form-control"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            {errors.confirmPassword && (
              <p style={{ color: "red" }}>{errors.confirmPassword}</p>
            )}
          </div>

          <button type="submit" className="btn btn-success w-100">
            Register
          </button>
        </form>
        <div className="mt-3 text-center">
          <p>
            Already have an account? <Link to="/loginpage">Login here</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
