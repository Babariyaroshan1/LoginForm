// import React, { useState, useEffect, useRef } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import axios from "axios";

// const Navbar = ({ user, setUser }) => {
//   const navigate = useNavigate();
//   const [showProfile, setShowProfile] = useState(false);
//   const [editingProfile, setEditingProfile] = useState(false);
//   const [changingPassword, setChangingPassword] = useState(false);
//   const [showOldPassword, setShowOldPassword] = useState(false);
//   const [showNewPassword, setShowNewPassword] = useState(false);
//   const [profileData, setProfileData] = useState({ name: "", email: "", photo: "", oldPassword: "", newPassword: "" });
//   const profileRef = useRef(null);

//   useEffect(() => {
//     if (user) {
//       setProfileData({ name: user.name, email: user.email, photo: user.photo || "", oldPassword: "", newPassword: "" });
//     }
//   }, [user]);

//   useEffect(() => {
//     function handleClickOutside(e) {
//       if (profileRef.current && !profileRef.current.contains(e.target)) {
//         setShowProfile(false); setEditingProfile(false); setChangingPassword(false);
//       }
//     }
//     if (showProfile) document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, [showProfile]);

//   const handleLogout = () => { setUser(null); navigate("/loginpage"); };

//   const handleChange = (e) => {
//     const { name, value, files } = e.target;
//     if (name === "photo") {
//       const reader = new FileReader();
//       reader.onload = () => setProfileData({ ...profileData, photo: reader.result });
//       reader.readAsDataURL(files[0]);
//     } else {
//       setProfileData({ ...profileData, [name]: value });
//     }
//   };

//   const handleSave = async () => {
//     try {
//       if (editingProfile) {
//         const resProfile = await axios.put(`http://localhost:5000/api/update-profile/${encodeURIComponent(user.email)}`, profileData, { maxBodyLength: Infinity });
//         alert(resProfile.data.message); setUser(resProfile.data.user);
//       }
//       if (changingPassword && profileData.oldPassword && profileData.newPassword) {
//         await axios.put(`http://localhost:5000/api/update-password/${encodeURIComponent(user.email)}`, { oldPassword: profileData.oldPassword, newPassword: profileData.newPassword });
//         alert("Password updated successfully");
//       }
//       setEditingProfile(false); setChangingPassword(false); setShowProfile(false);
//     } catch (err) {
//       alert(err.response?.data?.message || "Error updating profile");
//     }
//   };

//   return (
//     <>
//       <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
//         <div className="container">
//           <Link className="navbar-brand fw-bold" to="#">MyApp</Link>
//           {user && <>
//             <Link className="navbar-brand" to="/Home">Home</Link>
//             <Link className="navbar-brand fs-6" to="/about">About Us</Link>
//             <Link className="navbar-brand fs-6" to="/services">Service</Link>
//             <Link className="navbar-brand fs-6" to="/career">Career</Link>
//             <Link className="navbar-brand fs-6" to="/blog">Blog</Link>
//             <Link className="navbar-brand fs-6" to="/footer">Contact Us</Link>
//           </>}
//           <div className="d-flex align-items-center gap-2">
//             {user ? (
//               <img src={profileData.photo || "https://via.placeholder.com/35"} alt="profile" className="rounded-circle shadow-sm" style={{ width: "43px", height: "43px", cursor: "pointer", objectFit: "cover", border: "solid 1px white" }} onClick={() => setShowProfile((prev) => !prev)} />
//             ) : (
//               <>
//                 <Link className="btn btn-outline-primary me-2" to="/loginpage">Login</Link>
//                 <Link className="btn btn-outline-success me-2" to="/register">Register</Link>
//               </>
//             )}
//           </div>
//         </div>
//       </nav>

//       {showProfile && (
//         <div ref={profileRef} className="card shadow-lg border-0" style={{ position: "absolute", top: "45px", right: 10, width: "320px", borderRadius: "15px", zIndex: 1000 }}>
//           <div className="p-3 text-center">
//             <img src={profileData.photo || "https://via.placeholder.com/80"} alt="profile" className="rounded-circle mb-2" style={{ width: "80px", height: "80px", objectFit: "cover" }} />
//             <h6 className="mb-0">{profileData.name}</h6>
//             <small className="text-muted">{profileData.email}</small>
//           </div>
//           <hr className="my-1" />

//           {!editingProfile && !changingPassword && (
//             <div className="p-3 d-flex flex-column gap-2">
//               <button className="btn btn-outline-primary" onClick={() => setEditingProfile(true)}>Edit Profile</button>
//               <button className="btn btn-outline-success" onClick={() => setChangingPassword(true)}>Change Password</button>
//               <button className="btn btn-outline-danger" onClick={handleLogout}>Logout</button>
//             </div>
//           )}

//           {editingProfile && (
//             <div className="p-3 d-flex flex-column gap-2">
//               <input type="text" name="name" value={profileData.name} onChange={handleChange} className="form-control" placeholder="Name" />
//               <input type="email" name="email" value={profileData.email} onChange={handleChange} className="form-control" placeholder="Email" />
//               <input type="file" name="photo" accept="image/*" onChange={handleChange} className="form-control" />
//               <button className="btn btn-success" onClick={handleSave}>Save</button>
//               <button className="btn btn-secondary" onClick={() => setEditingProfile(false)}>Cancel</button>
//             </div>
//           )}

//           {changingPassword && (
//             <div className="p-3 d-flex flex-column gap-2">
//               <div className="input-group">
//                 <input type={showOldPassword ? "text" : "password"} name="oldPassword" value={profileData.oldPassword} onChange={handleChange} className="form-control" placeholder="Old Password" />
//                 <button type="button" className="btn btn-outline-secondary" onClick={() => setShowOldPassword((prev) => !prev)}>{showOldPassword ? "Hide" : "Show"}</button>
//               </div>
//               <div className="input-group">
//                 <input type={showNewPassword ? "text" : "password"} name="newPassword" value={profileData.newPassword} onChange={handleChange} className="form-control" placeholder="New Password" />
//                 <button type="button" className="btn btn-outline-secondary" onClick={() => setShowNewPassword((prev) => !prev)}>{showNewPassword ? "Hide" : "Show"}</button>
//               </div>
//               <button className="btn btn-success" onClick={handleSave}>Save</button>
//               <button className="btn btn-secondary" onClick={() => setChangingPassword(false)}>Cancel</button>
//             </div>
//           )}
//         </div>
//       )}
//     </>
//   );
// };

// export default Navbar;


import React, { useState, useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import API_URL from "../config"; // Backend base URL

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
    photo: "",
    oldPassword: "",
    newPassword: ""
  });
  const profileRef = useRef(null);

  // Load profile from user state
  useEffect(() => {
    if (user) {
      setProfileData({
        name: user.name,
        email: user.email,
        photo: user.photo || "",
        oldPassword: "",
        newPassword: ""
      });
    }
  }, [user]);

  // Close profile card on outside click
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

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "photo") {
      const reader = new FileReader();
      reader.onload = () =>
        setProfileData({ ...profileData, photo: reader.result });
      reader.readAsDataURL(files[0]);
    } else {
      setProfileData({ ...profileData, [name]: value });
    }
  };

  const handleSave = async () => {
    try {
      // Update profile (name + photo)
      if (editingProfile) {
        const resProfile = await axios.put(
          `${API_URL}/update-profile/${encodeURIComponent(user.email)}`,
          {
            name: profileData.name,
            photo: profileData.photo
          }
        );

        setUser(resProfile.data.user);
        localStorage.setItem("user", JSON.stringify(resProfile.data.user.photo));
         alert("profile updated successfully");
      }

      // Update password separately
      if (changingPassword && profileData.oldPassword && profileData.newPassword) {
        await axios.put(
          `${API_URL}/update-password/${encodeURIComponent(user.email)}`,
          {
            oldPassword: profileData.oldPassword,
            newPassword: profileData.newPassword
          }
        );
        alert("Password updated successfully");
      }

      setEditingProfile(false);
      setChangingPassword(false);
      setShowProfile(false);
    } catch (err) {
      alert(err.response?.data?.message || "Error updating profile");
    }
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
        <div className="container">
          <Link className="navbar-brand fw-bold" to="#">
            MyApp
          </Link>
          {user && (
            <>
              <Link className="navbar-brand" to="/home">
                Home
              </Link>
              <Link className="navbar-brand fs-6" to="/about">
                About Us
              </Link>
              <Link className="navbar-brand fs-6" to="/services">
                Service
              </Link>
              <Link className="navbar-brand fs-6" to="/career">
                Career
              </Link>
              <Link className="navbar-brand fs-6" to="/blog">
                Blog
              </Link>
              <Link className="navbar-brand fs-6" to="/footer">
                Contact Us
              </Link>
            </>
          )}
          <div className="d-flex align-items-center gap-2">
            {user ? (
              <img
                src={profileData.photo || "https://placehold.co/35x35"}
                alt="profile"
                className="rounded-circle shadow-sm"
                style={{
                  width: "43px",
                  height: "43px",
                  cursor: "pointer",
                  objectFit: "cover",
                  border: "solid 1px white"
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
      </nav>

      {showProfile && (
        <div
          ref={profileRef}
          className="card shadow-lg border-0"
          style={{
            position: "absolute",
            top: "45px",
            right: 10,
            width: "320px",
            borderRadius: "15px",
            zIndex: 1000
          }}
        >
          <div className="p-3 text-center">
            <img
              src={profileData.photo || "https://placehold.co/80x80"}
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

          {editingProfile && (
            <div className="p-3 d-flex flex-column gap-2">
              <input
                type="text"
                name="name"
                value={profileData.name}
                onChange={handleChange}
                className="form-control"
                placeholder="Name"
              />
              <input
                type="email"
                name="email"
                value={profileData.email}
                onChange={handleChange}
                className="form-control"
                placeholder="Email"
                disabled
              />
              <input
                type="file"
                name="photo"
                accept="image/*"
                onChange={handleChange}
                className="form-control"
              />
              <button className="btn btn-success" onClick={handleSave}>
                Save
              </button>
              <button
                className="btn btn-secondary"
                onClick={() => setEditingProfile(false)}
              >
                Cancel
              </button>
            </div>
          )}

          {changingPassword && (
            <div className="p-3 d-flex flex-column gap-2">
              <div className="input-group">
                <input
                  type={showOldPassword ? "text" : "password"}
                  name="oldPassword"
                  value={profileData.oldPassword}
                  onChange={handleChange}
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
              <div className="input-group">
                <input
                  type={showNewPassword ? "text" : "password"}
                  name="newPassword"
                  value={profileData.newPassword}
                  onChange={handleChange}
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
              <button className="btn btn-success" onClick={handleSave}>
                Save
              </button>
              <button
                className="btn btn-secondary"
                onClick={() => setChangingPassword(false)}
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Navbar;

