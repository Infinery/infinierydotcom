import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MovieFilter from './MovieFilter';
import MovieResults from './MovieResults';
import DomainSale from './DomainSale'; // Import DomainSale component


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MovieFilter />} />
        <Route path="/results" element={<MovieResults />} />
        <Route path="/domain-sale" element={<DomainSale />} /> {/* Add route for DomainSale */}
      </Routes>

    </Router>
  );
}

export default App;
