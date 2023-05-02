import axios from 'axios';

const API_URL = 'http://localhost:5173/api';

export const postAbsensi = async (data) => {
  const response = await axios.post(`${API_URL}/absensi`, data);
  return response.data;
};

export const fetchAbsensi = async () => {
  const response = await axios.get(`${API_URL}/absensi`);
  return response.data;
};

