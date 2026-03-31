import React, { useState } from 'react';
import './profileFormDetails.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ProfileFormDetails = () => {
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState({
    stdname: "",
    stdfathername: "",
    stdmothername: "",
    stdemail: "",
    stdrollNumber: "",
    stdphoneNumber: "",
    stdpassword: "",
    stdaddress: "",
    stdgender: "",
    stdImage: null
  });

  const [errors, setErrors] = useState({});
  const [imagePreview, setImagePreview] = useState(null);

  const personalDetails = (e) => {
    const { name, type, value, files } = e.target;
    if (type === 'file') {
      const file = files[0] || null;
      setUserDetails((prev) => ({ ...prev, [name]: file }));
      setImagePreview(file ? URL.createObjectURL(file) : null);
      return;
    }

    setUserDetails({
      ...userDetails,
      [name]: value
    });
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    const allowedDomains = ['gmail.com', 'yahoo.com', 'outlook.com', 'hotmail.com'];
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!userDetails.stdname) newErrors.stdname = "First name is required";

    if (!userDetails.stdemail) {
      newErrors.stdemail = "Email is required";
    } else if (!emailRegex.test(userDetails.stdemail)) {
      newErrors.stdemail = "Please enter a valid email address";
    } else {
      const domain = userDetails.stdemail.split('@')[1].toLowerCase();
      if (!allowedDomains.includes(domain)) {
        newErrors.stdemail = "Only gmail.com, yahoo.com, outlook.com, hotmail.com are allowed";
      }
    }

    if (!userDetails.stdphoneNumber) {
      newErrors.stdphoneNumber = "Phone number is required";
    } else if (!/^\d{10}$/.test(userDetails.stdphoneNumber)) {
      newErrors.stdphoneNumber = "Phone number must be exactly 10 digits";
    }

    if (!userDetails.stdpassword) {
      newErrors.stdpassword = "Password is required";
    } else if (userDetails.stdpassword.length < 5) {
      newErrors.stdpassword = "Password must be atleast 5 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const submitDetails = async () => {
    if (!validateForm()) {
      alert("Please fill all required fields");
      return;
    }

    try {
      const formData = new FormData();
      Object.entries(userDetails).forEach(([key, value]) => {
        if (value !== null) {
          formData.append(key, value);
        }
      });

      const response = await axios.post(
        "http://localhost:2001/api/userstudentdetails/StudentDetails",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        }
      );
      console.log(response.data);
      alert("Thank you");
      setUserDetails({
        stdname: "",
        stdfathername: "",
        stdmothername: "",
        stdemail: "",
        stdrollNumber: "",
        stdphoneNumber: "",
        stdpassword: "",
        stdaddress: "",
        stdgender: "",
        stdImage: null
      });
      setImagePreview(null);
      navigate('/login');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <form autoComplete="off">
        <div className='parentfeilds'>
          <div className='inputfeilds'>
            <input
              name="stdname"
              placeholder="Enter Name"
              onChange={personalDetails}
              className={errors.stdname ? 'error' : ''}
              autoComplete="off"
            />
            <input
              name="stdfathername"
              placeholder='Enter Father Name'
              onChange={personalDetails}
              className={errors.stdfathername ? 'error' : ''}
              autoComplete="off"
            />
            <input
              name="stdmothername"
              placeholder='Enter Mother Name'
              onChange={personalDetails}
              className={errors.stdmothername ? 'error' : ''}
              autoComplete="off"
            />
            <input
              type="email"
              name="stdemail"
              placeholder='Enter Email'
              onChange={personalDetails}
              className={errors.stdemail ? 'error' : ''}
              autoComplete="new-email"
            />
            {errors.stdemail && <span className='errorText'>{errors.stdemail}</span>}
            <input
              type="file"
              name="stdImage"
              accept="image/*"
              onChange={personalDetails}
            />
            {imagePreview && (
              <img src={imagePreview} alt="Profile preview" className="image-preview" />
            )}
            <input
              name="stdrollNumber"
              placeholder='Enter Roll Number'
              onChange={personalDetails}
              autoComplete="off"
            />
            <input
              name="stdphoneNumber"
              placeholder='Enter Mobile Number'
              onChange={personalDetails}
              className={errors.stdphoneNumber ? 'error' : ''}
              autoComplete="off"
            />
            {errors.stdphoneNumber && <span className='errorText'>{errors.stdphoneNumber}</span>}
            <input
              name='stdpassword'
              type='password'
              placeholder='Enter Password'
              onChange={personalDetails}
              className={errors.stdpassword ? 'error' : ''}
              autoComplete="new-password"
              readOnly
              onFocus={(e) => e.target.removeAttribute('readonly')}
            />
            {errors.stdpassword && <span className='errorText'>{errors.stdpassword}</span>}
            <input
              name="stdaddress"
              placeholder='Enter Address'
              onChange={personalDetails}
              autoComplete="off"
            />

            <div className='genderContainer'>
              <label className='genderLabel'>Gender:</label>
              <div className='genderOptions'>
                <label>
                  <input
                    type="radio"
                    name="stdgender"
                    value="Male"
                    checked={userDetails.stdgender === "Male"}
                    onChange={personalDetails}
                  />
                  Male
                </label>
                <label>
                  <input
                    type="radio"
                    name="stdgender"
                    value="Female"
                    checked={userDetails.stdgender === "Female"}
                    onChange={personalDetails}
                  />
                  Female
                </label>
                <label>
                  <input
                    type="radio"
                    name="stdgender"
                    value="Others"
                    checked={userDetails.stdgender === "Others"}
                    onChange={personalDetails}
                  />
                  Others
                </label>
              </div>
              {errors.stdgender && <span className='errorText'>{errors.stdgender}</span>}
            </div>

            <div className='parentsubmition'>
              <button className='submitbtn' type="button" onClick={submitDetails}>
                Submit
              </button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default ProfileFormDetails;
