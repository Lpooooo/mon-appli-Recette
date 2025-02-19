import React from 'react';
import { Card, CardContent, TextField, Button, Grid, CardMedia, Box } from '@mui/material';

const RecipeForm = ({ recipe, handleUpdateRecipe }) => {
  return (
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
            value={recipe.title}
            onChange={(e) =>
              handleUpdateRecipe({ ...recipe, title: e.target.value })
            }
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Ingrédients"
            value={recipe.ingredients}
            onChange={(e) =>
              handleUpdateRecipe({ ...recipe, ingredients: e.target.value })
            }
            multiline
            rows={4}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Étapes de la recette"
            value={recipe.instructions}
            onChange={(e) =>
              handleUpdateRecipe({ ...recipe, instructions: e.target.value })
            }
            multiline
            rows={4}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="URL de l'image"
            value={recipe.photo}
            onChange={(e) =>
              handleUpdateRecipe({ ...recipe, photo: e.target.value })
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
  );
};

export default RecipeForm;