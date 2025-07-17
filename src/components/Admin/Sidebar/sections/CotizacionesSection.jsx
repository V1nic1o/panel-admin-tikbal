import {
  HiOutlineClipboardList,
  HiDocumentText,
  HiChevronUp,
  HiChevronDown,
} from 'react-icons/hi';
import clsx from 'clsx';

export default function CotizacionesSection({ open, setOpen, isActive, navigate }) {
  return (
    <div>
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-3 py-2 rounded-lg hover:bg-gray-50 transition text-gray-700"
      >
        <span className="flex items-center gap-2">
          <HiOutlineClipboardList className="text-yellow-500" />
          Cotizaciones
        </span>
        {open ? <HiChevronUp /> : <HiChevronDown />}
      </button>

      {open && (
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
  );
}