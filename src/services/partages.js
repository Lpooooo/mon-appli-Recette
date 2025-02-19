import axios from 'axios';

const API_URL = 'http://localhost:3030/api/partages';

export const partagerRecette = async (recette_id, sender_id, receiver_id) => {
  const response = await axios.post(API_URL, { recette_id, sender_id, receiver_id });
  return response.data;
};

export const getRecettesPartagees = async (user_id) => {
  const response = await axios.get(`${API_URL}/${user_id}`);
  return response.data;
};