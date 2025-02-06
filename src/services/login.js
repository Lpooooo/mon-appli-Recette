import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/api/auth/login', { email, password });
      // Stocker le token dans le localStorage ou les cookies
      localStorage.setItem('token', response.data.token);
      navigate('/home'); // Rediriger vers la page d'accueil
    } catch (error) {
      setError(error.response?.data?.message || 'Erreur de connexion');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Email:
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </label>
      <label>
        Mot de passe:
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </label>
      <button type="submit">Se connecter</button>
    </form>    
  );
};

export default Login;