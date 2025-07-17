import {
  HiCog,
  HiDocumentText,
  HiOutlineCollection,
  HiOutlineChatAlt,
  HiChevronDown,
  HiChevronUp,
} from 'react-icons/hi';
import clsx from 'clsx';

export default function ControlWebSection({ open, setOpen, isActive, navigate }) {
  return (
    <div>
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-3 py-2 rounded-lg hover:bg-gray-50 transition text-gray-700"
      >
        <span className="flex items-center gap-2">
          <HiCog className="text-purple-500" />
          Control Web
        </span>
        {open ? <HiChevronUp /> : <HiChevronDown />}
      </button>

      {open && (
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
  );
}