import React, { useState } from 'react';
import "./rollnumbercheck.css";
import axios from 'axios';

const RollnumberCheck = () => {
    const [rollcheck, setrollcheck] = useState("");

    const detailsSubmit = async () => {
        try {
            const response = await axios.get(
                "http://localhost:3001/rollnumbercheck"
            );

            const users = response.data;

            const matchedUsers = users.filter(
                (user) =>
                    user.rollNumber === rollcheck
            );

            if (matchedUsers) {
                alert("Login successful");
            } else {
                alert("Invalid roll number");
            }

        } catch (error) {
            console.error("AXIOS ERROR 👉", error);
            alert("Verification failed");
        }
    };

    return (
        <>
            <div className="parentrollcheck">
                <div className="childrollcheck">
                    <h2 className="title"> Enter valid RollNumber 😊</h2>

                    <input
                        type="text"
                        className="inputfield"
                        placeholder="Enter Roll Number"
                        onChange={(e) => setrollcheck(e.target.value)}
                    />

                    <button className="submitbtn" onClick={detailsSubmit}>Submit</button>
                </div>
            </div>
        </>
    );
};

export default RollnumberCheck;
