import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from  '../services/auth';
import { Typography, TextField, Button, Box, InputAdornment, IconButton, FormControl, InputLabel, OutlinedInput, Link } from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

function Authentification() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignIn = async (event) => {
    event.preventDefault();
    setLoading(true);
    const formData = new FormData(event.currentTarget);
    const email = formData.get('email') 
    const password = formData.get('password')
    try {
      await login(email, password);
      setMessage('ok c cool')
      navigate('/Home')

    } catch (error) {
      setMessage(error.response?.data?.message || 'Erreur lors de la connexion');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
    style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '16px',
      backgroundImage: 'url("https://media.istockphoto.com/id/479233129/fr/photo/personnes-dans-un-cours-de-cuisine.jpg?s=612x612&w=0&k=20&c=oCwjYRAgP8RRcFyQhSwfv7arCrHssBEVKLr6gZyxSj0=")',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      position: 'relative'
    }}
  >
    <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(255, 255, 255, 0.9)' }}></div>
    <div style={{ position: 'relative', zIndex: 1, width: '100%', maxWidth: '400px' }}>
      <Box component="form" onSubmit={handleSignIn} sx={{ mt: 3, mx: 'auto', maxWidth: 400, p: 2, borderRadius: 1, boxShadow: 3 }}>
        <Typography variant="h5" component="h1" gutterBottom textAlign="center" color='Grey'> 
        Connectez-vous
        </Typography>
        <TextField
          fullWidth
          label="Email"
          name="email"
          type="email"
          required
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <AccountCircle />
              </InputAdornment>
            ),
          }}
          sx={{ mb: 2 }}
        />
        <FormControl sx={{ mb: 2 }} fullWidth variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">Mot de passe</InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            name="password"
            type={showPassword ? 'text' : 'password'}
            required
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Mot de passe"
          />
        </FormControl>
        <Button 
          type="submit" 
          variant="contained" 
          color="primary" 
          fullWidth 
          sx={{ mt: 2 }}
          disabled={loading}
        >
          {loading ? 'Connexion...' : 'Se connecter'}
        </Button>
        {message && (
          <Typography 
            variant="body2" 
            color={message.includes('réussie') ? 'success' : 'error'} 
            sx={{ mt: 2 }}
          >
            {message}
          </Typography>
        )}
        <Link href="/CreerUtilisateur" variant="body2" sx={{ display: 'block', textAlign: 'center', mt: 2 }}>
          Créer un compte
        </Link>
      </Box>
      </div>
      </div>
  );
}

export default Authentification;