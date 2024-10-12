import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import SignUp from './components/pages/Signup/SignUp'
import Dashboard from './components/pages/Dashboard/Dashboard'
import SignIn from './components/LoginIn/SignIn'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LandingPage from './components/pages/landingpage/landingpage'
function App() {

  return (
    <>
    <ToastContainer/>
    <Router>
      <Routes>
      <Route path="/" element={<LandingPage/>}></Route>
      <Route path="/signup" element={<SignUp />}/>
      <Route path="/dashboard" element={<Dashboard />}/>
      <Route path="/signin" element={<SignIn />}/>
      </Routes>
      
    </Router>
    </>
  )
}

export default App
