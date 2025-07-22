// src/services/api.js
import axios from 'axios';

// ✅ Instancia de Axios con baseURL definida
const api = axios.create({
  baseURL: 'https://backend-tikbal.onrender.com/api',
});

// ✅ Cargar token al iniciar si existe
const token = localStorage.getItem('token');
if (token) {
  api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

// ✅ Utilidad para actualizar token dinámicamente (login, logout, etc.)
export const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    localStorage.setItem('token', token);
  } else {
    delete api.defaults.headers.common['Authorization'];
    localStorage.removeItem('token');
  }
};

export default api;