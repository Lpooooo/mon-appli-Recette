import React from 'react';
import { Box, TextField, Button } from '@mui/material';

const SearchBar = ({ onSearch }) => {
  const handleSearch = (event) => {
    event.preventDefault();
    const letter = event.target.elements.search.value;
    onSearch(letter);
  };

  return (
    <Box component="form" onSubmit={handleSearch} sx={{ mb: 3, display: 'flex', alignItems: 'center' }}>
      <TextField
        id="search"
        label="Rechercher par lettre"
        variant="outlined"
        size="small"
        sx={{ mr: 2 }}
      />
      <Button type="submit" variant="contained" color="primary">
        Rechercher
      </Button>
      </Box>
      
  );
};

export default SearchBar;