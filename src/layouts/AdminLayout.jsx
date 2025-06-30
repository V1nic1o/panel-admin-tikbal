import { useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import {
  FaTachometerAlt,
  FaLeaf,
  FaProjectDiagram,
  FaEnvelope,
  FaSignOutAlt,
  FaBars,
  FaTimes
} from 'react-icons/fa';

export default function AdminLayout() {
  const navigate = useNavigate();
  const [menuAbierto, setMenuAbierto] = useState(false);

  const cerrarSesion = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const toggleMenu = () => setMenuAbierto((prev) => !prev);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-primary text-white px-4 py-3 shadow-md">
        <div className="max-w-screen-xl mx-auto flex items-center justify-between">
          <h1 className="text-lg sm:text-xl font-bold">Tikb’al Admin</h1>

          {/* Botón hamburguesa en móviles */}
          <button
            className="sm:hidden text-white text-xl"
            onClick={toggleMenu}
            aria-label="Menú"
          >
            {menuAbierto ? <FaTimes /> : <FaBars />}
          </button>

          {/* Menú en pantallas grandes */}
          <nav className="hidden sm:flex items-center gap-6 text-sm font-medium">
            <Link to="/dashboard" className="hover:underline flex items-center gap-1">
              <FaTachometerAlt /> Dashboard
            </Link>
            <Link to="/servicios" className="hover:underline flex items-center gap-1">
              <FaLeaf /> Servicios
            </Link>
            <Link to="/proyectos" className="hover:underline flex items-center gap-1">
              <FaProjectDiagram /> Proyectos
            </Link>
            <Link to="/mensajes" className="hover:underline flex items-center gap-1">
              <FaEnvelope /> Mensajes
            </Link>
            <button
              onClick={cerrarSesion}
              className="hover:underline flex items-center gap-1 text-red-200 hover:text-red-400"
            >
              <FaSignOutAlt /> Cerrar sesión
            </button>
          </nav>
        </div>

        {/* Menú desplegable en móviles */}
        {menuAbierto && (
          <nav className="flex flex-col sm:hidden mt-3 gap-3 text-sm font-medium px-1">
            <Link to="/dashboard" onClick={toggleMenu} className="hover:underline flex items-center gap-2">
              <FaTachometerAlt /> Dashboard
            </Link>
            <Link to="/servicios" onClick={toggleMenu} className="hover:underline flex items-center gap-2">
              <FaLeaf /> Servicios
            </Link>
            <Link to="/proyectos" onClick={toggleMenu} className="hover:underline flex items-center gap-2">
              <FaProjectDiagram /> Proyectos
            </Link>
            <Link to="/mensajes" onClick={toggleMenu} className="hover:underline flex items-center gap-2">
              <FaEnvelope /> Mensajes
            </Link>
            <button
              onClick={() => {
                toggleMenu();
                cerrarSesion();
              }}
              className="hover:underline flex items-center gap-2 text-red-200 hover:text-red-400"
            >
              <FaSignOutAlt /> Cerrar sesión
            </button>
          </nav>
        )}
      </header>

      {/* Contenido */}
      <main className="p-4 sm:p-6 max-w-screen-xl mx-auto">
        <Outlet />
      </main>
    </div>
  );
}