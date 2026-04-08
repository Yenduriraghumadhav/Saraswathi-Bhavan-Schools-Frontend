import React from 'react'
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
      setLoading(true);
      const apiUrl = classApiMap[classId];

      if (!apiUrl) {
        const errorMsg = `No API found for class ${classId}`;
        console.error(errorMsg);
        setError(errorMsg);
        setLoading(false);
        return;
      }

      const response = await fetch(apiUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include",
      });
      const data = await response.json();
      const student = data.find(student =>
        student.stdRollNumber === rollNumber.toString()
      );

      if (!student) {
        setError(`Student with roll number ${rollNumber} not found in class ${classId}`);
        setLoading(false);
        return;
      }

      setMarksData(student);
    } catch (err) {
      console.error('Fetch error details:', err);
      setError('Failed to fetch marks data');
    } finally {
      setLoading(false);
    }
  };

  const getExamStatus = (examData) => {
    const hasMarks = Object.values(examData).some(mark => mark > 0);
    return hasMarks ? 'completed' : 'pending';
  };

  const renderMarksTable = () => {
    if (!marksData) return null;

    const subjects = ['telugu', 'hindi', 'english', 'maths', 'science', 'social'];
    const exams = ['mid', 'prefinal', 'final'];
    const calculateMidMetrics = () => {
      const midMarks = marksData.result.mid;
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
                        {getExamStatus(marksData.result[exam]) === 'completed'
                          ? '✅ Completed'
                          : '⏳ Pending'
                        }
                      </small>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {subjects.map(subject => (
                  <tr key={subject}>
                    <td>{subject.charAt(0).toUpperCase() + subject.slice(1)}</td>
                    {exams.map(exam => (
                      <td key={exam}>
                        {marksData.result[exam][subject] > 0
                          ? marksData.result[exam][subject]
                          : '-'
                        }
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>


          <div className="scorecard">
            <div className="scorecard-header">
              <h4>Mid-Term Analysis</h4>
              <span className={`status-badge ${metrics.feedbackClass}`}>{metrics.feedback}</span>
            </div>
            <div className="scorecard-body">
              <div className="stat-box">
                <span className="stat-label">Total Marks  : </span>
                <span className="stat-value">{metrics.total} <small>/ 600</small></span>
              </div>
              <div className="stat-box">
                <span className="stat-label">Average  : </span>
                <span className="stat-value">{metrics.average}%</span>
              </div>
            </div>
          </div>


          <div className="progress-card">
            <h4>Exam Progress</h4>
            <div className="progress-list">
              <div className="progress-item">
                <span>Mid-Term</span>
                <span className={`status-icon ${getExamStatus(marksData.result.mid)}`}>
                  {getExamStatus(marksData.result.mid) === 'completed' ? ' : completed' : ' : Pending'}
                </span>
              </div>
              <div className="progress-item">
                <span>Pre-final</span>
                <span className={`status-icon ${getExamStatus(marksData.result.prefinal)}`}>
                  {getExamStatus(marksData.result.prefinal) === 'completed' ? ' : completed' : ' : Pending'}
                </span>
              </div>
              <div className="progress-item">
                <span>Final Exam</span>
                <span className={`status-icon ${getExamStatus(marksData.result.final)}`}>
                  {getExamStatus(marksData.result.final) === 'completed' ? ' : completed' : ' : Pending'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  if (loading) {
    return <div className="loading">Loading student marks...</div>;
  }

  if (error) {
    return <div className="error"> {error}</div>;
  }

  return (
    <div className="marks-page-container">
      <div className="student-marks-app">
        {renderMarksTable()}
      </div>
      <div className="marks-footer-wrapper">
        <Footer />
      </div>
    </div>
  );
}

export default Marks