import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
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
import Home from './Pages/Home/Home';
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute';
import Footer from './Components/Footer/Footer';
import ForgotPassword from './Components/Forgot-Password/Forgot-password';
import ForgotPasswordForTeachers from './Components/Forgotforteachers/Forgotforteachers';

const AppContent = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const hideNavbarRoutes = ['/rollcheck', '/login', '/profiledetails', "/teacherSignUppage", "/forgot-password", "/forgot-password-for-teachers"];
  const showNavbar = !hideNavbarRoutes.includes(location.pathname);

  useEffect(() => {
    const user = localStorage.getItem("user");
    const role = localStorage.getItem("role");

    if (!user && !role && location.pathname !== '/login') {
      const timer = setTimeout(() => {
        alert("Session expired or you are not logged in. Please login to continue.");
        navigate('/login');
      }, 300000);
      return () => clearTimeout(timer);
    }
  }, [location.pathname, navigate]);

  return (
    <>
      {showNavbar && <Navbar />}
      <div className='main-content'>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/' element={<Home />} />
          <Route path='/aboutus' element={<AboutUs />} />
          <Route path='/contactus' element={<ContactUs />} />
          <Route path='/forgot-password' element={<ForgotPassword />} />
          <Route path='/forgot-password-for-teachers' element={<ForgotPasswordForTeachers />} />

          <Route
            path='/dashboard'
            element={<ProtectedRoute allowedRoles={['admin', 'teacher', 'student']}><Dashbord /></ProtectedRoute>}
          />
          <Route
            path='/marks'
            element={<ProtectedRoute allowedRoles={['admin', 'student']}><Marks /></ProtectedRoute>}
          />
          <Route
            path='/payments'
            element={<ProtectedRoute allowedRoles={['admin']}><Payments /></ProtectedRoute>}
          />
          <Route
            path='/profile'
            element={<ProtectedRoute allowedRoles={['admin', 'teacher', 'student']}><Profile /></ProtectedRoute>}
          />
          <Route
            path='/profiledetails'
            element={<ProtectedRoute allowedRoles={['admin', 'teacher']}><ProfileFormDetails /></ProtectedRoute>}
          />
          <Route
            path='/rollcheck'
            element={<ProtectedRoute allowedRoles={['admin', 'teacher']}><RollnumberCheck /></ProtectedRoute>}
          />
          <Route
            path="/teacherSignUppage"
            element={<ProtectedRoute allowedRoles={['admin']}><TeacherDetails /></ProtectedRoute>}
          />
          <Route
            path='/addingmarks'
            element={<ProtectedRoute allowedRoles={['admin', 'teacher']}><TeacherMarksAdding /></ProtectedRoute>}
          />
        </Routes>
      </div>
      {showNavbar && <Footer />}
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