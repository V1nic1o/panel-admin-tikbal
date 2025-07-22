import { useNavigate } from 'react-router-dom';
import { MdOutlinePark } from 'react-icons/md';
import { FaUsersCog, FaTasks } from 'react-icons/fa';

export default function JardinesControl() {
  const navigate = useNavigate();

  const cards = [
    {
      title: 'Gestión de Usuarios',
      description: 'Asignar roles de administrador o jardinero.',
      icon: <FaUsersCog className="text-4xl text-blue-600" />,
      route: '/jardines/usuarios',
    },
    {
      title: 'Ver Jardines',
      description: 'Dividir jardines en secciones e ingresar tareas.',
      icon: <FaTasks className="text-4xl text-amber-600" />,
      route: '/jardines/ver',
    },
  ];

  return (
    <div className="p-6 md:p-10">
      {/* ✅ Encabezado */}
      <div className="flex items-center gap-4 mb-10">
        <div className="p-3 rounded-full bg-green-100 shadow-inner">
          <MdOutlinePark className="text-4xl text-green-600" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Módulo de Jardines
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Administra usuarios, jardines, secciones y tareas de forma visual e intuitiva.
          </p>
        </div>
      </div>

      {/* ✅ Tarjetas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {cards.map((card, i) => (
          <div
            key={i}
            onClick={() => navigate(card.route)}
            className="cursor-pointer bg-white rounded-xl border border-gray-200 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 p-6 flex flex-col items-center text-center group"
          >
            <div className="mb-4 transform transition-transform duration-300 group-hover:scale-110">
              {card.icon}
            </div>
            <h2 className="text-lg font-semibold text-gray-800 mb-1">
              {card.title}
            </h2>
            <p className="text-gray-500 text-sm">{card.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}