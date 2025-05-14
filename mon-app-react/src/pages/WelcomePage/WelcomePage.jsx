// src/pages/WelcomePage/WelcomePage.jsx
import React from "react";
import "./WelcomePage.css";
import Navbar from "../../components/ui/Navbar/Navbar";

const WelcomePage = () => {
  return (
    <div className="welcome-container">
    <Navbar />
	<h1>Bienvenue dans l'application de Gestion de Paie</h1>
      <p>Connectez-vous pour accéder au tableau de bord.</p>
    </div>
  );
};

export default WelcomePage

