import React, { useState, useEffect } from "react";
import "./dashboard.css";
import students1 from "../../assets/home-students2.jpg";
import students2 from "../../assets/home-students1.jpg";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Cell } from 'recharts';
import Footer from "../Footer/Footer.jsx";
import { BiHome } from "react-icons/bi";
import Home from "../../Pages/Home/Home.jsx";

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



const calculatePassPercentage = (students) => {
  const subjects = ["telugu", "hindi", "social", "maths", "science", "english"];
  return subjects.map(subject => {
    const passCount = students.filter(std => std.result?.final?.[subject] >= 35).length;
    const total = students.length || 1;
    return {
      subject: subject.charAt(0).toUpperCase() + subject.slice(1),
      passPercentage: Math.round((passCount / total) * 100)
    };
  });
};

const Dashboard = () => {
  const [conditionstate, setconditionstate] = useState("firstclass"); 
  const [studentData, setStudentData] = useState([]);

  const colors = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#0088FE", "#FFBB28"];

useEffect(() => {
  if (conditionstate) {
    fetch(classApiMap[conditionstate], {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include",
    })
      .then(res => {
        if (res.status === 401) {
          throw new Error("Unauthorized! Please login again.");
        }
        return res.json();
      })
      .then(data => {
        // if (Array.isArray(data)) {
        //   setStudentData(calculatePassPercentage(data));
        // } else {
        //   setStudentData([]);
        // }
        setStudentData(calculatePassPercentage(data.students || []));
      })
      .catch(err => console.error("Error fetching data:", err));
  }
}, [conditionstate]);

  return (
    <>
      <div className="container mt-4">

        <div id="carouselExampleControls" className="carousel slide mb-5" data-bs-ride="carousel">
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img style={{ borderRadius: "10px" }} className="d-block w-100" src={students1} alt="First slide" />
              <div className="carousel-caption d-none d-md-block">
                <h3 style={{ color: "white" }}>Welcome to Saraswathi School</h3>
                <p style={{ color: "white" }}>Empowering young minds with knowledge and values.</p>
              </div>
            </div>
            <div className="carousel-item">
              <img style={{ borderRadius: "10px" }} className="d-block w-100" src={students2} alt="Second slide" />
              <div className="carousel-caption d-none d-md-block">
                <h3 style={{ color: "white" }}>Modern Classrooms</h3>
                <p style={{ color: "white" }}>Experience interactive and digital learning.</p>
              </div>
            </div>
          </div>
          <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>



        <div className="dashbord-container d-flex flex-wrap justify-content-center align-items-center gap-3 p-4">
          {Object.keys(classApiMap).map((cls, index) => {
            const label = ["1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th", "9th", "10th"][index];
            return (
              <button key={index} onClick={() => setconditionstate(cls)} className={`btn${index + 1}`}>
                {label} Class
              </button>
            );
          })}
        </div>


        <div style={{ width: "100%", height: 400, marginTop: "50px" }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={studentData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="subject" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="passPercentage" fill="#8884d8">
                {studentData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div>
        <Home />
      </div>
      <div className="footer-details">
        <Footer />
      </div>
    </>
  );
};

export default Dashboard;