import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Albums from './components/Albums';
import Album from './components/Album';
import Photo from './components/Photo';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Albums />} />
        <Route path="/album/:id" element={<Album />} />
        <Route path="/photo/:id" element={<Photo />} />
      </Routes>
    </Router>
  );
}

export default App;
