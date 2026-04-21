import React, { useState } from 'react';
import "./Forgot-password.css";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {

    const [email, setEmail] = useState("");
    const [otps, setOtps] = useState("");
    const [newpassword, setnewpassword] = useState("");
    const [resetToken, setresetToken] = useState("");
    const [step, setStep] = useState(1);
    const [cooldown, setCooldown] = useState(0);
    const navigate = useNavigate();


    React.useEffect(() => {
        let timer;
        if (cooldown > 0) {
            timer = setInterval(() => {
                setCooldown((prev) => prev - 1);
            }, 1000);
        }
        return () => clearInterval(timer);
    }, [cooldown]);

    async function sendtheEmail() {
        if (cooldown > 0) return;

        try {
            await axios.post(`http://localhost:2001/api/otpforstudents/sendotp`, { email });
            alert("OTP sent successfully");
            setCooldown(30);
            setStep(2);
        } catch (err) {
            console.error(err);
            alert("Error sending OTP");
        }
    }

    async function submitotp() {
        try {
            const res = await axios.post(`http://localhost:2001/api/otpforstudents/verifyotp`, { email, otps });
            setresetToken(res.data.resetToken);
            alert("OTP verified");
            setStep(3);
        } catch (err) {
            console.error(err);
        }
    }


    async function resetPassword() {
        try {
            await axios.post(`http://localhost:2001/api/otpforstudents/resetpassword`, {
                email,
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
                        style={{ width: "100%", padding: "12px 16px", borderRadius: "12px", border: "1px solid var(--input-border)", background: "transparent", color: "var(--text-main)", fontSize: "0.95rem", transition: "0.3s", boxSizing: "border-box" }}
                        placeholder="Enter Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <button
                        onClick={sendtheEmail}
                        disabled={cooldown > 0}
                        className={cooldown > 0 ? "throttled" : ""}
                    >
                        {cooldown > 0 ? `Resend in ${cooldown}s` : "Send OTP"}
                    </button>
                </div>
            )}


            {step === 2 && (
                <div className="card">
                    <h2>Verify OTP</h2>
                    <input
                        type="text"
                        style={{ width: "100%", padding: "12px 16px", borderRadius: "12px", border: "1px solid var(--input-border)", background: "transparent", color: "var(--text-main)", fontSize: "0.95rem", transition: "0.3s", boxSizing: "border-box" }}
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
                        style={{ width: "100%", padding: "12px 16px", borderRadius: "12px", border: "1px solid var(--input-border)", background: "transparent", color: "var(--text-main)", fontSize: "0.95rem", transition: "0.3s", boxSizing: "border-box" }}
                        placeholder="Enter New Password"
                        value={newpassword}
                        onChange={(e) => setnewpassword(e.target.value)}
                    />
                    <button onClick={resetPassword}>Reset Password</button>
                </div>
            )}

        </div>
    );
};

export default ForgotPassword;