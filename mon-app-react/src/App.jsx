// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/ui/Header/Header";
import WelcomePage from "./pages/WelcomePage/WelcomePage";
import EmployeesPage from "./pages/EmployeesPage/EmployeesPage";
import PrimePage from "./pages/PrimePage/PrimePage";
import RetenuePage from "./pages/RetenuePage/RetenuePage";
import BulletinPage from "./pages/BulletinPage/BulletinPage";
import Navbar from "./components/ui/Navbar/Navbar";

function App() {
  return (
    <Router>
      <div className="app">
        <Header /> {/* Le Header sera affiché sur toutes les pages */}
	<Navbar/>
        <Routes>
          {/* Route pour la page d'accueil */}
          <Route path="/" element={<WelcomePage />} />
          <Route path="/employees" element={<EmployeesPage/>}/> 
          {/* Exemple d'autres routes à ajouter plus tard : */}
           <Route path="/prime" element={<PrimePage />} /> 
           <Route path="/retenue" element={<RetenuePage />} />
	   <Route path="/bulletins" element={<BulletinPage/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
