import React from 'react'
import "./contactus.css"
import axios from 'axios';
import { useState } from 'react';

const ContactUs = () => {
  const [supportName, setsupportName] = useState("");
  const [supportEmail, setsupportEmail] = useState("");
  const [supportMobileNumber, setsupportMobileNumber] = useState("");

  async function submitdetails() {
    try {
      const conect = await axios.post("http://localhost:2001/api/getInTouchDetails/GetInTouchDetails", { supportName, supportEmail, supportMobileNumber })
      console.log(conect);
      alert("Details submitted successfully");
    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    }
  }


  return (
    <>

      <div className='contact-us-par'>

        <div className='locations'>
          <iframe
            src="https://www.google.com/maps?q=Indus+International+School+Kurnool&z=15&output=embed"
            width="70%"
            height="500"
            style={{ border: "0", margin: "40px 0" }}
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


        <div >
          <div className="contact-container" style={{ marginTop: "50px" }}>
            <h2 className="contact-title"> Get in touch with us!</h2>

            <div className="contactdetails">
              <input
                type="text"
                placeholder=" Name"
                style={{ width: '100%', padding: "12px 14px", textAlign: "left" }}
                className="contact-input"
                onChange={(e) => setsupportName(e.target.value)}
              />

              <input
                type="email"
                placeholder=" Email"
                className="contact-input"
                onChange={(e) => setsupportEmail(e.target.value)}
              />

              <input
                type="tel"
                placeholder=" Mobile number"
                className="contact-input"
                onChange={(e) => setsupportMobileNumber(e.target.value)}
              />

              <button className="contact-button" onClick={submitdetails}>Submit</button>
            </div>
          </div>
        </div>




      </div>

    </>
  )
}

export default ContactUs