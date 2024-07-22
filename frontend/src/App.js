// import React from 'react';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import Albums from './components/Albums';
// import Album from './components/Album';

// const App = () => {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<Albums />} />
//         <Route path="/album/:id" element={<Album />} />
//       </Routes>
//     </Router>
//   );
// };

// export default App;
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
