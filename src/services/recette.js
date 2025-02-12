import axios from 'axios';

const API_URL = 'http://localhost:3030/api/recette';

export const getRecettes = async (searchTerm) => {
  const response = await axios.get(API_URL, {
    params: { search: searchTerm }
  });
  return response.data;
};