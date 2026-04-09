import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import AboutUs from './Pages/AboutUs/AboutUs';
import Marks from './Pages/Marks/Marks';
import Payments from './Pages/Payments/Payments';
import Profile from './Pages/Profile/Profile';
import ContactUs from './Pages/ContactUs/ContactUs';
import Navbar from './Components/Navbar/Navbar';
import ProfileFormDetails from './Components/ProfileFormDetails/ProfileFormDetails';
import RollnumberCheck from './Components/ProfileFormDetails/RollnumberCheck';
import Login from './Components/Loginpage/Login';
import Dashbord from './Components/Dashboard/Dashboard';
import TeacherDetails from './Components/TeachersDetails/TeacherDetails';
import TeacherMarksAdding from './Pages/Teacher-marks-adding/Teacher-marks-adding';

const AppContent = () => {
  const location = useLocation();
  const hideNavbarRoutes = ['/rollcheck', '/login', '/profiledetails' , "/teacherSignUppage"];
  const showNavbar = !hideNavbarRoutes.includes(location.pathname);

  return (
    <>
      {showNavbar && <Navbar />}
      <div className='main-content'>
        <Routes>
          <Route path='/dashboard' element={<Dashbord/>}></Route>
          <Route path='/aboutus' element={<AboutUs />} />
          <Route path='/marks' element={<Marks />} />
          <Route path='/payments' element={<Payments />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/contactus' element={<ContactUs />} />
          <Route path='/profiledetails' element={<ProfileFormDetails />} />
          <Route path='/rollcheck' element={<RollnumberCheck/>}></Route>
          <Route path='/login' element={<Login/>}></Route>
          <Route path="/teacherSignUppage" element={<TeacherDetails/>}></Route>
          <Route path='/addingmarks' element={<TeacherMarksAdding/>}></Route>
        </Routes>
      </div>
    </>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
};
export default App