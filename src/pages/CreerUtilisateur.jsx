import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from  '../services/auth';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  IconButton,
  Button, 
  FormControl, 
  InputLabel, 
  OutlinedInput, 
  TextField, 
  InputAdornment, 
  Link, 
  Box
} from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import MenuIcon from '@mui/icons-material/Menu';

function CreerUtilisateur() {
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSignUp = async (event) => {
    event.preventDefault();
    setLoading(true);
    const formData = new FormData(event.currentTarget);
    const name = formData.get('name') 
    const email = formData.get('email') 
    const password = formData.get('password') 
    const nom_famille = formData.get('nom_famille') 

    try {
      await register(name, email, password, nom_famille);
      setMessage('Compte créé avec succès');
      navigate('/Home');
    } catch (error) {
      setMessage(error.response?.data?.message || 'Erreur lors de la création du compte');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <AppBar position="static" color="primary">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" color="inherit">
            Créer un compte
          </Typography>
        </Toolbar>
      </AppBar>
      <Box component="form" onSubmit={handleSignUp} sx={{ mt: 3, mx: 'auto', maxWidth: 400, p: 2, borderRadius: 1, boxShadow: 3 }}>
        <Typography variant="h5" component="h1" gutterBottom>
          Créer un compte
        </Typography>
        <TextField
          fullWidth
          label="Prénom"
          name="name"
          required
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label="Nom de famille"
          name="nom_famille"
          required
          sx={{ mb: 2 }}
        />
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
          {loading ? 'Création...' : 'Créer le compte'}
        </Button>
        {message && (
          <Typography 
            variant="body2" 
            color={message.includes('succès') ? 'success' : 'error'} 
            sx={{ mt: 2 }}
          >
            {message}
          </Typography>
        )}
        <Link href="/Authentification" variant="body2" sx={{ display: 'block', textAlign: 'center', mt: 2 }}>
          Déjà un compte ? Connectez-vous
        </Link>
      </Box>
    </div>
  );
}

export default CreerUtilisateur;