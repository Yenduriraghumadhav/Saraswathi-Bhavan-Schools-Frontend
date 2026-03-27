import React, { useState } from 'react';
import axios from 'axios';  
import './TeacherDetails.css';

const TeacherDetails = () => {
  const [formData, setFormData] = useState({
    TeacherName: '',
    TeacherEmail: '',
    TeacherPhone: '',
    TeacherAddress: '',
    TeacherPassword: '',
    TeacherGender: ''
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post('http://localhost:2001/api/userteacherdetails/TeacherDetails', formData);

      alert('Teacher saved successfully!');
      setFormData({ TeacherName: '', TeacherEmail: '', TeacherPhone: '', TeacherAddress: '', TeacherPassword: '', TeacherSubject: '', TeacherGender: '' });
    } catch (error) {
      alert('Error saving teacher: ' + (error.response?.data?.message || 'Try again'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="teacher-container">
      <div className="form-card">
        <h1 className="title">👨‍🏫 Teacher Details</h1>
        <p className="subtitle">Complete the form below</p>

        <form onSubmit={handleSubmit} className="teacher-form">
  
          <div className="form-group">
            <label>Full Name</label>
            <input
              type="text"
              name="TeacherName"           
              value={formData.TeacherName}
              onChange={handleChange}
              placeholder="Enter full name"
              required
            />
          </div>

       
          <div className="form-group">
            <label>Email Address</label>
            <input
              type="email"
              name="TeacherEmail"          
              value={formData.TeacherEmail}
              onChange={handleChange}
              placeholder="teacher@example.com"
              required
            />
          </div>

      
          <div className="form-group">
            <label>Phone Number</label>
            <input
              type="tel"
              name="TeacherPhone"         
              value={formData.TeacherPhone}
              onChange={handleChange}
              placeholder=" 98765 43210"
              required
            />
          </div>

     
          <div className="form-group">
            <label>Address</label>
            <textarea
              name="TeacherAddress"        
              rows="4"
              value={formData.TeacherAddress}
              onChange={handleChange}
              placeholder="Enter complete address"
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"              
              name="TeacherPassword"      
              value={formData.TeacherPassword}
              onChange={handleChange}
              placeholder="Enter password"
              required
            />
          </div>

     
          <div className="form-group">
            <label>Gender</label>
            <div className="radio-group">
              <label className="radio-option">
                <input
                  type="radio"
                  name="TeacherGender"        
                  value="male"
                  checked={formData.TeacherGender === 'male'}
                  onChange={handleChange}
                />
                <span> Male</span>
              </label>
              <label className="radio-option">
                <input
                  type="radio"
                  name="TeacherGender"
                  value="female"
                  checked={formData.TeacherGender === 'female'}
                  onChange={handleChange}
                />
                <span> Female</span>
              </label>
              <label className="radio-option">
                <input
                  type="radio"
                  name="TeacherGender"
                  value="others"               
                  checked={formData.TeacherGender === 'others'}
                  onChange={handleChange}
                />
                <span>  Other</span>
              </label>
            </div>
          </div>

          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? '⏳ Saving...' : '💾 Save Teacher Details'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default TeacherDetails;
