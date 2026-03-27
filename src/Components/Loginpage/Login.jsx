import React, { useState } from 'react'
import "./login.css"
import axios from 'axios'
import { data, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();
    const [loginType, setLoginType] = useState("student");
    const [loginDetails, setLoginDetails] = useState({
        stdemail: "",
        stdpassword: ""
    });

    const loginSubmit = async () => {
        if (!loginDetails.stdemail || !loginDetails.stdpassword) {
            alert("Please fill all fields");
            return;
        }

        try {
            const response = await axios.post("http://localhost:2001/api/userstudentlogin/studentLogin", loginDetails);
            localStorage.setItem("jwtToken", response.data.token);
            localStorage.setItem("role", response.data.user.role);
            alert("Login successful");
            navigate("/dashboard");
        } catch (error) {
            console.error("Login error:", error);
            alert("Login failed");
        }
    };

    return (
        <div className="page-container">
            <div className="login-container">
                <h2>Login</h2>
                <div className="login-toggle">
                    <button
                        type="button"
                        className={loginType === "student" ? "active-toggle" : ""}
                        onClick={() => setLoginType("student")}
                    >
                        Student
                    </button>

                    <button
                        type="button"
                        className={loginType === "teacher" ? "active-toggle" : ""}
                        onClick={() => setLoginType("teacher")}
                    >
                        Teacher
                    </button>
                </div>

                <form autoComplete="off" onSubmit={(e) => e.preventDefault()}>
                    {loginType === "student" ? (
                        <>
                            <div className="input-group">
                                <label>Email</label>
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    value={loginDetails.stdemail}
                                    onChange={(e) => setLoginDetails({ ...loginDetails, stdemail: e.target.value })}
                                />
                            </div>
                            <div className="input-group">
                                <label>Password</label>
                                <input
                                    type="password"
                                    placeholder="Enter your password"
                                    value={loginDetails.stdpassword}
                                    onChange={(e) => setLoginDetails({ ...loginDetails, stdpassword: e.target.value })}
                                />
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="input-group">
                                <label>Teacher Email</label>
                                <input
                                    type="email"
                                    placeholder="Enter teacher email"
                                />
                            </div>
                            <div className="input-group">
                                <label>Teacher Password</label>
                                <input
                                    type="password"
                                    placeholder="Enter teacher password"
                                />
                            </div>
                        </>
                    )}

                    <button className="login-btn" type="button" onClick={loginSubmit}>Login</button>
                    <div className="footer-text">
                        Don't have an account? <Link to="/profiledetails">Register</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login