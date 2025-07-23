import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import api, { setAuthToken } from '../services/api';

export default function ProtectedRoute({ children, rolPermitido = 'admin' }) {
  const [verificado, setVerificado] = useState(false);
  const [autorizado, setAutorizado] = useState(true);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const verificarTokenBackend = async () => {
      if (!token) {
        setAutorizado(false);
        setVerificado(true);
        return;
      }

      try {
        const payloadBase64 = token.split('.')[1];
        const decodedPayload = JSON.parse(atob(payloadBase64));

        if (decodedPayload.rol !== rolPermitido) {
          setAutorizado(false);
          setVerificado(true);
          return;
        }

        setAuthToken(token); // asegúrate de enviarlo en headers

        // Verificamos con backend si el usuario sigue activo
        await api.get('/auth/verify'); // backend responde 403 si deshabilitado

        // Si pasa, está autorizado
        setAutorizado(true);
      } catch (error) {
        console.error('Fallo en verificación de sesión:', error);
        setAutorizado(false);
        localStorage.removeItem('token');
        setAuthToken(null);
      } finally {
        setVerificado(true);
      }
    };

    verificarTokenBackend();
  }, [token, rolPermitido]);

  if (!verificado) return null; // opcional: puedes mostrar un spinner si deseas

  return autorizado ? children : <Navigate to="/login" replace />;
}