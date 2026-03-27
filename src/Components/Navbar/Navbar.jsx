import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import "./navbar.css";


const Navbar = () => {
  const [isMobile, setIsMobile] = useState(false);
  return (
    <>
      <nav className="navbar">
        <div className="nav-container">
          <div className="nav-logo">
            <Link to="/dashboard" className="logo-text">Saraswathi<span className="highlight">Bhavan</span></Link>
          </div>

          <ul className={isMobile ? "nav-links-mobile" : "nav-links"} onClick={() => setIsMobile(false)}>
            <li><Link to="/marks" className="nav-item">Marks</Link></li>
            <li><Link to="/payments" className="nav-item">Payments</Link></li>
            <li><Link to="/aboutus" className="nav-item">About Us</Link></li>
            <li><Link to="/profile" className="nav-item">Profile</Link></li>
            <li><Link to="/contactus" className="nav-item btn-contact">Contact Us</Link></li>
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