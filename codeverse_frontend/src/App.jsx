import React from 'react'
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import './App.css'
import Home from "./pages/home/Home"
import Login from "./pages/login/Login"
import Signup from "./pages/signup/Signup"
import Profile from "./pages/profile/Profile"
import Edit from "./pages/edit/Edit"
import Verify from "./pages/verify/Verify"
import Event from "./pages/Events/events"
import Leaderboard from "./pages/leaderboard/Leaderboard"
import Usercontext from './context/Usercontext'
import Card from './pages/card/card'
import ProtectedRoute from './component/ProtectedRoute'


function App() {
  return (
    <Usercontext>
      <Router>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/login' element={<Login/>} />
          <Route path='/events' element={<Event/>} />
          <Route path='/signup' element={<Signup/>} />
          <Route path='/profile/:username' element={<Profile/>} />
          <Route 
            path='/profile/edit' 
            element={
              <ProtectedRoute>
                <Edit />
              </ProtectedRoute>
            } 
          />
          <Route path='/leaderboard' element={<Leaderboard/>} />
          <Route path='/card/:username' element={<Card/>} />
        </Routes>
      </Router>
    </Usercontext>    
  )
}

export default App
