// src/services/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://backend-tikbal.onrender.com/api',
});

// ✅ Cargar token desde localStorage al inicializar
const token = localStorage.getItem('token');
if (token) {
  api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

// Utilidad para actualizar token dinámicamente
export const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    localStorage.setItem('token', token); // ✅ también guardamos aquí por consistencia
  } else {
    delete api.defaults.headers.common['Authorization'];
    localStorage.removeItem('token');
  }
};

export default api;