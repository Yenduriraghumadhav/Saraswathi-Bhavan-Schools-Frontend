import React from 'react'
import 'bootstrap-icons/font/bootstrap-icons.css';
import schoollogo from "../../assets/schoollogo.jpg";
import './footer.css';
import '@fortawesome/fontawesome-free/css/all.min.css';



const Footer = () => {
  return (
      <>
        <div className='footer-parent'>

          <div className='footer-image'>
            <img src={schoollogo} className='footerimgs' alt="school-logo" />
            <h6 >“Education is the vaccine of violence.”</h6>
          </div>

          <div className='footer-section'>
            <h3>ADDRESS</h3>
            <p>Saraswathi Bhavan Higher Secondary School,</p>
            <p>No.12, 1st Main Road,</p>
            <p>Kurnool, Andhra Pradesh - 620018.</p>
          </div>

          <div className='footer-section'>
            <h3>EMAIL</h3>
            <a href="mailto:raghumadhav2002@gmail.com"><i className="bi bi-envelope"></i> raghumadhav2002@gmail.com</a>
            <a href="mailto:raghumadhav1998@gmail.com"><i className="bi bi-envelope"></i> raghumadhav1998@gmail.com</a>
            <a href="mailto:raghu.m@payswiff.com"><i className="bi bi-envelope"></i> raghu.m@payswiff.com</a>
          </div>

          <div className='footer-section'>
            <h3>CONTACT</h3>
            <a href="tel:+918019763503"><i className="bi bi-telephone"></i> +91 80197 63503</a>
            <a href="tel:+919505114404"><i className="bi bi-telephone"></i> +91 95051 14404</a>
            <a href="tel:+919966750710"><i className="bi bi-telephone"></i> +91 99667 50710</a>
          </div>

          <div className='footerwhatsuplogo'>
            <a
              href="https://wa.me/8019763503"
              className="whatsapp-float"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fa-brands fa-whatsapp my-float"></i>
            </a>
          </div>

        </div>

        <div className="footer-bottom">
          © {new Date().getFullYear()} Saraswathi Bhavan Higher Secondary School. All Rights Reserved.
        </div>
      </>
  )
}

export default Footer;
