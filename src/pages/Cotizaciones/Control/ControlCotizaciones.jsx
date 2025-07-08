import { useNavigate } from 'react-router-dom';
import { FaFileAlt, FaHistory } from 'react-icons/fa';

export default function ControlCotizaciones() {
  const navigate = useNavigate();

  const cards = [
    {
      title: 'Nueva Cotización',
      description: 'Crear una cotización desde cero',
      icon: <FaFileAlt className="text-4xl text-indigo-800" />,
      route: '/cotizaciones/crear',
    },
    {
      title: 'Historial',
      description: 'Ver y administrar cotizaciones previas',
      icon: <FaHistory className="text-4xl text-orange-600" />,
      route: '/cotizaciones/historial',
    },
  ];

  return (
    <div className="min-h-screen px-6 py-12 bg-gradient-to-br from-[#f4f4f4] to-[#dbccc1]">
      <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-10">
        Gestión de Cotizaciones
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        {cards.map((card, i) => (
          <div
            key={i}
            onClick={() => navigate(card.route)}
            className="cursor-pointer bg-white rounded-2xl p-6 shadow-xl hover:shadow-2xl border border-gray-200 hover:border-green-600 transition-all duration-300 group"
          >
            <div className="flex items-center justify-center mb-4">
              {card.icon}
            </div>
            <h2 className="text-xl font-semibold text-gray-800 group-hover:text-green-800 mb-2 text-center">
              {card.title}
            </h2>
            <p className="text-gray-500 text-sm text-center">
              {card.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}