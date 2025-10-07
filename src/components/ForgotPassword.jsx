import React, { useState } from "react";
import { Link } from "react-router-dom";  // 👈 import Link
import axios from "axios";
import API_URL from "../config";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.put(`${API_URL}/update-password/${email}`, {
                oldPassword,
                newPassword,
            });
            alert(res.data.message);
        } catch (err) {
            alert(err.response?.data?.message || "Error updating password");
        }
    };

    return (
        <div className="row justify-content-center">
      <div className="col-md-6">
                <h2 className="mb-4">Forgot Password</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label>Email</label>
                        <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    </div>

                    <div className="mb-3">
                        <label>Old Password</label>
                        <input type="password" className="form-control" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} />
                    </div>

                    <div className="mb-3">
                        <label>New Password</label>
                        <input type="password" className="form-control" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required />
                    </div>

                    <button type="submit" className="btn btn-primary w-100">
                        Update Password
                    </button>
                </form>
                <div className="mt-3 text-center">
                    <p>Remembered your password?{" "} <Link to="/loginpage">Go to Login</Link></p>
                </div>
            </div>
       </div>
    );
};

export default ForgotPassword;
