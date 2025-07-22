import { Routes, Route, Navigate } from 'react-router-dom';
import { LoaderProvider } from './services/LoaderContext';
import ProtectedRoute from './routes/ProtectedRoute';
import Login from './pages/Auth/Login';

// ✅ Layout Admin y páginas principales
import AdminLayout from './layouts/AdminLayout';
import Dashboard from './pages/Dashboard/Dashboard';
import ControlWeb from './pages/Dashboard/ControlWeb';
import Servicios from './pages/web/Servicios/Servicios';
import Proyectos from './pages/web/Proyectos/Proyectos';
import Mensajes from './pages/web/Mensajes/Mensajes';

// ✅ Módulo Cotizaciones
import ControlCotizaciones from './pages/Cotizaciones/Control/ControlCotizaciones';
import Crear from './pages/Cotizaciones/Crear/Crear';
import Editar from './pages/Cotizaciones/Editar/Editar';
import Historial from './pages/Cotizaciones/Historial/Historial';

// ✅ Módulo Jardines (Admin)
import JardinesControl from './pages/Jardines/Control/JardinesControl';
import Usuarios from './pages/Jardines/Usuarios/Usuarios';
import TodosLosJardines from './pages/Jardines/Todos/TodosLosJardines';
import DetalleJardin from './pages/Jardines/Detalle/DetalleJardin';
import DetalleSeccion from './pages/Jardines/Seccion/DetalleSeccion';
import DetalleTarea from './pages/Jardines/Tarea/DetalleTarea';

// ✅ Panel Jardinero
import JardineroLayout from './layouts/JardineroLayout';
import InicioJardinero from './pages/Jardinero/Inicio/Inicio';

function App() {
  return (
    <LoaderProvider>
      <Routes>
        {/* 🔓 Ruta pública */}
        <Route path="/login" element={<Login />} />

        {/* 🔐 Rutas protegidas para ADMIN */}
        <Route
          path="/"
          element={
            <ProtectedRoute rolPermitido="admin">
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

          {/* Cotizaciones */}
          <Route path="cotizaciones" element={<ControlCotizaciones />} />
          <Route path="cotizaciones/crear" element={<Crear />} />
          <Route path="cotizaciones/editar/:id" element={<Editar />} />
          <Route path="cotizaciones/historial" element={<Historial />} />

          {/* Jardines */}
          <Route path="jardines" element={<JardinesControl />} />
          <Route path="jardines/usuarios" element={<Usuarios />} />
          <Route path="jardines/ver" element={<TodosLosJardines />} />
          <Route path="jardines/ver/:id" element={<DetalleJardin />} />
          <Route path="jardines/ver/:id/:seccionId" element={<DetalleSeccion />} />
          <Route path="jardines/ver/:id/:seccionId/tarea/:tareaId" element={<DetalleTarea />} />
        </Route>

        {/* 🔐 Rutas protegidas para JARDINERO */}
        <Route
          path="/jardinero"
          element={
            <ProtectedRoute rolPermitido="jardinero">
              <JardineroLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<InicioJardinero />} />
          {/* futuras rutas del jardinero aquí */}
        </Route>

        {/* 🔁 Redirección global */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </LoaderProvider>
  );
}

export default App;