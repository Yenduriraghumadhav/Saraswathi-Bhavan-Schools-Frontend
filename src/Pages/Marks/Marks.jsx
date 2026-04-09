import React from 'react';
import { useState, useEffect } from 'react';
import './Marks.css';
import Footer from '../../Components/Footer/Footer';

const Marks = () => {
  console.log("Marks component rendering");

  const [studentData, setStudentData] = useState(null);
  const [marksData, setMarksData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const classApiMap = {
    1: "http://localhost:2001/api/firstclass/Firstclassstudents",
    2: "http://localhost:2001/api/secondclass/Secondclassstudents",
    3: "http://localhost:2001/api/thirdclass/Thirdclassstudents",
    4: "http://localhost:2001/api/fourthclass/fourthclassstudents",
    5: "http://localhost:2001/api/fifthclass/fifthclassstudents",
    6: "http://localhost:2001/api/sixthclass/sixthclassstudents",
    7: "http://localhost:2001/api/seventhclass/seventhclassstudents",
    8: "http://localhost:2001/api/eighthclass/eighthclassstudents",
    9: "http://localhost:2001/api/ninthclass/ninthclassstudents",
    10: "http://localhost:2001/api/tenthclass/tenthclassstudents",
  };

  useEffect(() => {
    fetchStudentData();
  }, []);

  const fetchStudentData = () => {
    try {
      const storedData = localStorage.getItem('user');
      if (!storedData) {
        setError('No student data found in localStorage');
        setLoading(false);
        return;
      }

      const user = JSON.parse(storedData);
      setStudentData(user);

      const classId = user.class || user.stdclass;
      const rollNumber = user.rollnumber || user.stdrollNumber;

      fetchMarks(classId, rollNumber);
    } catch (err) {
      setError('Error reading localStorage data');
      setLoading(false);
    }
  };

  const fetchMarks = async (classId, rollNumber) => {
    try {
      const dta = localStorage.getItem('user');
      const parseddata = JSON.parse(dta);
      const Rollnumber = parseddata.rollnumber || parseddata.stdrollNumber;
      setLoading(true);
      const apiUrl = classApiMap[classId];

      if (!apiUrl) {
        setError(`No API found for class ${classId}`);
        setLoading(false);
        return; 
      }

      const response = await fetch(`${apiUrl}?rollNumber=${rollNumber}`, {
        method: "GET",
        credentials: "include"
      });

      const data = await response.json();
      console.log("API Response :", data);


      const studentsArray = data.students || [];

      const student = studentsArray.find(
        (s) => s.stdRollNumber === rollNumber.toString()
      );

      console.log("student found :", student);

      if (!student) {
        setError(`Student not found`);
        setLoading(false);
        return;
      }

      console.log("Fetched marks data:", student);
      setMarksData(student);

    } catch (err) {
      console.error(err);
      setError('Failed to fetch marks data');
    } finally {
      setLoading(false);
    }
  };

  const getExamStatus = (examData) => {
    if (!examData) return "pending";

    return Object.values(examData).some(mark => mark != null)
      ? "completed"
      : "pending";
  };

  // ✅ NEW
  const getAvailableExams = (result) => {
    if (!result) return [];

    const exams = ["mid", "prefinal", "final"];

    return exams.filter((exam) => {
      const examData = result[exam];

      return (
        examData &&
        Object.values(examData).some(val => val != null)
      );
    });
  };

  const renderMarksTable = () => {
    if (!marksData) return null;

    const subjects = ['telugu', 'hindi', 'english', 'maths', 'science', 'social'];
    const exams = getAvailableExams(marksData.result);

    // ✅ No exams yet
    if (exams.length === 0) {
      return (
        <div className="no-results">
          <h3>No Results Yet</h3>
          <p>Your marks will appear once exams are conducted.</p>
        </div>
      );
    }

    const calculateMidMetrics = () => {
      const midMarks = marksData?.result?.mid;

      if (!midMarks) {
        return { total: 0, average: 0, feedback: "Pending", feedbackClass: "" };
      }

      const scores = Object.values(midMarks).filter(score => typeof score === 'number');
      const total = scores.reduce((acc, score) => acc + score, 0);
      const average = scores.length > 0 ? (total / scores.length).toFixed(1) : 0;

      let feedback = 'Pending';
      let feedbackClass = '';

      if (getExamStatus(midMarks) === 'completed') {
        if (average >= 80) {
          feedback = 'Good';
          feedbackClass = 'feedback-good';
        } else if (average >= 50) {
          feedback = 'Average';
          feedbackClass = 'feedback-average';
        } else {
          feedback = 'Bad';
          feedbackClass = 'feedback-bad';
        }
      }

      return { total, average, feedback, feedbackClass };
    };

    const metrics = calculateMidMetrics();

    return (
      <div className="marks-page-wrapper">
        <div className="marks-table-container">
          <h3>{studentData?.stdname}'s Marks - Class {studentData?.class}</h3>

          <div className="table-responsive">
            <table className="marks-table">
              <thead>
                <tr>
                  <th>Subject</th>
                  {exams.map(exam => (
                    <th key={exam}>
                      {exam.toUpperCase()}
                      <br />
                      <small>
                        {getExamStatus(marksData?.result?.[exam]) === 'completed'
                          ? '✅ Completed'
                          : '⏳ Pending'}
                      </small>
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {subjects.map(subject => (
                  <tr key={subject}>
                    <td>{subject}</td>
                    {exams.map(exam => (
                      <td key={exam}>
                        {marksData?.result?.[exam]?.[subject] ?? "-"}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* ✅ Scorecard (only if mid exists) */}
          {exams.includes("mid") && (
            <div className="scorecard">
              <div className="scorecard-header">
                <h4>Mid-Term Analysis</h4>
                <span className={`status-badge ${metrics.feedbackClass}`}>
                  {metrics.feedback}
                </span>
              </div>

              <div className="scorecard-body">
                <div className="stat-box">
                  <span>Total: </span>
                  <span>{metrics.total} / 600</span>
                </div>
                <div className="stat-box">
                  <span>Average: </span>
                  <span>{metrics.average}%</span>
                </div>
              </div>
            </div>
          )}

          {/* ✅ Dynamic Progress */}
          <div className="progress-card">
            <h4>Exam Progress</h4>
            <div className="progress-list">
              {exams.map((exam) => (
                <div className="progress-item" key={exam}>
                  <span>{exam}</span>
                  <span className={`status-icon ${getExamStatus(marksData?.result?.[exam])}`}>
                    {getExamStatus(marksData?.result?.[exam]) === 'completed'
                      ? ' : completed'
                      : ' : Pending'}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    );
  };

  if (loading) return <div className="loading">Loading student marks...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="marks-page-container">
      <div className="student-marks-app">
        {renderMarksTable()}
      </div>
      <Footer />
    </div>
  );
};

export default Marks;