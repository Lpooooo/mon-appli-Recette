import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Grid, Card, CardMedia, CardContent, Button, AppBar, Toolbar, IconButton, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';



export default function SupprimeRecette() {
  const [recipes, setRecipes] = useState([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate();
  
  useEffect(() => {
    const savedRecipes = JSON.parse(localStorage.getItem('savedRecipes')) || [];
    setRecipes(savedRecipes);
  }, []);

  const handleDeleteRecipe = (recipeId) => {
    const updatedRecipes = recipes.filter(recipe => recipe.idMeal !== recipeId);
    setRecipes(updatedRecipes);
    localStorage.setItem('savedRecipes', JSON.stringify(updatedRecipes));
  };


  const handleNavigation = (path) => {
    navigate(path);
    setDrawerOpen(false);
  };

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation">
      <List>
        {[
          { text: 'Accueil', path:'/Home'},
          { text: 'Creer votre recette', path: '/CreerRecette' },
          { text: 'Modifier votre recette', path: '/ModifierRecette' },
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
          <Typography variant="h6" color="inherit" component="div">
            Supprimer votre recette
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
          {recipes.map((recipe) => (
            <Grid item xs={12} sm={6} md={4} key={recipe.idMeal}>
              <Card>
                <CardMedia
                  component="img"
                  height="140"
                  image={recipe.strMealThumb}
                  alt={recipe.strMeal}
                />
                <CardContent>
                  <Typography variant="h6" component="div">
                    {recipe.strMeal}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {recipe.strInstructions.substring(0, 100)}...
                  </Typography>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleDeleteRecipe(recipe.idMeal)}
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
}