import React, { useState, useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "../components/Navbar.css";
import API_URL from "../config";

const Navbar = ({ user, setUser }) => {
  const navigate = useNavigate();
  const [showProfile, setShowProfile] = useState(false);
  const [editingProfile, setEditingProfile] = useState(false);
  const [changingPassword, setChangingPassword] = useState(false);
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    oldPassword: "",
    newPassword: "",
    photo: "",
  });
  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);

  const profileRef = useRef(null);

  useEffect(() => {
    if (user) {
      setProfileData({
        name: user.name,
        email: user.email,
        oldPassword: "",
        newPassword: "",
        photo: user.photo || `https://ui-avatars.com/api/?name=${user.name}`,
      });
    }
  }, [user]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setShowProfile(false);
        setEditingProfile(false);
        setChangingPassword(false);
      }
    };
    if (showProfile) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showProfile]);

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
    navigate("/loginpage");
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSave = async () => {
    try {
      setLoading(true);

      // Upload photo if selected
      if (editingProfile && selectedFile) {
        const formData = new FormData();
        formData.append("photo", selectedFile);

        const res = await axios.post(`${API_URL}/upload/${encodeURIComponent(user.email)}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        setProfileData({ ...profileData, photo: `${API_URL}${res.data.profilePhoto}` });
        setSelectedFile(null);
        setPreview(null);
      }

      // Save name/email changes
      if (editingProfile) {
        const res = await axios.put(`${API_URL}/update-profile/${encodeURIComponent(user.email)}`, {
          name: profileData.name,
          newEmail: profileData.email,
          photo: profileData.photo,
        });
        setUser(res.data.user);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        alert("Profile updated successfully!");
      }

      // Password update
      if (changingPassword && profileData.oldPassword && profileData.newPassword) {
        await axios.put(`${API_URL}/update-password/${encodeURIComponent(user.email)}`, {
          oldPassword: profileData.oldPassword,
          newPassword: profileData.newPassword,
        });
        alert("Password updated successfully");
      }

      setEditingProfile(false);
      setChangingPassword(false);
      setShowProfile(false);
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Error updating profile");
    } finally {
      setLoading(false);
    }
  };

  const cancelEdit = () => {
    setEditingProfile(false);
    setSelectedFile(null);
    setPreview(null);
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
        <div className="container">
          <Link className="navbar-logo fw-bold" to="/Home">
            <img width="95px" height="80px" src="/logo-removebg-preview.png" alt="Logo" />
          </Link>
          {user && (
            <>
              <Link className="navbar-brand navbar-link fs-6" to="/Home">Home</Link>
              <Link className="navbar-brand navbar-link fs-6" to="#">New & Featured</Link>
              <Link className="navbar-brand navbar-link fs-6" to="#">Men</Link>
              <Link className="navbar-brand navbar-link fs-6" to="#">Women</Link>
              <Link className="navbar-brand navbar-link fs-6" to="#">Kids</Link>
              <Link className="navbar-brand navbar-link fs-6" to="#">SNKRS</Link>
            </>
          )}
          <div className="d-flex align-items-center gap-2">
            {user ? (
              <img
                src={profileData.photo || `https://ui-avatars.com/api/?name=${profileData.name}`}
                alt="profile"
                className="rounded-circle shadow-sm"
                style={{
                  width: "43px",
                  height: "43px",
                  cursor: "pointer",
                  objectFit: "cover",
                  border: "solid 1px white",
                }}
                onClick={() => setShowProfile((prev) => !prev)}
              />
            ) : (
              <>
                <Link className="btn btn-outline-primary me-2" to="/loginpage">Login</Link>
                <Link className="btn btn-outline-success me-2" to="/register">Register</Link>
              </>
            )}
          </div>
        </div>
      </nav>

      {showProfile && (
        <div
          ref={profileRef}
          className="card shadow-lg border-0 profile-card"
          style={{ position: "absolute", top: "70px", right: "10px", borderRadius: "15px", zIndex: 1000 }}
        >
          <div className="p-3 text-center">
            <img
              src={preview || profileData.photo || `https://ui-avatars.com/api/?name=${profileData.name}`}
              alt="profile"
              className="rounded-circle mb-2"
              style={{ width: "80px", height: "80px", objectFit: "cover" }}
            />
            <h6 className="mb-0">{profileData.name}</h6>
            <small className="text-muted">{profileData.email}</small>
          </div>
          <hr className="my-1" />

          {!editingProfile && !changingPassword && (
            <div className="p-3 d-flex flex-column gap-2">
              <button className="btn btn-outline-primary" onClick={() => setEditingProfile(true)}>Edit Profile</button>
              <button className="btn btn-outline-success" onClick={() => setChangingPassword(true)}>Change Password</button>
              <button className="btn btn-outline-danger" onClick={handleLogout}>Logout</button>
            </div>
          )}

          {editingProfile && (
            <div className="p-3 d-flex flex-column gap-2">
              {/* Name & Email */}
              <input type="text" name="name" value={profileData.name} onChange={(e) => setProfileData({ ...profileData, name: e.target.value })} className="form-control" placeholder="Name" />
              <input type="email" name="email" value={profileData.email} onChange={(e) => setProfileData({ ...profileData, email: e.target.value })} className="form-control" placeholder="Email" required />

              {/* Photo Upload */}
              <div className="text-center my-2">
                {preview && (
                  <img
                    src={preview}
                    alt="Preview"
                    className="rounded-circle mb-2"
                    style={{ width: "60px", height: "60px", objectFit: "cover", display: "block", margin: "0 auto 10px auto" }}
                  />
                )}
                <input type="file" className="form-control" onChange={handleFileChange} />
              </div>

              {/* Password Change */}
              {changingPassword && (
                <>
                  <div className="input-group my-2">
                    <input type={showOldPassword ? "text" : "password"} name="oldPassword" value={profileData.oldPassword} onChange={(e) => setProfileData({ ...profileData, oldPassword: e.target.value })} className="form-control" placeholder="Old Password" />
                    <button type="button" className="btn btn-outline-secondary" onClick={() => setShowOldPassword(prev => !prev)}>{showOldPassword ? "Hide" : "Show"}</button>
                  </div>
                  <div className="input-group my-2">
                    <input type={showNewPassword ? "text" : "password"} name="newPassword" value={profileData.newPassword} onChange={(e) => setProfileData({ ...profileData, newPassword: e.target.value })} className="form-control" placeholder="New Password" />
                    <button type="button" className="btn btn-outline-secondary" onClick={() => setShowNewPassword(prev => !prev)}>{showNewPassword ? "Hide" : "Show"}</button>
                  </div>
                </>
              )}

              {/* Save / Cancel */}
              <div className="d-flex gap-2 mt-2">
                <button className="btn btn-success flex-fill" onClick={handleSave} disabled={loading}>{loading ? "Saving..." : "Save"}</button>
                <button className="btn btn-secondary flex-fill" onClick={cancelEdit}>Cancel</button>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Navbar;
