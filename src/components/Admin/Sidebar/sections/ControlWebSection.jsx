import {
  HiCog,
  HiDocumentText,
  HiOutlineCollection,
  HiOutlineChatAlt,
  HiChevronDown,
  HiChevronUp,
  HiOutlineViewGrid,
} from 'react-icons/hi';
import clsx from 'clsx';
import { useState } from 'react';

export default function ControlWebSection({ isActive, navigate }) {
  const [open, setOpen] = useState(
    ['/control-web', '/servicios', '/proyectos', '/mensajes'].some(path =>
      window.location.pathname.startsWith(path)
    )
  );

  return (
    <div className="w-full">
      {/* Botón principal Control Web */}
      <button
        onClick={() => setOpen(prev => !prev)}
        className={clsx(
          'flex items-center justify-between w-full px-3 py-2 rounded-lg transition',
          ['/control-web', '/servicios', '/proyectos', '/mensajes'].some(path =>
            window.location.pathname.startsWith(path)
          )
            ? 'bg-purple-50 text-purple-700 font-semibold shadow'
            : 'hover:bg-gray-50 text-gray-700'
        )}
      >
        <div className="flex items-center gap-2">
          <HiCog className="text-purple-500" />
          Control Web
        </div>
        {open ? <HiChevronUp /> : <HiChevronDown />}
      </button>

      {/* Submenú */}
      {open && (
        <div className="ml-6 mt-2 space-y-1 text-sm">
          <button
            onClick={() => navigate('/control-web')}
            className={clsx(
              'flex items-center gap-2 w-full text-left px-3 py-1.5 rounded transition',
              isActive('/control-web')
                ? 'bg-purple-100 text-purple-700 font-semibold'
                : 'hover:bg-gray-100 text-gray-700'
            )}
          >
            <HiOutlineViewGrid className="text-purple-500" />
            Panel del sitio web
          </button>
          <button
            onClick={() => navigate('/servicios')}
            className={clsx(
              'flex items-center gap-2 w-full text-left px-3 py-1.5 rounded transition',
              isActive('/servicios')
                ? 'bg-purple-100 text-purple-700 font-semibold'
                : 'hover:bg-gray-100 text-gray-700'
            )}
          >
            <HiOutlineCollection className="text-purple-500" />
            Servicios
          </button>
          <button
            onClick={() => navigate('/proyectos')}
            className={clsx(
              'flex items-center gap-2 w-full text-left px-3 py-1.5 rounded transition',
              isActive('/proyectos')
                ? 'bg-purple-100 text-purple-700 font-semibold'
                : 'hover:bg-gray-100 text-gray-700'
            )}
          >
            <HiDocumentText className="text-purple-500" />
            Proyectos
          </button>
          <button
            onClick={() => navigate('/mensajes')}
            className={clsx(
              'flex items-center gap-2 w-full text-left px-3 py-1.5 rounded transition',
              isActive('/mensajes')
                ? 'bg-purple-100 text-purple-700 font-semibold'
                : 'hover:bg-gray-100 text-gray-700'
            )}
          >
            <HiOutlineChatAlt className="text-purple-500" />
            Mensajes
          </button>
        </div>
      )}
    </div>
  );
}