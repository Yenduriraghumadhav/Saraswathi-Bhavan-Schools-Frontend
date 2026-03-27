import React, { useState , } from 'react';
import './profile.css';
import "@fortawesome/fontawesome-free/css/all.min.css";

const Profile = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [profileImg, setProfileImg] = useState("https://cdn-icons-png.flaticon.com/512/3135/3135715.png");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImg(URL.createObjectURL(file));
    }
  };



    

  return (
    <div className={`profile-page ${darkMode ? 'dark-mode' : 'light-mode'}`}>
      <div className="profile-card">

        {/* Header with Theme Toggle */}
        <div className="card-header">
          <button className="theme-toggle" onClick={() => setDarkMode(!darkMode)}>
            {darkMode ? (
              <i className="fa-solid fa-moon"></i>
            ) : (
              <i className="fa-solid fa-moon"></i>
            )}
          </button>

        </div>

        {/* Profile Image Section */}
        <div className="avatar-section">
          <div className="avatar-wrapper">
            <img src={profileImg} alt="User Avatar" className="avatar-img" />
            <label htmlFor="file-input" className="edit-icon">
              <i className="bi bi-pencil-fill"></i>
            </label>
            <input id="file-input" type="file" onChange={handleImageChange} hidden />
          </div>
          <h2>My Profile</h2>
          <p className="subtitle">Update your personal information</p>
        </div>

        {/* Form Fields */}
        <form className="profile-form">
          <div className="form-row">
            <div className="input-box">
              <label>Full Name</label>
              <input type="text" placeholder="First Name" />
            </div>
          </div>

          <div className="input-box">
            <label>Email Address</label>
            <input type="email" placeholder="Email Address" />
          </div>

          <div className="input-box">
            <label>Mobile Number</label>
            <input type="" placeholder="Mobile Number" />
          </div>

          <div className="input-box">
            <label>RollNumber</label>
            <input type="text" placeholder="Roll Number" />
          </div>

          <div className="form-actions">
            <button type="submit" className="save-btn">Save Changes</button>
            <button type="button" className="logout-btn">
              <i className="bi bi-box-arrow-right"></i> Logout
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;