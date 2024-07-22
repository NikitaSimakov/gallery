// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Album from './components/Album';
import Albums from './components/Albums';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/album/:id" element={<Album />} />
        <Route path="/" element={<Albums />} />
      </Routes>
    </Router>
  );
}

export default App;
