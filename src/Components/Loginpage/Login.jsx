import React, { useState } from 'react'
import "./login.css"
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();
    const [loginType, setLoginType] = useState("student");
    const [loginDetails, setLoginDetails] = useState({ stdemail: "", stdpassword: "" });
    const [teacherLoginDetails, setTeacherLoginDetails] = useState({ TeacherEmail: "", TeacherPassword: "" });


    const studentLoginSubmit = async () => {
        if (!loginDetails.stdemail || !loginDetails.stdpassword) {
            alert("Please fill all student fields");
            return;
        }

        try {
            const response = await axios.post("http://localhost:2001/api/userstudentlogin/studentLogin", loginDetails, {
                withCredentials: true
            });
            localStorage.setItem("user", JSON.stringify(response.data.user));
            alert("Student login successful");
            navigate("/dashboard");
        } catch (error) {
            console.error("Student login error:", error);
            alert("Student login failed");
        }
    };

    const teacherLoginSubmit = async () => {
        if (!teacherLoginDetails.TeacherEmail || !teacherLoginDetails.TeacherPassword) {
            alert("Please fill all teacher fields");
            return;
        }

        try {
            const response = await axios.post("http://localhost:2001/api/userteacherlogin/teacherLogin", teacherLoginDetails, {
                withCredentials: true
            });
            localStorage.setItem("jwtToken", response.data.token);
            console.log("jwtToken", response.data.token);
            localStorage.setItem("role", response.data.user.role);
            console.log("role", response.data.user.role)
            localStorage.setItem("user", JSON.stringify(response.data.user));
            alert("Teacher login successful");
            navigate("/dashboard");
        } catch (error) {
            console.error("Teacher login error:", error);
            alert("Teacher login failed");
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
                                <label>StdEmail</label>
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    value={loginDetails.stdemail}
                                    onChange={(e) => setLoginDetails({ ...loginDetails, stdemail: e.target.value })}
                                />
                            </div>
                            <div className="input-group">
                                <label>StdPassword</label>
                                <input
                                    type="password"
                                    placeholder="Enter your password"
                                    value={loginDetails.stdpassword}
                                    onChange={(e) => setLoginDetails({ ...loginDetails, stdpassword: e.target.value })}
                                />
                            </div>
                            <button className="login-btn" type="button" onClick={studentLoginSubmit}>Student Login</button>
                        </>
                    ) : (
                        <>
                            <div className="input-group">
                                <label>Teacher Email</label>
                                <input
                                    type="email"
                                    placeholder="Enter teacher email"
                                    value={teacherLoginDetails.TeacherEmail}
                                    onChange={(e) => setTeacherLoginDetails({ ...teacherLoginDetails, TeacherEmail: e.target.value })}
                                />
                            </div>
                            <div className="input-group">
                                <label>Teacher Password</label>
                                <input
                                    type="password"
                                    placeholder="Enter teacher password"
                                    value={teacherLoginDetails.TeacherPassword}
                                    onChange={(e) => setTeacherLoginDetails({ ...teacherLoginDetails, TeacherPassword: e.target.value })}
                                />
                            </div>
                            <button className="login-btn" type="button" onClick={teacherLoginSubmit}>Teacher Login</button>
                        </>
                    )}

                    {loginType === "student" ? (
                        <div className="footer-text">
                            <Link to="/forgot-password">Forgotten Password?</Link>
                        </div>
                    ) : (
                        <div className="footer-text">
                            <Link to="/forgot-password-for-teachers">Forgotten Password?</Link>
                        </div>
                    )}

                </form>
            </div >
        </div >
    )
}

export default Login