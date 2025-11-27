import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './Components/Navbar';
import HeroSection from './Components/HeroSection';
import CoursPopulaires from './Components/CoursPopulaires';
import Formateur from './Components/Formateur';
import AboutPage from './Components/AboutPage';
import Contnact from './Components/Contnact';
import AuthPage from './Components/AuthPage';
import CourseDetails from './Components/CourseDetails.js';
import RegisterForm from './Components/RegisterForm.js';
import AdminLogin from './Components/AdminLogin.js';
import Dashbord from './Components/Dashbord.js';





const Home = () => (
  <>
    <HeroSection />
    <CoursPopulaires />
    <Formateur />
  </>
);

export default function App() {
  
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <BrowserRouter>
   
      {!isLoggedIn ? (
        <Routes>
          <Route path="*" element={<AuthPage setIsLoggedIn={setIsLoggedIn} />} />
        </Routes>
      ) : (
        <>
     
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/cours" element={<CoursPopulaires />} />
            <Route path="/formateurs" element={<Formateur />} />
            <Route path="/contact" element={<Contnact />} />
            <Route path="/AuthPage" element={<Navigate to="/" />} />
              <Route path="/cours/:id" element={<CourseDetails />} />
              <Route path="/inscription" element={<RegisterForm/>} /> 
                        <Route path="/AdminLogin" element={<AdminLogin/>} /> 
                           <Route path="/Dashbord" element={<Dashbord/>} /> 
    
        
            

 

            
          </Routes>
        </>
      )}
    </BrowserRouter>
  );
}
