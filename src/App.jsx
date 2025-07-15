import { Routes, Route, Navigate } from 'react-router-dom';
import AdminLayout from './layouts/AdminLayout';
import Dashboard from './pages/Dashboard/Dashboard';
import ControlWeb from './pages/Dashboard/ControlWeb';
import Servicios from './pages/Servicios/Servicios';
import Proyectos from './pages/Proyectos/Proyectos';
import Mensajes from './pages/Mensajes/Mensajes';
import Login from './pages/Auth/Login';
import ProtectedRoute from './routes/ProtectedRoute';
import { LoaderProvider } from './services/LoaderContext';

// ✅ Módulo Cotizaciones
import ControlCotizaciones from './pages/Cotizaciones/Control/ControlCotizaciones';
import Crear from './pages/Cotizaciones/Crear/Crear';
import Editar from './pages/Cotizaciones/Editar/Editar';
import Historial from './pages/Cotizaciones/Historial/Historial';

function App() {
  return (
    <LoaderProvider>
      <Routes>
        {/* 🔓 Ruta pública */}
        <Route path="/login" element={<Login />} />

        {/* 🔐 Rutas protegidas */}
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
          <Route path="control-web" element={<ControlWeb />} />
          <Route path="servicios" element={<Servicios />} />
          <Route path="proyectos" element={<Proyectos />} />
          <Route path="mensajes" element={<Mensajes />} />

          {/* ✅ Cotizaciones */}
          <Route path="cotizaciones" element={<ControlCotizaciones />} />
          <Route path="cotizaciones/crear" element={<Crear />} />
          <Route path="cotizaciones/editar/:id" element={<Editar />} />
          <Route path="cotizaciones/historial" element={<Historial />} />
        </Route>

        {/* 🔁 Redirección para rutas no válidas */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </LoaderProvider>
  );
}

export default App;