// src/components/Admin/Sidebar/Sidebar.jsx (modularizado)
import { useNavigate, useLocation } from 'react-router-dom';
import { HiX, HiArrowLeft, HiHome, HiLogout } from 'react-icons/hi';
import clsx from 'clsx';
import { useState } from 'react';
import logo from '../../../assets/logo-tikbal.jpg';

import ControlWebSection from './sections/ControlWebSection';
import CotizacionesSection from './sections/CotizacionesSection';
import JardinesLink from './sections/JardinesLink';

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
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={clsx(
          'fixed top-0 left-0 h-screen w-72 bg-white z-50 shadow-lg border-r border-gray-200',
          'transition-transform duration-300 ease-in-out flex flex-col justify-between',
          sidebarOpen ? 'translate-x-0' : '-translate-x-full',
          'lg:translate-x-0'
        )}
      >
        {/* Logo */}
        <div className="px-6 py-5 flex items-center justify-between border-b border-gray-100">
          <div className="flex items-center gap-2">
            <img src={logo} alt="Logo" className="w-8 h-8 rounded-md shadow-sm" />
            <span className="font-bold text-lg tracking-tight text-blue-600">Tikb’al</span>
          </div>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-gray-400">
            <HiX className="text-xl" />
          </button>
        </div>

        {/* Navegación */}
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

          <ControlWebSection open={openWeb} setOpen={setOpenWeb} isActive={isActive} navigate={navigate} />
          <CotizacionesSection open={openCotizaciones} setOpen={setOpenCotizaciones} isActive={isActive} navigate={navigate} />
          <JardinesLink isActive={isActive} navigate={navigate} />
        </nav>

        {/* Cerrar sesión */}
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