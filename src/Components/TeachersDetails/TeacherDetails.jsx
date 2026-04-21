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
    TeacherGender: '',
    TeacherImage: null,
    TeacherAssignedclass: ''
  });
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  const handleChange = (e) => {
    const { name, type, value, files } = e.target;
    if (type === 'file') {
      const file = files[0] || null;
      setFormData((prev) => ({ ...prev, [name]: file }));
      setImagePreview(file ? URL.createObjectURL(file) : null);
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const submitData = new FormData();
      submitData.append('TeacherName', formData.TeacherName);
      submitData.append('TeacherEmail', formData.TeacherEmail);
      submitData.append('TeacherPhone', formData.TeacherPhone);
      submitData.append('TeacherAddress', formData.TeacherAddress);
      submitData.append('TeacherPassword', formData.TeacherPassword);
      submitData.append('TeacherGender', formData.TeacherGender);
      submitData.append('TeacherAssignedclass', formData.TeacherAssignedclass);
      if (formData.TeacherImage) {
        submitData.append('TeacherImage', formData.TeacherImage);
      }

      await axios.post('http://localhost:2001/api/userteacherdetails/TeacherDetails', submitData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      alert('Teacher saved successfully!');
      setFormData({ TeacherName: '', TeacherEmail: '', TeacherPhone: '', TeacherAddress: '', TeacherPassword: '', TeacherGender: '', TeacherImage: null, TeacherAssignedclass: '' });
      setImagePreview(null);
    } catch (error) {
      alert('Error saving teacher: ' + (error.response?.data?.message || 'Try again'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="teacher-container">
      <div className="form-card">
        <h1 className="title">Teacher Details</h1>
        <p className="subtitle">Complete the form below</p>

        <form onSubmit={handleSubmit} className="teacher-form">

          <div className="form-group">
            <label>Full Name</label>
            <input
              type="text"
              style={{ width: "100%", padding: "15px", borderRadius: "20px", textAlign: "left" }}
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
            <label>Profile Photo</label>
            <input
              type="file"
              name="TeacherImage"
              accept="image/*"
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Assigned Class</label>
            <select
              name="TeacherAssignedclass"
              value={formData.TeacherAssignedclass}
              onChange={handleChange}
              required
            >
              <option value="">Select class</option>
              {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
                <option key={n} value={n}>{`Class ${n}`}</option>
              ))}
            </select>
          </div>

          {imagePreview && (
            <div className="form-group">
              <label>Preview</label>
              <img src={imagePreview} alt="Teacher preview" className="image-preview" />
            </div>
          )}

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
            {loading ? '⏳ Saving...' : '💾 Save  Details'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default TeacherDetails;
