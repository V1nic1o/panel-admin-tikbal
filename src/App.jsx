// src/App.jsx
import { Routes, Route, Navigate } from 'react-router-dom';
import AdminLayout from './layouts/AdminLayout';
import Dashboard from './pages/Dashboard/Dashboard';
import Servicios from './pages/Servicios/Servicios';
import Proyectos from './pages/Proyectos/Proyectos';
import Mensajes from './pages/Mensajes/Mensajes';
import Login from './pages/Auth/Login';
import ProtectedRoute from './routes/ProtectedRoute';

function App() {
  return (
    <Routes>
      {/* Ruta pública */}
      <Route path="/login" element={<Login />} />

      {/* Rutas protegidas */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="servicios" element={<Servicios />} />
        <Route path="proyectos" element={<Proyectos />} />
        <Route path="mensajes" element={<Mensajes />} />
      </Route>

      {/* Fallback si ruta no existe */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default App;