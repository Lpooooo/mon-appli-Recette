import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AppBarWithDrawer from './pages/AppBarWithDrawer';
import Authentification from './pages/Authentification';
import CreerUtilisateur from './pages/CreerUtilisateur';
import PartagerRecette from './pages/PartagerRecette';
import MesEnregistrements from './pages/MesEnregistrements';
import CreerRecette from './pages/CreerRecette';
import ModifierRecette from './pages/ModifierRecette';
import SupprimeRecette from './pages/SupprimeRecette';
import Home from "./pages/Home";
import UserProfile from './pages/UserProfile';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Navigate to="/Authentification" replace />} />
        <Route path="/Authentification" element={<Authentification />} />
        <Route path="/MesEnregistrements" element={<MesEnregistrements />} />
        <Route path="/PartagerRecette" element={<PartagerRecette />} />
        <Route path="/CreerUtilisateur" element={<CreerUtilisateur />} />
        <Route path="/CreerRecette" element={<CreerRecette />} />
        <Route path="/ModifierRecette" element={<ModifierRecette />} />
        <Route path="/SupprimeRecette" element={<SupprimeRecette />} />
        <Route path="/home" element={<Home />} />
        <Route path="/UserProfile" element={<UserProfile/>}/>
      
      </Routes>
    </div>
  );
}

export default App;