import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, IconButton, Drawer, Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Avatar, Menu, MenuItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { useNavigate } from 'react-router-dom';

function AppBarWithDrawer() {
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  const [user, setUser] = useState({ name: '', avatarUrl: '' });

  useEffect(() => {
    const savedUsername = localStorage.getItem('username') || '';
    const savedAvatarUrl = localStorage.getItem('avatarUrl') || '';
    setUser({ name: savedUsername, avatarUrl: savedAvatarUrl });
  }, []);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const handleNavigation = (path) => {
    navigate(path);
    setOpen(false);
  };

  const handleAvatarClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (path) => {
    navigate(path);
    setAnchorEl(null);
  };

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation">
      <List>
        {[
          { text: 'Créer votre recette', path: '/CreerRecette' },
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
    <Box>
      <AppBar position="static" sx={{ width: '100%', height: '100' }}>
        <Toolbar sx={{ height: '75%', display: 'flex', alignItems: 'center' }}>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
          <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}></Box>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontSize: "40px" }}>
            Votre Recette de Cuisine
          </Typography>
          {user && (
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography variant="h6" component="div" sx={{ marginRight: 1 }}>
                {user.name}
              </Typography>
              <IconButton onClick={handleAvatarClick} color="inherit">
                <Avatar alt={user.name} src={user.avatarUrl} sx={{ width: 60, height: 60 }} />
              </IconButton>
            </Box>
          )}
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={() => handleMenuItemClick('/MesEnregistrements')}>Mes Enregistrements</MenuItem>
            <MenuItem onClick={() => handleMenuItemClick('/PartagerRecette')}>Mes Partages de Recette</MenuItem>
            <MenuItem onClick={() => handleMenuItemClick('/Authentification')}>Se déconnecter</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </Box>
  );
}

export default AppBarWithDrawer;