import React from 'react'
import "./contactus.css"
import Footer from '../../Components/Footer/Footer';

const ContactUs = () => {
  return (
    <>

    <div className='contact-us-par'>








      <div className='locations'>
        <iframe
          src="https://www.google.com/maps?q=Indus+International+School+Kurnool&z=15&output=embed"
          width="70%"
          height="500"
          style={{ border: "0" , margin: "40px 0" }}
          allowfullscreen
          loading="lazy">
        </iframe>

        <div>
          <h1>Location : </h1>
          <p>SaraswathiBhavan School ,</p>
          <p> Kurnool, Andhra Pradesh ,</p>
          <p> India - 318132 .</p>

        </div>
      </div>


      <div>
        <div className="contact-container">
          <h2 className="contact-title"> Get in touch with us!</h2>

          <div className="contactdetails">
            <input
              type="text"
              placeholder=" Name"
              className="contact-input"
            />

            <input
              type="email"
              placeholder=" Email"
              className="contact-input"
            />

            <input
              type="tel"
              placeholder=" Mobile number"
              className="contact-input"
            />

            <button className="contact-button">Submit</button>
          </div>
        </div>
      </div>


      <div style={{ marginTop: "50px" }}>
        <Footer />
      </div>


    </div>

    </>
  )
}

export default ContactUs