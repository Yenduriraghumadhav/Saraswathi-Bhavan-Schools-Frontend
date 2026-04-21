import axios from "axios";
import React, { useState } from "react";
import "./admin-marks-adding.css";

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

const classValueMap = {
    firstclass: 1,
    secondclass: 2,
    thirdclass: 3,
    fourthclass: 4,
    fifthclass: 5,
    sixthclass: 6,
    seventhclass: 7,
    eighthclass: 8,
    ninthclass: 9,
    tenthclass: 10,
};

const subjects = ["maths", "science", "english", "social", "hindi", "telugu"];

const TeacherMarksAdding = () => {
    const [selectedClass, setSelectedClass] = useState(null);
    const [resultType, setresultType] = useState("");
    const [operation, setOperation] = useState("post"); 
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
                classurl: classValueMap[selectedClass],
                resultType: resultType,
                result: formData.result
            };

            await axios.post(classApiMap[selectedClass], payload, {
                withCredentials: true
            });

            console.log("Data sent:", payload);
            alert("Marks added successfully!");
        } catch (err) {
            console.log(err);
            alert("Error adding marks");
        }
    };

    const handlePut = async () => {
        try {
            const payload = {
                stdRollNumber: formData.stdRollNumber,
                classurl: classValueMap[selectedClass],
                resultType: resultType,
                result: formData.result
            };

            await axios.put(classApiMap[selectedClass], payload, {
                withCredentials: true
            });

            console.log("Data updated:", payload);
            alert("Marks updated successfully!");
        } catch (err) {
            console.log(err);
            alert("Error updating marks");
        }
    };

    return (
        <div className="container">
            <div className="operation-group">
                <label>
                    <input
                        type="radio"
                        name="operation"
                        value="post"
                        checked={operation === "post"}
                        onChange={(e) => setOperation(e.target.value)}
                    /> Add Marks
                </label>
                <label>
                    <input
                        type="radio"
                        name="operation"
                        value="put"
                        checked={operation === "put"}
                        onChange={(e) => setOperation(e.target.value)}
                    /> Update Marks
                </label>
            </div>

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

            <div className="form">
                {operation === "post" && (
                    <input
                        placeholder="Student Name"
                        onChange={(e) =>
                            setFormData({ ...formData, stdName: e.target.value })
                        }
                    />
                )}
                <input
                    placeholder="Roll Number"
                    onChange={(e) =>
                        setFormData({ ...formData, stdRollNumber: e.target.value })
                    }
                />
            </div>

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

            <button
                className="submit-btn"
                onClick={operation === "post" ? handlePost : handlePut}
            >
                {operation === "post" ? "Submit Marks" : "Update Marks"}
            </button>
        </div>
    );
};

export default TeacherMarksAdding;