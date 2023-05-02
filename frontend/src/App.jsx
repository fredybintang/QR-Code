import React from 'react';
import "./App.scss";
import ScanTamu from "./components/Scanner";
import TamuList from "./components/Absensi";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import QRCodeGenerator from './components/Generator';

function App() {
  return (
    <div className="component">
      <Router>
        <Routes>
          <Route path="/guest/:id" element={<QRCodeGenerator />} />
          <Route path="/scan" element={<ScanTamu />} />
          <Route path="/" element={<TamuList />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

