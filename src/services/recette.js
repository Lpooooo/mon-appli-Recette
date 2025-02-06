import axios from 'axios';

const API_URL = 'http://localhost:5000/api/recettes';

export const getRecettes = async (searchTerm) => {
  const response = await axios.get(API_URL, {
    params: { search: searchTerm }
  });
  return response.data;
};