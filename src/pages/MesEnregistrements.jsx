import * as React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import Drawer from '@mui/material/Drawer';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';

const MesEnregistrements = () => {
  const [savedMeals, setSavedMeals] = useState([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const savedMealsFromStorage = JSON.parse(localStorage.getItem('savedMeals')) || [];
    setSavedMeals(savedMealsFromStorage);
  }, []);

  const handleNavigation = (path) => {
    navigate(path);
    setDrawerOpen(false);
  };

  const handleRemoveMeal = (mealId) => {
    const updatedSavedMeals = savedMeals.filter(meal => meal.idMeal !== mealId);
    setSavedMeals(updatedSavedMeals);
    localStorage.setItem('savedMeals', JSON.stringify(updatedSavedMeals));
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
            Mes Enregistrements
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
      <Box sx={{ p: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom>
       
        </Typography>
        <Grid container spacing={3}>
          {savedMeals.map((meal) => (
            <Grid item xs={12} sm={6} md={4} key={meal.idMeal}>
              <Card>
                <CardMedia
                  component="img"
                  height="140"
                  image={meal.strMealThumb}
                  alt={meal.strMeal}
                />
                <CardContent>
                  <Typography variant="h6" component="div">
                    {meal.strMeal}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {meal.strInstructions.substring(0, 100)}...
                  </Typography>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleRemoveMeal(meal.idMeal)}
                    sx={{ mt: 1 }}
                  >
                    Supprimer
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default MesEnregistrements;