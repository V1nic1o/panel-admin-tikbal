import { useState } from 'react';
import {
  HiOutlineViewGrid,
  HiChevronDown,
  HiChevronUp,
  HiUsers,
  HiEye,
} from 'react-icons/hi';
import clsx from 'clsx';

export default function JardinesLink({ isActive, navigate }) {
  const [open, setOpen] = useState(false);

  const isModuloActivo = window.location.pathname.startsWith('/jardines');

  return (
    <div className="w-full">
      {/* Botón principal Jardines */}
      <button
        onClick={() => setOpen((prev) => !prev)}
        className={clsx(
          'flex items-center justify-between w-full px-3 py-2 rounded-lg transition',
          isModuloActivo
            ? 'bg-green-50 text-green-700 font-semibold shadow'
            : 'hover:bg-gray-50 text-gray-700'
        )}
      >
        <div className="flex items-center gap-2">
          <HiOutlineViewGrid className="text-green-600" />
          Jardines
        </div>
        {open ? (
          <HiChevronUp className="text-sm" />
        ) : (
          <HiChevronDown className="text-sm" />
        )}
      </button>

      {/* Submenú */}
      {open && (
        <div className="ml-6 mt-2 space-y-1 text-sm">
          <button
            onClick={() => navigate('/jardines')}
            className={clsx(
              'flex items-center gap-2 w-full text-left px-3 py-1.5 rounded transition',
              isActive('/jardines')
                ? 'bg-green-100 text-green-700 font-semibold'
                : 'hover:bg-gray-100 text-gray-700'
            )}
          >
            <HiOutlineViewGrid className="text-green-500" />
            Panel Jardines
          </button>
          <button
            onClick={() => navigate('/jardines/usuarios')}
            className={clsx(
              'flex items-center gap-2 w-full text-left px-3 py-1.5 rounded transition',
              isActive('/jardines/usuarios')
                ? 'bg-green-100 text-green-700 font-semibold'
                : 'hover:bg-gray-100 text-gray-700'
            )}
          >
            <HiUsers className="text-green-500" />
            Usuarios
          </button>
          <button
            onClick={() => navigate('/jardines/ver')}
            className={clsx(
              'flex items-center gap-2 w-full text-left px-3 py-1.5 rounded transition',
              isActive('/jardines/ver')
                ? 'bg-green-100 text-green-700 font-semibold'
                : 'hover:bg-gray-100 text-gray-700'
            )}
          >
            <HiEye className="text-green-500" />
            Ver Jardines
          </button>
        </div>
      )}
    </div>
  );
}