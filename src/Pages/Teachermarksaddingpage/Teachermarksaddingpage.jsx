import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './teachermarksaddingpage.css';

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

export default function Teachermarksaddingpage() {
  const [operation, setOperation] = useState('post');
  const [resultType, setResultType] = useState('mid');
  const [formData, setFormData] = useState({ stdName: '', stdRollNumber: '', result: {} });
  const [assignedKey, setAssignedKey] = useState(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem('user');
      if (!raw) return;
      const user = JSON.parse(raw);
      const tac = user?.TeacherAssignedclass;
      const key = Object.keys(classValueMap).find(k => classValueMap[k] === tac) || null;
      setAssignedKey(key);
    } catch (err) {
      console.error('Error reading assigned class', err);
    }
  }, []);

  const handleMarksChange = (subject, value) => {
    setFormData(prev => ({ ...prev, result: { ...prev.result, [subject]: Number(value) } }));
  };

  const handleSubmit = async () => {
    const userData = localStorage.getItem('user');
    const userParsed = JSON.parse(userData);
    const teachClass = userParsed?.TeacherAssignedclass;
    const key = assignedKey;
    if (!key) return alert('No assigned class found for this teacher');
    const endpoint = classApiMap[key];
    if (!endpoint) return alert('No API endpoint for assigned class');

    const payload = {
      stdName: formData.stdName,
      stdRollNumber: formData.stdRollNumber,
      classurl: classValueMap[key],
      resultType,
      result: formData.result
    };

    try {
      if (operation === 'post') {
        await axios.post(endpoint, payload, { params: { teachClass }, withCredentials: true });
        alert('Marks added');
      } else {
        await axios.put(endpoint, { stdRollNumber: formData.stdRollNumber, resultType, result: formData.result }, { params: { teachClass }, withCredentials: true });
        alert('Marks updated');
      }
    } catch (err) {
      console.error('Submit error', err);
      alert('Error submitting marks; see console');
    }
  };

  return (
    <div className="teacher-marks-page">
      <h2>Marks Entry</h2>

      <div className="operation-group">
        <label>
          <input type="radio" name="operation" value="post" checked={operation === 'post'} onChange={e => setOperation(e.target.value)} /> Add Marks
        </label>
        <label>
          <input type="radio" name="operation" value="put" checked={operation === 'put'} onChange={e => setOperation(e.target.value)} /> Update Marks
        </label>
      </div>

      <div style={{ textAlign: 'center', marginBottom: 12 }}>
        <strong>Assigned class:</strong> {assignedKey ? classValueMap[assignedKey] : 'Not assigned'}
      </div>

      <div className="form">
        {operation === 'post' && (
          <input placeholder="Student Name" value={formData.stdName} onChange={e => setFormData({ ...formData, stdName: e.target.value })} />
        )}
        <input placeholder="Roll Number" value={formData.stdRollNumber} onChange={e => setFormData({ ...formData, stdRollNumber: e.target.value })} />
      </div>

      <div className="radio-group" style={{ justifyContent: 'center' }}>
        <label><input type="radio" name="resultType" value="mid" checked={resultType === 'mid'} onChange={e => setResultType(e.target.value)} /> Mid</label>
        <label><input type="radio" name="resultType" value="prefinal" checked={resultType === 'prefinal'} onChange={e => setResultType(e.target.value)} /> Pre-Final</label>
        <label><input type="radio" name="resultType" value="final" checked={resultType === 'final'} onChange={e => setResultType(e.target.value)} /> Final</label>
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
            {subjects.map(sub => (
              <tr key={sub}>
                <td style={{ textTransform: 'capitalize' }}>{sub}</td>
                <td>
                  <input type="number" onChange={e => handleMarksChange(sub, e.target.value)} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div style={{ textAlign: 'center', marginTop: 16 }}>
        <button className="submit-btn" onClick={handleSubmit}>{operation === 'post' ? 'Submit Marks' : 'Update Marks'}</button>
      </div>

      <div style={{ height: 80 }} />
    </div>
  );
}
