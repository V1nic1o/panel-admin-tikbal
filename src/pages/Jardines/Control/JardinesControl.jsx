import { useNavigate } from 'react-router-dom';
import { MdOutlinePark } from 'react-icons/md';
import { FaUsersCog, FaSeedling, FaTasks } from 'react-icons/fa';
import { HiOutlineClipboardCheck } from 'react-icons/hi';

export default function JardinesControl() {
  const navigate = useNavigate();

  const cards = [
    {
      title: 'Gestión de Usuarios',
      description: 'Asignar roles de administrador o jardinero',
      icon: <FaUsersCog className="text-3xl text-blue-600" />,
      route: '/jardines/usuarios',
    },
    {
      title: 'Crear Jardín',
      description: 'Registrar nuevo jardín con imagen aérea',
      icon: <FaSeedling className="text-3xl text-green-600" />,
      route: '/jardines/crear',
    },
    {
      title: 'Ver Jardines',
      description: 'Dividir por secciones e ingresar tareas',
      icon: <FaTasks className="text-3xl text-amber-600" />,
      route: '/jardines/ver',
    },
    {
      title: 'Reportes y Seguimiento',
      description: 'Seguimiento de tareas y reportes a jardineros',
      icon: <HiOutlineClipboardCheck className="text-3xl text-purple-600" />,
      route: '/jardines/reportes',
    },
  ];

  return (
    <div className="p-6 md:p-10">
      {/* 🟢 Encabezado */}
      <div className="flex items-center gap-4 mb-6">
        <MdOutlinePark className="text-4xl text-green-600" />
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Módulo de Jardines
          </h1>
          <p className="text-gray-500">
            Administra usuarios, jardines, secciones y tareas de forma visual e intuitiva.
          </p>
        </div>
      </div>

      {/* 🧩 Tarjetas de control */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 mt-10">
        {cards.map((card, i) => (
          <div
            key={i}
            onClick={() => navigate(card.route)}
            className="cursor-pointer bg-white rounded-xl border border-gray-200 shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300 p-6 flex flex-col items-center text-center"
          >
            <div className="mb-4">{card.icon}</div>
            <h2 className="text-lg font-semibold text-gray-800 mb-1">{card.title}</h2>
            <p className="text-gray-500 text-sm">{card.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}