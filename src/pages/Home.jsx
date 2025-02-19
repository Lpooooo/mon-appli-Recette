import React, { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import {useNavigate} from 'react-router-dom'
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import axios from 'axios';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import SearchBar from '../Components/SearchBar';
import AppBarWithDrawer from '../pages/AppBarWithDrawer';


const Home = () => {
  const navigate = useNavigate();
  const [recette, setRecette] = useState([]);
  const [meals, setMeals] = useState([]);
  const [searchTerm, setSearchTerm] = useState('a');
  const [ratings, setRatings] = useState({});
  const [comments, setComments] = useState({});
  const [savedMeals, setSavedMeals] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  const fetchMeals = async (term) => {
    try {
      let url;
      if (term.length === 1) {
        url = `https://www.themealdb.com/api/json/v1/1/search.php?f=${term}`;
      } else {
        url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`;
      }
      const response = await fetch(url);
      const data = await response.json();
      setMeals(data.meals);
    } catch (error) {
      console.error('Erreur lors de la récupération des données:', error);
      setErrorMessage('Erreur lors de la récupération des données');
    }
  };

  useEffect(() => {
    fetchMeals(searchTerm);
    const savedMealsFromStorage = JSON.parse(localStorage.getItem('savedMeals')) || [];
    setSavedMeals(savedMealsFromStorage);
  }, [searchTerm]);

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleRatingChange = async (mealId, newRating) => {
    setRatings((prevRatings) => ({
      ...prevRatings,
      [mealId]: newRating,
    }));

    try {
      await axios.post('http://localhost:5000/api/ratings', { mealId, rating: newRating });
    } catch (error) {
      console.error('Erreur lors de l\'enregistrement de la note:', error);
    }
  };

  const handleCommentChange = (mealId, newComment) => {
    setComments((prevComments) => ({
      ...prevComments,
      [mealId]: newComment,
    }));
  };

  const handleCommentSubmit = (mealId) => {
    console.log(`Commentaire pour la recette ${mealId}:`, comments[mealId]);
  };

  const handleSaveMeal = (meal) => {
    const isMealSaved = savedMeals.some(savedMeal => savedMeal.idMeal === meal.idMeal);
    if (isMealSaved) {
      setErrorMessage('Cette recette est déjà enregistrée.');
      return;
    }
    const updatedSavedMeals = [...savedMeals, meal];
    setSavedMeals(updatedSavedMeals);
    localStorage.setItem('savedMeals', JSON.stringify(updatedSavedMeals));
    setErrorMessage('');
  };

  useEffect(() => {
    const fetchrecette = async () => {
      try {
        const response = await axios.get('http://localhost:3030/api/recette'); // Assurez-vous que l'URL de l'API est correcte
        setRecette(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des recettes:', error);
      }
    };

    fetchrecette();
  }, []);

  const handleProfileClick = () => {
    navigate('/UserProfile');
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
      <Box sx={{ p: 10 }} >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <SearchBar onSearch={handleSearch} />
          <Button
            variant="contained"
            color="primary"
            onClick={handleProfileClick}
          >
            Mon Profil
          </Button>
        </Box>
        {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
        <Grid container spacing={3}>
          {meals && meals.map((meal) => (
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
                  <Rating
                    name={`rating-${meal.idMeal}`}
                    value={ratings[meal.idMeal] || 0}
                    onChange={(event, newValue) => handleRatingChange(meal.idMeal, newValue)}
                  />
                  <TextField
                    fullWidth
                    label="Commentaire"
                    value={comments[meal.idMeal] || ''}
                    onChange={(event) => handleCommentChange(meal.idMeal, event.target.value)}
                    multiline
                    rows={2}
                    variant="outlined"
                    sx={{ mt: 2 }}
                  />
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleCommentSubmit(meal.idMeal)}
                    sx={{ mt: 1 }}
                  >
                    Soumettre
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleSaveMeal(meal)}
                    sx={{ mt: 1, ml: 1 }}
                  >
                    Enregistrer
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

export default Home;