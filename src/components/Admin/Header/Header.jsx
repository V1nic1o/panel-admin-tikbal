import { FaBell } from 'react-icons/fa';
import { FiSearch } from 'react-icons/fi';
import { HiMenuAlt2 } from 'react-icons/hi';

export default function Header({ onToggleSidebar, sidebarOpen }) {
  return (
    <>
      {/* 🔲 Fondo translúcido detrás del header en móviles si sidebar está abierto */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/40 z-30 lg:hidden" />
      )}

      <header className="sticky top-0 z-40 w-full h-20 bg-white px-4 md:px-6 border-b border-gray-200 shadow-sm flex items-center justify-between">
        {/* 🔘 Botón hamburguesa solo visible en móviles */}
        <div className="lg:hidden">
          <button
            onClick={onToggleSidebar}
            className="text-gray-500 hover:text-blue-500 text-2xl transition-all"
          >
            <HiMenuAlt2 />
          </button>
        </div>

        {/* 🔘 Espaciador en pantallas grandes */}
        <div className="hidden lg:block w-6" />

        {/* 🔘 Iconos a la derecha */}
        <div className="flex items-center gap-4 ml-auto">
          {/* 🔍 Search icon */}
          <button className="text-gray-600 hover:text-blue-500 text-xl transition-all">
            <FiSearch />
          </button>

          {/* 🌐 Language flag */}
          <button>
            <img
              src="https://flagcdn.com/24x18/gb.png"
              alt="English"
              className="w-6 h-4 rounded-sm shadow-sm border border-gray-300"
            />
          </button>

          {/* 🔔 Bell con badge */}
          <div className="relative">
            <button className="text-gray-600 hover:text-blue-500 text-xl transition-all">
              <FaBell />
            </button>
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
              2
            </span>
          </div>

          {/* 👤 Avatar */}
          <button>
            <img
              src="https://minimal-kit-react.vercel.app/assets/images/avatars/avatar_1.jpg"
              alt="User"
              className="w-10 h-10 rounded-full border-2 border-blue-300 shadow-sm object-cover"
              onError={(e) => {
                e.target.src = '/fallback-avatar.png'; // Si la imagen falla, usa una de respaldo
              }}
            />
          </button>
        </div>
      </header>
    </>
  );
}