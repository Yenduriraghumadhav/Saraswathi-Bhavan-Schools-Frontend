import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "./navbar.css";


const Navbar = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [role, setRole] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userStr = localStorage.getItem("user");
    const userRole = localStorage.getItem("role");

    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        setRole(user.role);
      } catch (e) {
        setRole(userRole);
      }
    } else {
      setRole(userRole);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("role");
    localStorage.removeItem("jwtToken");
    navigate("/login");
  };
  return (
    <>
      <nav className="navbar">
        <div className="nav-container">
          <div className="nav-logo">
            {(role === 'student' || role === 'teacher') ? (
              <span className="logo-text">Saraswathi<span className="highlight">Bhavan</span></span>
            ) : (
              <Link to="/" className="logo-text">Saraswathi<span className="highlight">Bhavan</span></Link>
            )}
          </div>

          <ul className={isMobile ? "nav-links-mobile" : "nav-links"} onClick={() => setIsMobile(false)}>

            {(role === 'admin' || role === "teacher") && (
              <li><Link to="/dashboard" className="nav-item">Dashboard</Link></li>
            )}

            {role === 'student' && (
              <li><Link to="/studentdashboard" className="nav-item">Dashboard</Link></li>
            )}

            {(role === "admin") && (
              <li><Link to="/teacherSignUppage" className="nav-item">Add-Teachers</Link></li>
            )}

            {(role === "admin") && (
              <li><Link to="/profiledetails" className="nav-item">Add-Students</Link></li>
            )}

            {(role === 'student') && (
              <li><Link to="/marks" className="nav-item">Marks</Link></li>
            )}

            {(role === 'admin') && (
              <li><Link to="/adminaddingmarks" className="nav-item">Adding Marks</Link></li>
            )}

            {(role === 'teacher') && (
              <li><Link to="/teachermarksadding" className="nav-item">Adding Marks</Link></li>
            )}

            <li><Link to="/aboutus" className="nav-item">About Us</Link></li>

            {!role && (
              <li>
                <button onClick={handleLogout} className="nav-item-logout" style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer', padding: '0 15px' }}>
                  Logout
                </button>
              </li>
            )}
            {(role === 'admin' || role === 'student' || role === "teacher") && (
              <li><Link to="/profile" className="nav-item">Profile</Link></li>
            )}

            {!role && (
              <li>
                <Link to="/contactus" className="nav-item btn-contact">Contact Us</Link>
              </li>
            )}
          </ul>
          <button className="mobile-menu-icon" onClick={() => setIsMobile(!isMobile)}>
            {isMobile ? <i className="bi bi-x"></i> : <i className="bi bi-list"></i>}
          </button>
        </div>
      </nav>
    </>
  )
}

export default Navbar