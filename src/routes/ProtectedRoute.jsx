// src/routes/ProtectedRoute.jsx
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ children, rolPermitido = 'admin' }) {
  const token = localStorage.getItem('token');

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  try {
    const payloadBase64 = token.split('.')[1];
    const decodedPayload = JSON.parse(atob(payloadBase64));

    // Si el rol no coincide con el requerido, redirige al login
    if (decodedPayload.rol !== rolPermitido) {
      return <Navigate to="/login" replace />;
    }
  } catch (error) {
    console.error('Error al decodificar token:', error);
    return <Navigate to="/login" replace />;
  }

  return children;
}