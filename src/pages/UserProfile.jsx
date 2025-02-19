import React, { useState, useEffect } from 'react';
import { Box, TextField, Button, Avatar, Typography, Paper } from '@mui/material';
import AppBarWithDrawer from './AppBarWithDrawer';

const UserProfile = () => {
  const [username, setUsername] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');

  useEffect(() => {
    // Load user data from localStorage on component mount
    const savedUsername = localStorage.getItem('username') || '';
    const savedAvatarUrl = localStorage.getItem('avatarUrl') || '';
    setUsername(savedUsername);
    setAvatarUrl(savedAvatarUrl);
  }, []);

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleAvatarUrlChange = (event) => {
    setAvatarUrl(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Save user data to localStorage
    localStorage.setItem('username', username);
    localStorage.setItem('avatarUrl', avatarUrl);
    alert('Profile updated successfully!');
  };

  return (
    <Box sx={{
      minHeight: '100vh',
      backgroundImage: 'url("https://media.istockphoto.com/id/2158116531/fr/photo/comptoir-de-cuisine-avec-ustensiles-et-espace-de-copie-mur-de-briques.jpg?s=2048x2048&w=is&k=20&c=axFyvtqoLNiCANND4PLWbIo2CuibaswN2tkHgnE1vEU=")',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      backgroundAttachment: 'fixed'
    }}>
      <AppBarWithDrawer />
      <Box sx={{ p: 10 }}>
        <Paper elevation={3} sx={{ p: 4, maxWidth: 400, margin: 'auto' }}>
          <Typography variant="h4" gutterBottom>
            User Profile
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Username"
              value={username}
              onChange={handleUsernameChange}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Avatar URL"
              value={avatarUrl}
              onChange={handleAvatarUrlChange}
              margin="normal"
            />
            <Box sx={{ mt: 2, mb: 2, display: 'flex', justifyContent: 'center' }}>
              <Avatar
                src={avatarUrl}
                alt={username}
                sx={{ width: 100, height: 100 }}
              />
            </Box>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
            >
              Update Profile
            </Button>
          </form>
        </Paper>
      </Box>
    </Box>
  );
};

export default UserProfile;
