import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const API_URL = "https://loginform-lqc0.onrender.com/api"; // backend base URL

const Navbar = ({ user, setUser }) => {
  const [profileData, setProfileData] = useState({
    email: user?.email || "",
    name: user?.name || "",
    profilePhoto: "",
    oldPassword: "",
    newPassword: "",
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [savedPhoto, setSavedPhoto] = useState(null);
  const [preview, setPreview] = useState(null);

  const [showProfile, setShowProfile] = useState(false);
  const [editingProfile, setEditingProfile] = useState(false);
  const [changingPassword, setChangingPassword] = useState(false);

  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const profileRef = useRef(null);

  // ✅ backend se photo fetch (email encode fix)
  useEffect(() => {
    if (user?.email) {
      axios
        .get(`${API_URL}/user/${encodeURIComponent(user.email)}`)
        .then((res) => {
          if (res.data?.profilePhoto) {
            setSavedPhoto(`${API_URL}${res.data.profilePhoto}`);
          }
        })
        .catch((err) => console.error("Error fetching profile:", err));
    }
  }, [user]);

  // ✅ file select preview
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  // ✅ photo upload backend me save karna
  const handleSave = async () => {
    setLoading(true);
    try {
      if (editingProfile && selectedFile) {
        const formData = new FormData();
        formData.append("profilePhoto", selectedFile);
        await axios.put(`${API_URL}/update-profile/${encodeURIComponent(user.email)}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }
      alert("Changes saved successfully!");
      setEditingProfile(false);
      setChangingPassword(false);
      setShowProfile(false);
    } catch (err) {
      console.error("Error uploading:", err);
      alert("Failed to save changes");
    }
    setLoading(false);
  };

  const cancelEdit = () => {
    setEditingProfile(false);
    setChangingPassword(false);
    setPreview(null);
    setSelectedFile(null);
    setShowProfile(false);
  };

  const handleLogout = () => {
    setUser(null);
    setShowProfile(false);
  };

  // ✅ close card when click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfile(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
      <div className="container">
        {/* ✅ Logo */}
        <Link className="navbar-logo fw-bold" to="/home">
          <img
            width="95px"
            height="80px"
            src="./public/logo-removebg-preview.png"
            alt="Logo"
          />
        </Link>

        {/* ✅ Navbar links */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/home">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about">
                About
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/contact">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* ✅ User Section */}
        <div className="d-flex align-items-center gap-2">
          {user ? (
            <img
              src={
                preview ||
                savedPhoto ||
                profileData.photo ||
                "https://via.placeholder.com/40?text=User"
              }
              alt="Profile"
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
              <Link className="btn btn-outline-primary me-2" to="/loginpage">
                Login
              </Link>
              <Link className="btn btn-outline-success me-2" to="/register">
                Register
              </Link>
            </>
          )}
        </div>
      </div>

      {/* ✅ Profile Card */}
      {showProfile && user && (
        <div
          ref={profileRef}
          className="card shadow-lg border-0 profile-card"
          style={{
            position: "absolute",
            top: "70px",
            right: "10px",
            borderRadius: "15px",
            zIndex: 1000,
          }}
        >
          <div className="p-3 text-center">
            <img
              src={
                preview ||
                savedPhoto ||
                `https://ui-avatars.com/api/?name=${profileData.name}`
              }
              alt="profile"
              className="rounded-circle mb-2"
              style={{ width: "80px", height: "80px", objectFit: "cover" }}
            />
            <h6 className="mb-0">{profileData.name || "User"}</h6>
            <small className="text-muted">{profileData.email}</small>
          </div>
          <hr className="my-1" />

          {/* default buttons */}
          {!editingProfile && !changingPassword && (
            <div className="p-3 d-flex flex-column gap-2">
              <button
                className="btn btn-outline-primary"
                onClick={() => setEditingProfile(true)}
              >
                Edit Profile
              </button>
              <button
                className="btn btn-outline-success"
                onClick={() => setChangingPassword(true)}
              >
                Change Password
              </button>
              <button className="btn btn-outline-danger" onClick={handleLogout}>
                Logout
              </button>
            </div>
          )}

          {/* edit profile */}
          {editingProfile && (
            <div className="p-3 d-flex flex-column gap-2">
              <input
                type="text"
                name="name"
                value={profileData.name}
                onChange={(e) =>
                  setProfileData({ ...profileData, name: e.target.value })
                }
                className="form-control"
                placeholder="Name"
              />
              <input
                type="email"
                name="email"
                value={profileData.email}
                onChange={(e) =>
                  setProfileData({ ...profileData, email: e.target.value })
                }
                className="form-control"
                placeholder="Email"
              />

              {/* photo upload */}
              <div className="text-center my-2">
                {preview && (
                  <img
                    src={preview}
                    alt="Preview"
                    className="rounded-circle mb-2"
                    style={{
                      width: "60px",
                      height: "60px",
                      objectFit: "cover",
                      display: "block",
                      margin: "0 auto 10px auto",
                    }}
                  />
                )}
                <input
                  type="file"
                  className="form-control"
                  onChange={handleFileChange}
                />
              </div>

              {/* save/cancel */}
              <div className="d-flex gap-2 mt-2">
                <button
                  className="btn btn-success flex-fill"
                  onClick={handleSave}
                  disabled={loading}
                >
                  {loading ? "Saving..." : "Save"}
                </button>
                <button
                  className="btn btn-secondary flex-fill"
                  onClick={cancelEdit}
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          {/* change password */}
          {changingPassword && (
            <div className="p-3 d-flex flex-column gap-2">
              <div className="input-group my-2">
                <input
                  type={showOldPassword ? "text" : "password"}
                  name="oldPassword"
                  value={profileData.oldPassword}
                  onChange={(e) =>
                    setProfileData({
                      ...profileData,
                      oldPassword: e.target.value,
                    })
                  }
                  className="form-control"
                  placeholder="Old Password"
                />
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={() => setShowOldPassword((prev) => !prev)}
                >
                  {showOldPassword ? "Hide" : "Show"}
                </button>
              </div>

              <div className="input-group my-2">
                <input
                  type={showNewPassword ? "text" : "password"}
                  name="newPassword"
                  value={profileData.newPassword}
                  onChange={(e) =>
                    setProfileData({
                      ...profileData,
                      newPassword: e.target.value,
                    })
                  }
                  className="form-control"
                  placeholder="New Password"
                />
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={() => setShowNewPassword((prev) => !prev)}
                >
                  {showNewPassword ? "Hide" : "Show"}
                </button>
              </div>

              <div className="d-flex gap-2 mt-2">
                <button
                  className="btn btn-success flex-fill"
                  onClick={handleSave}
                  disabled={loading}
                >
                  {loading ? "Saving..." : "Save"}
                </button>
                <button
                  className="btn btn-secondary flex-fill"
                  onClick={cancelEdit}
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
