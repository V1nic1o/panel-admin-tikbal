import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import {
  HiHome,
  HiArrowLeft,
  HiLogout,
} from 'react-icons/hi';
import clsx from 'clsx';

export default function AdminLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  const cerrarSesion = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const goBack = () => {
    if (location.pathname !== '/dashboard') {
      navigate(-1);
    }
  };

  const isActive = (path) => location.pathname === path;

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Header que cambia de posición en móviles */}
      <header
        className={clsx(
          `fixed z-50 w-[95%] max-w-[95%] sm:max-w-max
          bg-gradient-to-r from-[#0b3e7a] to-[#5a7f8c] text-white shadow-2xl backdrop-blur-md
          border border-white/20 rounded-full px-4 py-3
          flex items-center justify-center sm:justify-start gap-4
          text-sm font-medium transition-all duration-500`,
          // ✅ Posición top en desktop, bottom en móvil
          'left-1/2 transform -translate-x-1/2',
          'top-4 sm:top-4 sm:bottom-auto',
          'bottom-4 sm:bottom-auto'
        )}
      >
        {/* Logo */}
        <span className="font-bold text-base sm:text-lg select-none">Tikb’al</span>

        {/* Botones */}
        <nav className="flex items-center gap-4 flex-wrap justify-center sm:justify-start">
          <button
            onClick={goBack}
            title="Regresar"
            className="flex items-center gap-2 px-3 py-1 rounded-md hover:text-white/80 transition-all"
          >
            <HiArrowLeft className="text-lg" />
            <span className="hidden sm:inline">Regresar</span>
          </button>

          <button
            onClick={() => navigate('/dashboard')}
            title="Ir a Inicio"
            className={clsx(
              'flex items-center gap-2 px-3 py-1 rounded-md transition-all',
              isActive('/dashboard')
                ? 'bg-white/20 text-white font-semibold'
                : 'hover:text-white/80 text-white'
            )}
          >
            <HiHome className="text-lg" />
            <span className="hidden sm:inline">Inicio</span>
          </button>

          <button
            onClick={cerrarSesion}
            title="Cerrar sesión"
            className="flex items-center gap-2 px-3 py-1 text-red-200 hover:text-red-400 transition-all"
          >
            <HiLogout className="text-lg" />
            <span className="hidden sm:inline">Cerrar sesión</span>
          </button>
        </nav>
      </header>

      {/* Main con padding top y bottom para que no quede tapado */}
      <main className="pt-32 pb-32 px-4 sm:px-6 max-w-screen-xl mx-auto w-full">
        <Outlet />
      </main>
    </div>
  );
}