import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import API_URL from "../config"; // backend URL

const Loginpage = ({ setUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // ✅ Correct endpoint (no double /api)
      const res = await axios.post(`${API_URL}/login`, { email, password });

      if (res && res.data) {
        alert(res.data.message);
        setUser(res.data.user);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        navigate("/home");
      } else {
        setError("Invalid server response");
      }
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="row justify-content-center mt-5">
      <div className="col-md-6">
        <h2 className="mb-4 text-center">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <div className="input-group">
              <input
                type={showPassword ? "text" : "password"}
                className="form-control"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
            <p className="pt-2 text-end">
              Forget password? <Link to="/forgot-password">Click here</Link>
            </p>
          </div>

          <button type="submit" className="btn btn-primary w-100">
            Login
          </button>
        </form>

        {error && <p className="text-danger mt-3">{error}</p>}

        <div className="mt-3 text-center">
          <p>
            Don’t have an account? <Link to="/register">Register here</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Loginpage;
