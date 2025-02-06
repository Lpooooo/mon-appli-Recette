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
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

export default function ModifierRecette() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate();
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const savedRecipes = JSON.parse(localStorage.getItem('savedRecipes')) || [];
    setRecipes(savedRecipes);
  }, []);

  const handleUpdateRecipe = (updatedRecipe) => {
    const updatedRecipes = recipes.map((recipe) =>
      recipe.idMeal === updatedRecipe.idMeal ? updatedRecipe : recipe
    );
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
          { text: 'Accueil', path: '/Home' },
          { text: 'Creer votre recette', path: '/CreerRecette' },
          { text: 'Supprimer votre recette', path: '/SupprimeRecette' },
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
            <Typography variant="h6" color="inherit" component="div" fontSize={10}>
              <h1>Modification de votre recette</h1>
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

        <Box sx={{justifyContent:'center', minHeight: '80vh', p: 3, height: '100vh'}}>
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
                    <TextField
                      fullWidth
                      label="Nom de la recette"
                      value={recipe.strMeal}
                      onChange={(e) =>
                        handleUpdateRecipe({ ...recipe, strMeal: e.target.value })
                      }
                      sx={{ mb: 2 }}
                    />
                    <TextField
                      fullWidth
                      label="Ingrédients"
                      value={recipe.strIngredients}
                      onChange={(e) =>
                        handleUpdateRecipe({ ...recipe, strIngredients: e.target.value })
                      }
                      multiline
                      rows={4}
                      sx={{ mb: 2 }}
                    />
                    <TextField
                      fullWidth
                      label="Étapes de la recette"
                      value={recipe.strInstructions}
                      onChange={(e) =>
                        handleUpdateRecipe({ ...recipe, strInstructions: e.target.value })
                      }
                      multiline
                      rows={4}
                      sx={{ mb: 2 }}
                    />
                    <TextField
                      fullWidth
                      label="URL de l'image"
                      value={recipe.strMealThumb}
                      onChange={(e) =>
                        handleUpdateRecipe({ ...recipe, strMealThumb: e.target.value })
                      }
                      sx={{ mb: 2 }}
                    />
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleUpdateRecipe(recipe)}
                    >
                      Mettre à jour
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