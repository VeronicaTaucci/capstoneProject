import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import SignIn from './components/SignIn';
import Register from './components/Register';
import Home from './components/Home';
import Albums from './components/Albums';
import Album from './components/Album';

import BaseLayout from './components/layout/BaseLayout';


const App = () => {
  return (
    <Router>
      <BaseLayout>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<Home />} />
          <Route path="/albums" element={<Albums />} />
          <Route path="/:id" element={<Album />} />
        </Routes>
      </BaseLayout>
    </Router>
  )
}

export default App