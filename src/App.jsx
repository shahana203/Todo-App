import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Todo from './pages/Todo';

function App() {
  const token = localStorage.getItem('token');

  return (
    <Router>
      <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
  <Route path="/login" element={<Login />} />
  <Route path="/register" element={<Register />} />
  <Route path="/todo" element={<Todo />} />
      </Routes>
    </Router>
  );
}

export default App;
