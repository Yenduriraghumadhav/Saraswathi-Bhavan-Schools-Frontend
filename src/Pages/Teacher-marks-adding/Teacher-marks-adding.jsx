import axios from "axios";
import React, { useState } from "react";
import "./teacher-marks-adding.css";

const classApiMap = {
    firstclass: "http://localhost:2001/api/firstclass/Firstclassstudents",
    secondclass: "http://localhost:2001/api/secondclass/Secondclassstudents",
    thirdclass: "http://localhost:2001/api/thirdclass/Thirdclassstudents",
    fourthclass: "http://localhost:2001/api/fourthclass/fourthclassstudents",
    fifthclass: "http://localhost:2001/api/fifthclass/fifthclassstudents",
    sixthclass: "http://localhost:2001/api/sixthclass/sixthclassstudents",
    seventhclass: "http://localhost:2001/api/seventhclass/seventhclassstudents",
    eighthclass: "http://localhost:2001/api/eighthclass/eighthclassstudents",
    ninthclass: "http://localhost:2001/api/ninthclass/ninthclassstudents",
    tenthclass: "http://localhost:2001/api/tenthclass/tenthclassstudents",
};

const subjects = ["maths", "science", "english", "social", "hindi", "telugu"];

const TeacherMarksAdding = () => {
    const [selectedClass, setSelectedClass] = useState(null);
    const [resultType, setresultType] = useState("");
    const [formData, setFormData] = useState({
        stdName: "",
        stdRollNumber: "",
        result: {}
    });

    const fetchData = async (classKey) => {
        // try {
        //     await axios.get(classApiMap[classKey], { withCredentials: true });
        //     setSelectedClass(classKey);
        // } catch (err) {
        //     console.log(err);
        // }
        setSelectedClass(classKey);
    };

    // 🔥 Handle subject marks
    const handleMarksChange = (subject, value) => {
        setFormData({
            ...formData,
            result: {
                ...formData.result,
                [subject]: value
            }
        });
    };


    const handlePost = async () => {
        try {
            const payload = {
                stdName: formData.stdName,
                stdRollNumber: formData.stdRollNumber,
                resultType: resultType,
                result: formData.result
            };

            await axios.post(classApiMap[selectedClass], payload, {
                withCredentials: true
            });

            console.log("Data sent:", payload);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="container">
            <div className="button-group">
                {Object.keys(classApiMap).map((key) => (
                    <button
                        key={key}
                        onClick={() => fetchData(key)}
                        className={selectedClass === key ? "active" : ""}
                    >
                        {key}
                    </button>
                ))}
            </div>

            {/* 🔵 Form */}
            <div className="form">
                <input placeholder="Student Name" onChange={(e) =>
                    setFormData({ ...formData, stdName: e.target.value })
                } />
                <input placeholder="Roll Number" onChange={(e) =>
                    setFormData({ ...formData, stdRollNumber: e.target.value })
                } />
            </div>

            {/* 🔵 Radio */}
            <div className="radio-group">
                <label>
                    <input type="radio" name="resultType" value="mid"
                        onChange={(e) => setresultType(e.target.value)} /> Mid
                </label>

                <label>
                    <input type="radio" name="resultType" value="prefinal"
                        onChange={(e) => setresultType(e.target.value)} /> Pre-Final
                </label>

                <label>
                    <input type="radio" name="resultType" value="final"
                        onChange={(e) => setresultType(e.target.value)} /> Final
                </label>
            </div>

            <div className="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>Subject</th>
                            <th>Marks</th>
                        </tr>
                    </thead>
                    <tbody>
                        {subjects.map((sub) => (
                            <tr key={sub}>
                                <td>{sub}</td>
                                <td>
                                    <input
                                        type="number"
                                        onChange={(e) => handleMarksChange(sub, e.target.value)}
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <button className="submit-btn" onClick={handlePost}>
                Submit Marks
            </button>
        </div>
    );
};

export default TeacherMarksAdding;