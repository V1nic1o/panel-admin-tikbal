import { useNavigate, useLocation } from 'react-router-dom';
import {
  HiHome,
  HiLogout,
  HiX,
  HiArrowLeft,
  HiCog,
  HiDocumentText,
  HiOutlineClipboardList,
  HiOutlineCollection,
  HiOutlineChatAlt,
  HiChevronDown,
  HiChevronUp,
} from 'react-icons/hi';
import { useState } from 'react';
import clsx from 'clsx';
import logo from '../../../assets/logo-tikbal.jpg';

export default function Sidebar({ sidebarOpen, setSidebarOpen }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [openWeb, setOpenWeb] = useState(false);
  const [openCotizaciones, setOpenCotizaciones] = useState(false);

  const isActive = (path) => location.pathname === path;

  const goBack = () => {
    if (location.pathname !== '/dashboard') navigate(-1);
  };

  const cerrarSesion = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <>
      {/* Fondo oscuro en móviles cuando sidebar está abierto */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar principal */}
      <aside
        className={clsx(
          'fixed top-0 left-0 h-screen w-72 bg-white z-50 shadow-lg border-r border-gray-200',
          'transition-transform duration-300 ease-in-out flex flex-col justify-between',
          sidebarOpen ? 'translate-x-0' : '-translate-x-full',
          'lg:translate-x-0'
        )}
      >
        {/* 🔷 Logo y botón de cierre */}
        <div className="px-6 py-5 flex items-center justify-between border-b border-gray-100">
          <div className="flex items-center gap-2">
            <img src={logo} alt="Logo" className="w-8 h-8 rounded-md shadow-sm" />
            <span className="font-bold text-lg tracking-tight text-blue-600">Tikb’al</span>
          </div>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-gray-400">
            <HiX className="text-xl" />
          </button>
        </div>

        {/* Navegación principal */}
        <nav className="flex flex-col gap-1 px-4 py-6 flex-1 text-sm font-medium overflow-y-auto">
          <button
            onClick={goBack}
            className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-50 transition"
          >
            <HiArrowLeft className="text-blue-500" />
            <span className="text-gray-600">Regresar</span>
          </button>

          <button
            onClick={() => navigate('/dashboard')}
            className={clsx(
              'flex items-center gap-2 px-3 py-2 rounded-lg transition',
              isActive('/dashboard')
                ? 'bg-blue-50 text-blue-700 font-semibold shadow'
                : 'hover:bg-gray-50 text-gray-700'
            )}
          >
            <HiHome className="text-blue-500" />
            Inicio
          </button>

          {/* Control Web */}
          <div>
            <button
              onClick={() => setOpenWeb(!openWeb)}
              className="w-full flex items-center justify-between px-3 py-2 rounded-lg hover:bg-gray-50 transition text-gray-700"
            >
              <span className="flex items-center gap-2">
                <HiCog className="text-purple-500" />
                Control Web
              </span>
              {openWeb ? <HiChevronUp /> : <HiChevronDown />}
            </button>

            {openWeb && (
              <div className="ml-5 mt-1 flex flex-col gap-1">
                <button
                  onClick={() => navigate('/servicios')}
                  className={clsx(
                    'flex items-center gap-2 px-3 py-1.5 rounded-lg',
                    isActive('/servicios')
                      ? 'bg-purple-50 text-purple-700 font-semibold'
                      : 'hover:bg-gray-50 text-gray-600'
                  )}
                >
                  <HiOutlineCollection className="text-purple-500" />
                  Servicios
                </button>
                <button
                  onClick={() => navigate('/proyectos')}
                  className={clsx(
                    'flex items-center gap-2 px-3 py-1.5 rounded-lg',
                    isActive('/proyectos')
                      ? 'bg-purple-50 text-purple-700 font-semibold'
                      : 'hover:bg-gray-50 text-gray-600'
                  )}
                >
                  <HiDocumentText className="text-purple-500" />
                  Proyectos
                </button>
                <button
                  onClick={() => navigate('/mensajes')}
                  className={clsx(
                    'flex items-center gap-2 px-3 py-1.5 rounded-lg',
                    isActive('/mensajes')
                      ? 'bg-purple-50 text-purple-700 font-semibold'
                      : 'hover:bg-gray-50 text-gray-600'
                  )}
                >
                  <HiOutlineChatAlt className="text-purple-500" />
                  Mensajes
                </button>
              </div>
            )}
          </div>

          {/* Cotizaciones */}
          <div>
            <button
              onClick={() => setOpenCotizaciones(!openCotizaciones)}
              className="w-full flex items-center justify-between px-3 py-2 rounded-lg hover:bg-gray-50 transition text-gray-700"
            >
              <span className="flex items-center gap-2">
                <HiOutlineClipboardList className="text-yellow-500" />
                Cotizaciones
              </span>
              {openCotizaciones ? <HiChevronUp /> : <HiChevronDown />}
            </button>

            {openCotizaciones && (
              <div className="ml-5 mt-1 flex flex-col gap-1">
                <button
                  onClick={() => navigate('/cotizaciones/crear')}
                  className={clsx(
                    'flex items-center gap-2 px-3 py-1.5 rounded-lg',
                    isActive('/cotizaciones/crear')
                      ? 'bg-yellow-50 text-yellow-700 font-semibold'
                      : 'hover:bg-gray-50 text-gray-600'
                  )}
                >
                  <HiDocumentText className="text-yellow-500" />
                  Nueva Cotización
                </button>
                <button
                  onClick={() => navigate('/cotizaciones/historial')}
                  className={clsx(
                    'flex items-center gap-2 px-3 py-1.5 rounded-lg',
                    isActive('/cotizaciones/historial')
                      ? 'bg-yellow-50 text-yellow-700 font-semibold'
                      : 'hover:bg-gray-50 text-gray-600'
                  )}
                >
                  <HiOutlineClipboardList className="text-yellow-500" />
                  Historial
                </button>
              </div>
            )}
          </div>
        </nav>

        {/* Botón de cerrar sesión */}
        <div className="px-6 py-4 border-t border-gray-100">
          <button
            onClick={cerrarSesion}
            className="flex items-center gap-2 w-full px-3 py-2 rounded-lg text-red-500 hover:bg-red-50"
          >
            <HiLogout className="text-lg" />
            Cerrar sesión
          </button>
        </div>
      </aside>
    </>
  );
}