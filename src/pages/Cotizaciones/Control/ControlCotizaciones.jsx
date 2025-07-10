// src/pages/Cotizaciones/ControlCotizaciones.jsx
import { useNavigate } from 'react-router-dom';
import { FaFileAlt, FaHistory } from 'react-icons/fa';

export default function ControlCotizaciones() {
  const navigate = useNavigate();

  const cards = [
    {
      title: 'Nueva Cotización',
      description: 'Crear una cotización desde cero',
      icon: <FaFileAlt className="text-3xl text-white" />,
      route: '/cotizaciones/crear',
      bg: 'bg-indigo-700',
    },
    {
      title: 'Historial',
      description: 'Ver y administrar cotizaciones previas',
      icon: <FaHistory className="text-3xl text-white" />,
      route: '/cotizaciones/historial',
      bg: 'bg-orange-500',
    },
  ];

  return (
    <div className="min-h-screen px-6 py-12 bg-gradient-to-br from-[#003366] to-[#0077b6] flex flex-col items-center justify-center text-white">
      <h1 className="text-4xl font-bold mb-12 text-center drop-shadow-lg">
        Gestión de Cotizaciones
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
        {cards.map((card, i) => (
          <div
            key={i}
            onClick={() => navigate(card.route)}
            className="cursor-pointer bg-white text-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-transform duration-300 hover:scale-105"
          >
            <div className="flex items-center justify-center mb-4">
              <div className={`w-16 h-16 rounded-full flex items-center justify-center ${card.bg} shadow-md`}>
                {card.icon}
              </div>
            </div>
            <h2 className="text-xl font-semibold text-center mb-2">
              {card.title}
            </h2>
            <p className="text-gray-600 text-sm text-center">
              {card.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}