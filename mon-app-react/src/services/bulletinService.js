// src/services/bulletinService.js
import axios from 'axios';

const API_URL = 'http://localhost:8000/api/bulletins';

export const getAllBulletins = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération des bulletins :', error);
    throw error;
  }
};

export const deleteBulletin = async (id) => {
  try {
    await axios.delete(`${API_URL}/${id}`);
  } catch (error) {
    console.error('Erreur lors de la suppression du bulletin :', error);
    throw error;
  }
};

