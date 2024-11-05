import { useState } from 'react'
import LandingPage from './landing-page/LandingPage'
import './App.css'
import { Routes, Route } from "react-router-dom";

function App() {

  return (
    <>
    <Routes>
      <Route path="/" element={<LandingPage/>}/>
    </Routes>
    </>
  )
}

export default App
