import * as React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Typography from '@mui/material/Typography';
import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Drawer, Grid, Card, CardMedia, CardContent, Button, Alert, TextField } from '@mui/material';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';

export default function PartagerRecette() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [recettes, setRecettes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [receiverId, setReceiverId] = useState(''); // Ajout du champ pour l'ID du destinataire
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecettes = async () => {
      try {
        const token = localStorage.getItem('token'); // Récupérer le jeton d'authentification depuis le stockage local
        const response = await axios.get('http://localhost:3030/api/recette', {
          headers: {
            Authorization: `Bearer ${token}` // Ajouter le jeton d'authentification dans les en-têtes de la requête
          }
        });
        setRecettes(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des recettes:', error);
        setErrorMessage('Erreur lors de la récupération des recettes');
      }
    };

    fetchRecettes();
  }, []);

  const handleSearch = async (term) => {
    setSearchTerm(term);
    try {
      const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/search.php?f=${term}`);
      setRecettes(response.data.meals);
    } catch (error) {
      console.error('Erreur lors de la recherche des recettes:', error);
      setErrorMessage('Erreur lors de la recherche des recettes');
    }
  };

  const handleShare = async (recetteId) => {
    try {
      const token = localStorage.getItem('token'); // Récupérer le jeton d'authentification depuis le stockage local
      await axios.post('http://localhost:3030/api/recette/share', { recetteId, receiverId }, {
        headers: {
          Authorization: `Bearer ${token}` // Ajouter le jeton d'authentification dans les en-têtes de la requête
        }
      });
      setErrorMessage('Recette partagée avec succès');
    } catch (error) {
      console.error('Erreur lors du partage de la recette:', error);
      setErrorMessage('Erreur lors du partage de la recette');
    }
  };

  const handleNavigation = (path) => {
    navigate(path);
    setDrawerOpen(false);
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

        <Drawer
          anchor="left"
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
        >
          {DrawerList}
        </Drawer>

        <Box sx={{ p: 10 }}>
          <TextField
            fullWidth
            label="Rechercher des recettes"
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
            variant="outlined"
            sx={{ mb: 3 }}
          />
          <TextField
            fullWidth
            label="ID du destinataire"
            value={receiverId}
            onChange={(e) => setReceiverId(e.target.value)}
            variant="outlined"
            sx={{ mb: 3 }}
          />
          {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
          <Grid container spacing={3}>
            {recettes && recettes.map((recette) => (
              <Grid item xs={12} sm={6} md={4} key={recette.idMeal}>
                <Card>
                  <CardMedia
                    component="img"
                    height="140"
                    image={recette.strMealThumb}
                    alt={recette.strMeal}
                  />
                  <CardContent>
                    <Typography variant="h6" component="div">
                      {recette.strMeal}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {recette.strInstructions.substring(0, 100)}...
                    </Typography>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleShare(recette.idMeal)}
                      sx={{ mt: 1 }}
                    >
                      Partager
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </div>
  );
}