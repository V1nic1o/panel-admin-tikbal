import {
  HiOutlineClipboardList,
  HiDocumentText,
  HiOutlineViewGrid,
  HiChevronUp,
  HiChevronDown,
} from 'react-icons/hi';
import clsx from 'clsx';
import { useState } from 'react';

export default function CotizacionesSection({ isActive, navigate }) {
  const [open, setOpen] = useState(
    window.location.pathname.startsWith('/cotizaciones')
  );

  return (
    <div className="w-full">
      {/* Botón principal Cotizaciones */}
      <button
        onClick={() => setOpen((prev) => !prev)}
        className={clsx(
          'flex items-center justify-between w-full px-3 py-2 rounded-lg transition',
          window.location.pathname.startsWith('/cotizaciones')
            ? 'bg-yellow-50 text-yellow-700 font-semibold shadow'
            : 'hover:bg-gray-50 text-gray-700'
        )}
      >
        <div className="flex items-center gap-2">
          <HiOutlineClipboardList className="text-yellow-500" />
          Cotizaciones
        </div>
        {open ? <HiChevronUp className="text-sm" /> : <HiChevronDown className="text-sm" />}
      </button>

      {/* Submenú */}
      {open && (
        <div className="ml-6 mt-2 space-y-1 text-sm">
          <button
            onClick={() => navigate('/cotizaciones')}
            className={clsx(
              'flex items-center gap-2 w-full text-left px-3 py-1.5 rounded transition',
              isActive('/cotizaciones')
                ? 'bg-yellow-100 text-yellow-700 font-semibold'
                : 'hover:bg-gray-100 text-gray-700'
            )}
          >
            <HiOutlineViewGrid className="text-yellow-500" />
            Panel Cotizaciones
          </button>
          <button
            onClick={() => navigate('/cotizaciones/crear')}
            className={clsx(
              'flex items-center gap-2 w-full text-left px-3 py-1.5 rounded transition',
              isActive('/cotizaciones/crear')
                ? 'bg-yellow-100 text-yellow-700 font-semibold'
                : 'hover:bg-gray-100 text-gray-700'
            )}
          >
            <HiDocumentText className="text-yellow-500" />
            Nueva Cotización
          </button>
          <button
            onClick={() => navigate('/cotizaciones/historial')}
            className={clsx(
              'flex items-center gap-2 w-full text-left px-3 py-1.5 rounded transition',
              isActive('/cotizaciones/historial')
                ? 'bg-yellow-100 text-yellow-700 font-semibold'
                : 'hover:bg-gray-100 text-gray-700'
            )}
          >
            <HiOutlineClipboardList className="text-yellow-500" />
            Historial
          </button>
        </div>
      )}
    </div>
  );
}