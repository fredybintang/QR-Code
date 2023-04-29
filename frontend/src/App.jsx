import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.scss";
import TamuList from "./components/Absensi";
import ScanTamu from "./components/Scanner";
import QRCodeGenerator from "./components/generator";


function App() {
  return (
    <div className="component">
      <QRCodeGenerator />
    </div>
  );
}

export default App;
