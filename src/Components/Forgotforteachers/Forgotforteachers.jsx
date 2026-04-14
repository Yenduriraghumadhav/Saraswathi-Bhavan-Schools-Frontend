import React from 'react'
import {  useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Forgotforteachers = () => {

  const [teacheremail, setTeacheremail] = useState("");
  const [otps, setOtps] = useState("");
  const [newpassword, setnewpassword] = useState("");
  const [resetToken, setresetToken] = useState("");
  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  async function sendtheEmail() {
    try {
      await axios.post(`http://localhost:2001/api/otpforteachers/sendteachersotp`, { teacheremail });
      alert("OTP sent successfully");
      setStep(2);
    } catch (err) {
      console.error(err);
    }
  }

  async function submitotp() {
    try {
      const res = await axios.post(`http://localhost:2001/api/otpforteachers/verifyteacherotp`, { teacheremail, otps });
      setresetToken(res.data.resetToken);
      alert("OTP verified");
      setStep(3);
    } catch (err) {
      console.error(err);
    }
  }


  async function resetPassword() {
    try {
      await axios.post(`http://localhost:2001/api/otpforteachers/resetteacherpassword`, {
        teacheremail,
        resetToken,
        newpassword
      });
      alert("Password reset successfully!");
      navigate("/login");
    } catch (err) {
      console.error("Reset error:", err);
      alert("Error resetting password: " + (err.response?.data?.message || err.message));
    }
  }

  return (
    <div className="forgot-container">
      {step === 1 && (
        <div className="card">
          <h2>Rest Password</h2>
          <input
            type="text"
            placeholder="Enter Email"
            value={teacheremail}
            onChange={(e) => setTeacheremail(e.target.value)}
          />
          <button onClick={sendtheEmail}>Send OTP</button>
        </div>
      )}


      {step === 2 && (
        <div className="card">
          <h2>Verify OTP</h2>
          <input
            type="text"
            placeholder="Enter OTP"
            value={otps}
            onChange={(e) => setOtps(e.target.value)}
          />
          <button onClick={submitotp}>Verify OTP</button>
        </div>
      )}



      {step === 3 && (
        <div className="card">
          <h2>Reset Password</h2>
          <input
            type="password"
            placeholder="Enter New Password"
            value={newpassword}
            onChange={(e) => setnewpassword(e.target.value)}
          />
          <button onClick={resetPassword}>Reset Password</button>
        </div>
      )}

    </div>
  );
}

export default Forgotforteachers    