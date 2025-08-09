// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import DashboardPage from './pages/DashboardPage';
import AddWordPage from './pages/AddWordPage';
import LessonPage from './pages/LessonPage';
import './App.css';

function App() {
  return (
    <Router>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/adicionar" element={<AddWordPage />} />
          <Route path="/licao" element={<LessonPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;