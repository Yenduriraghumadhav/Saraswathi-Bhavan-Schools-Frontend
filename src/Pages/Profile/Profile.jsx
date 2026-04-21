import React, { useState, useEffect } from 'react';
import './profile.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

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
    const parsed = raw ? JSON.parse(raw) : {};
    const { stdemail, TeacherEmail, adminEmail, email, role } = parsed;
    const logoutemail = stdemail || TeacherEmail || adminEmail || email;
    const logoutrole = role;

    if (!raw) return;
    let savedUser = null;
    try {
      savedUser = JSON.parse(raw);
    } catch (err) {
      console.error('Failed to parse user from localStorage', err);
      return;
    }


    if (!savedUser) return;

    setRole(savedUser.role || "student");

    setProfileData({
      fullName: savedUser.stdname || savedUser.TeacherName || savedUser.name || savedUser.adminName || "",
      email: savedUser.stdemail || savedUser.TeacherEmail || savedUser.email || savedUser.adminEmail || "",
      mobileNumber: savedUser.stdphoneNumber || savedUser.TeacherPhone || savedUser.mobile || savedUser.adminPhoneNumber || "",
      rollNumber: savedUser.stdrollNumber || "",
      address: savedUser.TeacherAddress || ""
    });

    console.log(savedUser);

    setAvatarUrl(
      savedUser.stdImage ||
      savedUser.TeacherImage ||
      savedUser.profilePic ||
      "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
    );
  }, []);

  const imgSrc = avatarUrl
    ? (avatarUrl.startsWith('http://') || avatarUrl.startsWith('https://')
      ? avatarUrl
      : `http://localhost:2001/uploads/${avatarUrl}`)
    : 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png';

  console.log("imgsrc", imgSrc);


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


  const handleLogout = async () => {
    try {
      const raw = localStorage.getItem("user");

      const parsed = raw ? JSON.parse(raw) : {};

      const { stdemail, TeacherEmail, adminEmail, email, role } = parsed;

      const logoutemail = stdemail || TeacherEmail || adminEmail || email;
      const logoutrole = role;

      const res = await axios.post("http://localhost:2001/api/totallogout/totallogoutDetails", { logoutemail, logoutrole }, { withCredentials: true });

      localStorage.clear();
      navigate("/login");

    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  return (
    <div className="profile-page">
      <div className="profile-card">
        <div className="avatar-section">
          <div className="avatar-wrapper">
            <img className="avatar-img" src={imgSrc} alt="User Avatar" />
          </div>
        </div>

        <form className="profile-form" onSubmit={handleSave}>
          <div className="input-box">
            <label>Full Name</label>
            <input type="text" style={{ width: '100%', padding: "12px 14px", textAlign: "left" }} value={profileData.fullName} readOnly onChange={handleInputChange('fullName')} />
          </div>

          <div className="input-box">
            <label>Email</label>
            <input type="email" style={{ width: '100%' }} value={profileData.email} readOnly onChange={handleInputChange('email')} />
          </div>

          <div className="input-box">
            <label>Mobile</label>
            <input type="tel" style={{ width: '100%', padding: "12px 14px" }} value={profileData.mobileNumber} readOnly onChange={handleInputChange('mobileNumber')} />
          </div>

          {role === "teacher" && (
            <div className="input-box">
              <label>Address</label>
              <input type="text" style={{ width: '100%', padding: "12px 14px" }} value={profileData.address} readOnly onChange={handleInputChange('address')} />
            </div>
          )}

          {role === "student" && (
            <div className="input-box">
              <label>Roll Number</label>
              <input type="text" style={{ width: '100%', padding: "12px 14px", textAlign: "left" }} value={profileData.rollNumber} readOnly onChange={handleInputChange('rollNumber')} />
            </div>
          )}

          <div className="form-actions">
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