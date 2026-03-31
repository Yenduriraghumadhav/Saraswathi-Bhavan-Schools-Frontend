import React, { useState, useEffect } from 'react';
import './profile.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const [avatarUrl, setAvatarUrl] = useState('https://cdn-icons-png.flaticon.com/512/3135/3135715.png');
  const [role, setRole] = useState('student');
  const [profileData, setProfileData] = useState({
    fullName: '',
    email: '',
    mobileNumber: '',
    rollNumber: '',
    address: ''
  });
  const navigate = useNavigate();



  useEffect(() => {
    const raw = localStorage.getItem("user");
    console.log("RAW:", raw);

    const savedUser = JSON.parse(raw);
    console.log("PARSED:", savedUser);

    if (!savedUser) return;

    setRole(savedUser.role || "student");

    setProfileData({
      fullName: savedUser.stdname || savedUser.TeacherName || savedUser.name || "",
      email: savedUser.stdemail || savedUser.TeacherEmail || savedUser.email || "",
      mobileNumber: savedUser.stdphoneNumber || savedUser.TeacherPhone || savedUser.mobile || "",
      rollNumber: savedUser.stdrollNumber || "",
      address: savedUser.TeacherAddress || ""
    });

    setAvatarUrl(
      savedUser.stdImage ||
      savedUser.TeacherImage ||
      savedUser.profilePic ||
      "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
    );
  }, []);

  const handleInputChange = (field) => (event) => {
    setProfileData((prev) => ({
      ...prev,
      [field]: event.target.value
    }));
  };

  const handleSave = (event) => {
    event.preventDefault();
    localStorage.setItem("user", JSON.stringify({
      ...JSON.parse(localStorage.getItem("user")),
      ...profileData
    }));
    alert("Profile updated");
  };

  const handleLogout = () => {
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("user");
    localStorage.removeItem("role");
    console.log('🚫 After removal - token:', localStorage.getItem("jwtToken"));
    navigate("/login");
  };

  return (
    <div className="profile-page">
      <div className="profile-card">
        <div className="avatar-section">
          <div className="avatar-wrapper">
            <img className="avatar-img" src={avatarUrl} alt="User Avatar" />
          </div>
        </div>

        <form className="profile-form" onSubmit={handleSave}>
          <div className="input-box">
            <label>Full Name</label>
            <input type="text" value={profileData.fullName} onChange={handleInputChange('fullName')} />
          </div>

          <div className="input-box">
            <label>Email</label>
            <input type="email" value={profileData.email} onChange={handleInputChange('email')} />
          </div>

          <div className="input-box">
            <label>Mobile</label>
            <input type="tel" value={profileData.mobileNumber} onChange={handleInputChange('mobileNumber')} />
          </div>

          {role === "teacher" ? (
            <div className="input-box">
              <label>Address</label>
              <input type="text" value={profileData.address} onChange={handleInputChange('address')} />
            </div>
          ) : (
            <div className="input-box">
              <label>Roll Number</label>
              <input type="text" value={profileData.rollNumber} onChange={handleInputChange('rollNumber')} />
            </div>
          )}

          <div className="form-actions">
            {/* <button type="submit" className="save-btn">Save</button> */}
            <button type="button" className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;