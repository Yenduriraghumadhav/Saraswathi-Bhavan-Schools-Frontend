import React, { useState, useEffect } from "react";
import "./dashboard.css";
import students1 from "../../assets/home-students2.jpg";
import students2 from "../../assets/home-students1.jpg";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import Footer from "../Footer/Footer.jsx";
import Home from "../../Pages/Home/Home.jsx";

const Dashboard = () => {
  const [conditionstate, setconditionstate] = useState(null);
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    const role = localStorage.getItem("role");
    const CLASS_URLS = [
      'http://localhost:2001/api/firstclass/Firstclassstudents',
      'http://localhost:2001/api/secondclass/Secondclassstudents',
      'http://localhost:2001/api/thirdclass/Thirdclassstudents',
      'http://localhost:2001/api/fourthclass/fourthclassstudents',
      'http://localhost:2001/api/fifthclass/fifthclassstudents',
      'http://localhost:2001/api/sixthclass/sixthclassstudents',
      'http://localhost:2001/api/seventhclass/seventhclassstudents',
      'http://localhost:2001/api/eighthclass/eighthclassstudents',
      'http://localhost:2001/api/ninthclass/ninthclassstudents',
      'http://localhost:2001/api/tenthclass/tenthclassstudents'
    ];

    async function fetchAllClasses() {

      try {
        setLoading(true);
        const fetches = CLASS_URLS.map(url =>
          fetch(url, {
            headers: {
              'Authorization': `Bearer ${token}`,
              "role" : role
            }
          }).then(res => res.json().catch(() => []))
        );
        const allClassData = await Promise.all(fetches);
        const classStats = CLASS_URLS.map((url, index) => {
          const data = allClassData[index] || [];
          const examStats = {
            mid: { total: 0, passed: 0 },
            prefinal: { total: 0, passed: 0 },
            final: { total: 0, passed: 0 }
          };

          data.forEach((student) => {
            ["mid", "prefinal", "final"].forEach((exam) => {
              const subjects = student?.result?.[exam];
              if (!subjects) return;
              Object.values(subjects).forEach((marks) => {
                examStats[exam].total++;
                if (marks >= 30) {
                  examStats[exam].passed++;
                }
              });
            });
          });
          return {
            class: `Class ${index + 1}`,
            mid: examStats.mid.total > 0 ? Math.round((examStats.mid.passed / examStats.mid.total) * 100) : 0,
            prefinal: examStats.prefinal.total > 0 ? Math.round((examStats.prefinal.passed / examStats.prefinal.total) * 100) : 0,
            final: examStats.final.total > 0 ? Math.round((examStats.final.passed / examStats.final.total) * 100) : 0
          };

        });
        setChartData(classStats);
      } catch (error) {
        console.error('Fetch error:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchAllClasses();
  }, []);


  // 🔹 CLASS MAPPING
  const classMap = {
    firstclass: "Class 1",
    secondclass: "Class 2",
    thirdclass: "Class 3",
    fourthclass: "Class 4",
    fifthclass: "Class 5",
    sixthclass: "Class 6",
    seventhclass: "Class 7",
    eighthclass: "Class 8",
    ninthclass: "Class 9",
    tenthclass: "Class 10"
  };


  // 🔹 FILTER GRAPH DATA
  const filteredData = conditionstate
    ? chartData.filter((item) => item.class === classMap[conditionstate])
    : chartData;


  return (
    <>
      <div>

        <div className="container mt-4">
          <div id="carouselExampleControls" className="carousel slide mb-5" data-bs-ride="carousel">
            <div className="container mt-4">
              <div
                id="carouselExampleControls"
                className="carousel slide mb-5"
                data-bs-ride="carousel"
              >
                <div className="carousel-inner">

                  <div className="carousel-item active">
                    <img
                      style={{ borderRadius: "10px" }}
                      className="d-block w-100"
                      src={students1}
                      alt="First slide"
                    />

                    <div className="carousel-caption d-none d-md-block">
                      <h3 style={{ color: "white" }}>
                        Welcome to Saraswathi School
                      </h3>

                      <p style={{ color: "white" }}>
                        Empowering young minds with knowledge and values.
                      </p>
                    </div>
                  </div>

                  <div className="carousel-item">
                    <img
                      style={{ borderRadius: "10px" }}
                      className="d-block w-100"
                      src={students2}
                      alt="Second slide"
                    />

                    <div className="carousel-caption d-none d-md-block">
                      <h3 style={{ color: "white" }}>
                        Modern Classrooms
                      </h3>

                      <p style={{ color: "white" }}>
                        Experience interactive and digital learning.
                      </p>
                    </div>
                  </div>

                  <div className="carousel-item">
                    <img
                      style={{ borderRadius: "10px" }}
                      className="imgescorosal d-block w-100"
                      src="https://d3bat55ebwjhsf.cloudfront.net/schools/infra/images/dghbgfjy856j.jpeg"
                      alt="Third slide"
                    />

                    <div className="carousel-caption d-none d-md-block">
                      <h3 style={{ color: "white" }}>
                        Modern Classrooms
                      </h3>

                      <p style={{ color: "white" }}>
                        Experience interactive and digital learning.
                      </p>
                    </div>
                  </div>

                </div>
                <button
                  className="carousel-control-prev"
                  type="button"
                  data-bs-target="#carouselExampleControls"
                  data-bs-slide="prev"
                >
                  <span
                    className="carousel-control-prev-icon"
                    aria-hidden="true"
                  ></span>
                  <span className="visually-hidden">Previous</span>
                </button>
                <button
                  className="carousel-control-next"
                  type="button"
                  data-bs-target="#carouselExampleControls"
                  data-bs-slide="next"
                >
                  <span
                    className="carousel-control-next-icon"
                    aria-hidden="true"
                  ></span>
                  <span className="visually-hidden">Next</span>
                </button>
              </div>
            </div>
          </div>


          <div className="dashbord-container d-flex flex-wrap justify-content-center align-items-center gap-3 p-4">

            <button onClick={() => setconditionstate(null)} className="btn btn-dark">
              All Classes
            </button>

            <button onClick={() => setconditionstate("firstclass")} className="btn1">1'st Class</button>
            <button onClick={() => setconditionstate("secondclass")} className="btn2">2'nd Class</button>
            <button onClick={() => setconditionstate("thirdclass")} className="btn3">3'rd Class</button>
            <button onClick={() => setconditionstate("fourthclass")} className="btn4">4'th Class</button>
            <button onClick={() => setconditionstate("fifthclass")} className="btn5">5'th Class</button>
            <button onClick={() => setconditionstate("sixthclass")} className="btn6">6'th Class</button>
            <button onClick={() => setconditionstate("seventhclass")} className="btn7">7'th Class</button>
            <button onClick={() => setconditionstate("eighthclass")} className="btn8">8'th Class</button>
            <button onClick={() => setconditionstate("ninthclass")} className="btn9">9'th Class</button>
            <button onClick={() => setconditionstate("tenthclass")} className="btn10">10'th Class</button>

          </div>

        </div>


        <div className="container mt-4">
          {loading ? (
            <div>Loading chart data...</div>
          ) : (
            <>
              <div style={{ textAlign: "center" }}>
                <h3>School Pass Percentage</h3>
              </div>
              <div style={{ width: '100%', height: 400 }}>
                <ResponsiveContainer>
                  <BarChart data={filteredData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="class" />
                    <YAxis unit="%" />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="mid" fill="#8884d8" name="Mid" />
                    <Bar dataKey="prefinal" fill="#82ca9d" name="Prefinal" />
                    <Bar dataKey="final" fill="#ffc658" name="Final" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </>
          )}
        </div>


   
   <div>
    <Home/>
   </div>
      </div>

      <div className="footer-details">
        <Footer />
      </div>
    </>
  );
};

export default Dashboard;