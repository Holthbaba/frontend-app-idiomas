// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import DashboardPage from './pages/DashboardPage';
import AddWordPage from './pages/AddWordPage';
import LessonPage from './pages/LessonPage';
import WordDetailsPage from './pages/WordDetailsPage';
import ListeningPage from './pages/ListeningPage';
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
          <Route path="/listening" element={<ListeningPage />} />
          <Route path="/word/:id/details" element={<WordDetailsPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;