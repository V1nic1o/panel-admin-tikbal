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
      {/* Header estilo flotante */}
      <header className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-[95%] sm:w-auto max-w-[95%] sm:max-w-max
        bg-gradient-to-r from-[#0b3e7a] to-[#5a7f8c] text-white shadow-2xl backdrop-blur-md
        border border-white/20 rounded-full px-4 py-3 flex items-center justify-between sm:justify-start gap-4 sm:gap-6
        text-sm font-medium transition-all duration-500"
      >
        {/* Título */}
        <button
          onClick={() => navigate('/dashboard')}
          className="font-bold text-white text-base sm:text-lg hover:underline transition-colors"
        >
          Tikb’al Admin
        </button>

        {/* Botón hamburguesa móvil */}
        <button
          onClick={toggleMenu}
          className="sm:hidden text-white text-xl"
          aria-label="Menú"
        >
          {menuAbierto ? <FaTimes /> : <FaBars />}
        </button>

        {/* Menú horizontal (pantallas grandes) */}
        <nav className="hidden sm:flex items-center gap-4">
          <Link to="/dashboard" className="flex items-center gap-1 px-2 py-1 rounded-md hover:text-white/80 transition">
            <FaTachometerAlt /> Dashboard
          </Link>
          <Link to="/servicios" className="flex items-center gap-1 px-2 py-1 rounded-md hover:text-white/80 transition">
            <FaLeaf /> Servicios
          </Link>
          <Link to="/proyectos" className="flex items-center gap-1 px-2 py-1 rounded-md hover:text-white/80 transition">
            <FaProjectDiagram /> Proyectos
          </Link>
          <Link to="/mensajes" className="flex items-center gap-1 px-2 py-1 rounded-md hover:text-white/80 transition">
            <FaEnvelope /> Mensajes
          </Link>
          <button
            onClick={cerrarSesion}
            className="flex items-center gap-1 px-2 py-1 text-red-200 hover:text-red-400 transition"
          >
            <FaSignOutAlt /> Cerrar sesión
          </button>
        </nav>
      </header>

      {/* Menú desplegable (móviles) */}
      {menuAbierto && (
        <div className="fixed top-20 right-6 z-40 w-[85%] max-w-sm bg-gradient-to-br from-[#0b3e7a] to-[#5a7f8c]
          text-white rounded-2xl shadow-2xl px-6 py-6 flex flex-col gap-4 animate-fadeIn"
        >
          <Link to="/dashboard" onClick={toggleMenu} className="flex items-center gap-3 py-2 px-4 rounded-xl hover:bg-white/10 transition">
            <FaTachometerAlt /> Dashboard
          </Link>
          <Link to="/servicios" onClick={toggleMenu} className="flex items-center gap-3 py-2 px-4 rounded-xl hover:bg-white/10 transition">
            <FaLeaf /> Servicios
          </Link>
          <Link to="/proyectos" onClick={toggleMenu} className="flex items-center gap-3 py-2 px-4 rounded-xl hover:bg-white/10 transition">
            <FaProjectDiagram /> Proyectos
          </Link>
          <Link to="/mensajes" onClick={toggleMenu} className="flex items-center gap-3 py-2 px-4 rounded-xl hover:bg-white/10 transition">
            <FaEnvelope /> Mensajes
          </Link>
          <button
            onClick={() => {
              toggleMenu();
              cerrarSesion();
            }}
            className="flex items-center gap-3 py-2 px-4 rounded-xl text-red-200 hover:text-red-400 transition"
          >
            <FaSignOutAlt /> Cerrar sesión
          </button>
        </div>
      )}

      {/* Contenido del panel */}
      <main className="pt-28 px-4 sm:px-6 max-w-screen-xl mx-auto">
        <Outlet />
      </main>
    </div>
  );
}