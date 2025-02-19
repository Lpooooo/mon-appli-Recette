import * as React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import GlobalStyles from '@mui/material/GlobalStyles';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import Snackbar from '@mui/material/Snackbar';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import Drawer from '@mui/material/Drawer';
import axios from 'axios';

function RecetteForm({ open, onClose }) {
  const [title, setTitle] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [instructions, setInstructions] = useState('');
  const [photo, setPhoto] = useState('');
  const [message, setMessage] = useState('');

  
  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const img = new Image();
        img.src = reader.result;
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          const maxWidth = 800; // Définissez la largeur maximale
          const maxHeight = 800; // Définissez la hauteur maximale
          let width = img.width;
          let height = img.height;

          if (width > height) {
            if (width > maxWidth) {
              height *= maxWidth / width;
              width = maxWidth;
            }
          } else {
            if (height > maxHeight) {
              width *= maxHeight / height;
              height = maxHeight;
            }
          }

          canvas.width = width;
          canvas.height = height;
          ctx.drawImage(img, 0, 0, width, height);
          setPhoto(canvas.toDataURL('image/jpeg'));
        };
      };
      reader.readAsDataURL(file);
    }
  };

const handleSubmit = async (event) => {
  event.preventDefault();
  if (!title || !ingredients || !instructions || !photo) {
    setMessage('Tous les champs sont obligatoires.');
    return;
  }
  
  const token = localStorage.getItem('token'); // Récupérer le token stocké
  if (!token) {
    setMessage('Vous devez être connecté pour créer une recette.');
    return;
  }

  const newRecette = {
    title,
    ingredients,
    instructions,
    photo,
  };

  try {
    await axios.post('http://localhost:3030/api/recette', newRecette, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    
    const savedRecipes = JSON.parse(localStorage.getItem('savedRecipes')) || [];
    savedRecipes.push(newRecette);
    localStorage.setItem('savedRecipes', JSON.stringify(savedRecipes));

    setMessage('Recette créée avec succès');
    setTitle('');
    setIngredients('');
    setInstructions('');
    setPhoto('');
    onClose();
    
  } catch (error) {
    if (error.response?.status === 401) {
      setMessage('Vous devez être connecté pour créer une recette');
    } else {
      setMessage('Erreur lors de la création de la recette 401');
    }
    console.error('Erreur lors de la création de la recette:', error);
  }
};

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Créer une nouvelle recette</DialogTitle>
      <DialogContent>
        <Box component="form" sx={{ '& > :not(style)': { m: 1 } }} onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Nom de la recette"
            variant="outlined"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <TextField
            fullWidth
            multiline
            rows={4}
            label="Ingrédients"
            variant="outlined"
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            required
          />
          <TextField
            fullWidth
            multiline
            rows={4}
            label="Étapes de la recette"
            variant="outlined"
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
            required
          />
          <Button variant="contained" component="label">
            Ajouter une photo
            <input type="file" hidden accept="image/*" onChange={handlePhotoChange} />
          </Button>
          <Button type="submit" variant="contained" color="primary">
            Enregistrer la recette
          </Button>
          {message && <Typography color="error">{message}</Typography>}
        </Box>
      </DialogContent>
    </Dialog>
  );
}

export default function CreerRecette() {
  const [openForm, setOpenForm] = useState(true);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const navigate = useNavigate();

  const handleOpenForm = () => {
    setOpenForm(true);
  };

  const handleCloseForm = () => {
    setOpenForm(false);
    setSnackbarOpen(true);
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
          { text: 'Modifier votre recette', path: '/ModifierRecette' },
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
    <React.Fragment>
      <CssBaseline />
      <GlobalStyles
        styles={(theme) => ({
          body: { backgroundColor: theme.palette.background.paper },
        })}
      />

      <div>
        <Box
          sx={{
            minHeight: '100vh',
            backgroundImage:
              'url("https://media.gettyimages.com/id/157612198/fr/photo/une-distribution-des-assiettes.jpg?s=1024x1024&w=gi&k=20&c=s-1umUBhADWccKB8jcinOdkJ6YdNbG8FXMXhdnLYuYM=")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundAttachment: 'fixed',
          }}
        >
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
                Création de votre recette
              </Typography>
            </Toolbar>
          </AppBar>

          <Drawer anchor="left" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
            {DrawerList}
          </Drawer>

          <Fab
            color="secondary"
            sx={(theme) => ({
              position: 'fixed',
              bottom: theme.spacing(2),
              right: theme.spacing(2),
            })}
            onClick={handleOpenForm}
          >
            <AddIcon />
          </Fab>

          <Snackbar
            open={snackbarOpen}
            autoHideDuration={6000}
            onClose={() => setSnackbarOpen(false)}
            message="Enregistrement de la recette"
            action={
              <Button color="inherit" size="small" onClick={() => setSnackbarOpen(false)}>
                Fermer
              </Button>
            }
            sx={{ bottom: { xs: 90, sm: 0 } }}
          />

          <RecetteForm open={openForm} onClose={handleCloseForm} />
        </Box>
      </div>
    </React.Fragment>
  );
}