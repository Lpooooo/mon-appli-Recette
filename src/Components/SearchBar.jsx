import React, { useRef } from 'react';
import { Box, TextField, Button } from '@mui/material';

const SearchBar = ({ onSearch }) => {
  const searchInputRef = useRef(null);

  const handleSearch = (event) => {
    event.preventDefault();
    const term = searchInputRef.current.value;
    onSearch(term);
  };

  return (
    <Box component="form" onSubmit={handleSearch} sx={{ mb: 3, display: 'flex', alignItems: 'center' }}>
      <TextField
        id="search"
        label="Rechercher votre recette"
        variant="outlined"
        size="small"
        inputRef={searchInputRef}
        sx={{ mr: 2 }}
        InputLabelProps={{
          style: { color: 'white' }, 
        }}
      />
      <Button type="submit" variant="contained" color="primary">
        Rechercher
      </Button>
    </Box>
  );
};

export default SearchBar;