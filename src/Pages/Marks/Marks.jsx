import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import './Marks.css';

const Marks = () => {
  console.log("Marks component rendering");

  const [studentData, setStudentData] = useState(null);
  const [marksData, setMarksData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');


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
      const response = await axios.get('http://localhost:2001/api/totalstudentmarks/filteredstudentmarks', {
        params: { rollNumber: rollNumber, stdclass: classId },
        withCredentials: true
      });

      const data = response.data;
      const student = data?.data || data?.result || data;

      if (!student) {
        setError('Student not found');
        setLoading(false);
        return;
      }

      setMarksData(student);

    } catch (err) {
      console.error(err);
      setError('Failed to fetch marks data');
    } finally {
      setLoading(false);
    }
  };

  const calculateExamTotals = (exam) => {
    const subjects = ['telugu', 'hindi', 'english', 'maths', 'science', 'social'];
    const examMarks = marksData?.result?.[exam] || {};
    const scores = subjects.map(s => Number(examMarks[s] ?? 0));
    const total = scores.reduce((a, b) => a + b, 0);
    const maxTotal = subjects.length * 100;
    const percentage = maxTotal > 0 ? ((total / maxTotal) * 100).toFixed(1) : '0.0';
    return { total, percentage };
  };

  const getExamStatus = (examData) => {
    if (!examData) return "pending";

    return Object.values(examData).some(mark => mark != null)
      ? "completed"
      : "pending";
  };


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


    if (exams.length === 0) {
      return (
        <div className="no-results">
          <h3>No Results Yet</h3>
          <p>Your marks will appear once exams are conducted.</p>
        </div>
      );
    }

    

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
                    <td style={{ textTransform: 'capitalize' }}>{subject}</td>
                    {exams.map(exam => (
                      <td key={exam}>
                        {marksData?.result?.[exam]?.[subject] ?? "-"}
                      </td>
                    ))}
                  </tr>
                ))}
                {/* Totals row */}
                <tr>
                  <td><strong>Total</strong></td>
                  {exams.map(exam => {
                    const { total } = calculateExamTotals(exam);
                    return <td key={exam}><strong>{total}</strong></td>;
                  })}
                </tr>
                <tr>
                  <td><strong>Percentage</strong></td>
                  {exams.map(exam => {
                    const { percentage } = calculateExamTotals(exam);
                    return <td key={exam}><strong>{percentage}%</strong></td>;
                  })}
                </tr>
              </tbody>
            </table>
          </div>


          

          <div style={{ display: 'flex', gap: 12, marginTop: 16, alignItems: 'center' }}>
            <div className="progress-card">
              <h4>Exam Progress</h4>
              <div className="progress-list">
                {exams.map((exam) => (
                  <div className="progress-item" key={exam}>
                    <span style={{ textTransform: 'capitalize' }}>{exam}</span>
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
    </div>
  );
};

export default Marks;