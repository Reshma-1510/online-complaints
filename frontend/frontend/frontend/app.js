// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Complaint from './components/user/Complaint';
import HomePage from './components/user/HomePage';
import Status from './components/user/Status';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/complaint" element={<Complaint />} />
        <Route path="/status" element={<Status />} />
      </Routes>
    </Router>
  );
}

export default App;




import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/common/Login';
import Complaint from './components/user/Complaint';
import HomePage from './components/user/HomePage';
import Status from './components/user/Status';
import AdminHome from './components/admin/AdminHome';
import AgentHome from './components/agent/AgentHome';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [role, setRole] = useState('');

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login setToken={setToken} setRole={setRole} />} />
        <Route path="/complaint" element={<Complaint />} />
        <Route path="/status" element={<Status />} />
        <Route path="/admin" element={<AdminHome />} />
        <Route path="/agent" element={<AgentHome />} />
        <Route path="/home" element={<HomePage />} />
      </Routes>
    </Router>
  );
}

export default App;
