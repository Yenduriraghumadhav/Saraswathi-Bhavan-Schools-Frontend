import React, { useState } from "react";
import "./adminlogin.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Adminlogin = () => {
    const [adminEmail, setadminEmail] = useState("");
    const [adminPassword, setadminPassword] = useState("");
    const navigate = useNavigate();

    async function submitDetails() {
        try {
            const sendingData = await axios.post("http://localhost:2001/api/adminLogin/AdminLoginDetails",
                {
                    email: adminEmail,
                    password: adminPassword
                },
                { withCredentials: true }
            );
            localStorage.setItem("user", JSON.stringify({
                role: "admin",
                name: sendingData.data.adminSchool.adminName,
                email: sendingData.data.adminSchool.adminEmail,
                mobile: sendingData.data.adminSchool.adminPhoneNumber
            }));
            alert("login successfully");
            navigate("/dashboard");
        } catch (error) {
            console.error("Login error:", error);
            alert("Login failed. Please try again.");
        }
    }


    return (
        <>
            <div className="adminparent">
                <div className="adminlogin">
                    <input className="adminemail" placeholder="example@gmail.com" type="email" onChange={(e) => setadminEmail(e.target.value)}></input>
                    <input className="adminpassword" placeholder="Password" type="password" onChange={(e) => setadminPassword(e.target.value)}></input>
                    <button className="adiminbutton" onClick={submitDetails}>Submit</button>
                </div>
            </div>
        </>
    );
};

export default Adminlogin;