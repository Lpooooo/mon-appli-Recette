import * as React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Typography from '@mui/material/Typography';
import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Drawer, TextField, Button } from '@mui/material';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { getCurrentUser } from '../services/auth';
import { partagerRecette, getRecettesPartagees } from '../services/partages';

export default function PartagerRecette() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [recetteId, setRecetteId] = useState('');
  const [receiverId, setReceiverId] = useState('');
  const [recettesPartagees, setRecettesPartagees] = useState([]);
  const navigate = useNavigate();
  const user = getCurrentUser();

  useEffect(() => {
    const fetchRecettesPartagees = async () => {
      if (user) {
        const data = await getRecettesPartagees(user.id);
        setRecettesPartagees(data);
      }
    };

    fetchRecettesPartagees();
  }, [user]);

  const handleNavigation = (path) => {
    navigate(path);
    setDrawerOpen(false);
  };

  const handlePartage = async () => {
    if (recetteId && receiverId && user) {
      await partagerRecette(recetteId, user.id, receiverId);
      alert('Recette partagée avec succès');
      setRecetteId('');
      setReceiverId('');
    }
  };

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation">
      <List>
        {[
          { text: 'Accueil', path: '/Home' },
        ].map((item, index) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton onClick={() => handleNavigation(item.path)}>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <div>
      <Box sx={{
        minHeight: '100vh',
        backgroundImage: 'url("https://media.istockphoto.com/id/2158116531/fr/photo/comptoir-de-cuisine-avec-ustensiles-et-espace-de-copie-mur-de-briques.jpg?s=2048x2048&w=is&k=20&c=axFyvtqoLNiCANND4PLWbIo2CuibaswN2tkHgnE1vEU=")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed'
      }}>
        <AppBar position="static" color="primary">
          <Toolbar>
            <IconButton
              edge="start"
              sx={{ mr: 2 }}
              color="inherit"
              aria-label="menu"
              onClick={() => setDrawerOpen(true)}
            >
              <MenuIcon />
            </IconButton>
            <Typography sx={{ fontSize: 15 }} variant="h6" color="inherit" component="div">
              <h1>Partager votre recette</h1>
            </Typography>
          </Toolbar>
        </AppBar>

        <Box sx={{ p: 3 }}>
          <h1>Partager une Recette</h1>
          <TextField
            label="ID de la Recette"
            value={recetteId}
            onChange={(e) => setRecetteId(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="ID du Destinataire"
            value={receiverId}
            onChange={(e) => setReceiverId(e.target.value)}
            fullWidth
            margin="normal"
          />
          <Button variant="contained" color="primary" onClick={handlePartage}>
            Partager
          </Button>
          <h2>Recettes Partagées avec Moi</h2>
          <ul>
            {recettesPartagees.map((recette) => (
              <li key={recette.id}>{recette.nom}</li>
            ))}
          </ul>
        </Box>

        <Drawer
          anchor="left"
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
        >
          {DrawerList}
        </Drawer>
      </Box>
    </div>
  );
}