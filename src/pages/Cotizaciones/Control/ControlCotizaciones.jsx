import { useNavigate } from 'react-router-dom';
import { FaFileAlt, FaHistory } from 'react-icons/fa';

export default function ControlCotizaciones() {
  const navigate = useNavigate();

  const cards = [
    {
      title: 'Nueva Cotización',
      description: 'Crear una cotización desde cero',
      icon: <FaFileAlt className="text-2xl text-indigo-600" />,
      route: '/cotizaciones/crear',
      bg: 'bg-indigo-100',
    },
    {
      title: 'Historial',
      description: 'Ver y administrar cotizaciones previas',
      icon: <FaHistory className="text-2xl text-orange-600" />,
      route: '/cotizaciones/historial',
      bg: 'bg-orange-100',
    },
  ];

  return (
    <div className="w-full px-4 pt-4 md:pt-8">
      <div className="w-full rounded-2xl bg-white border border-gray-200 shadow-sm py-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-10 text-center">
            Gestión de Cotizaciones
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {cards.map((card, i) => (
              <div
                key={i}
                onClick={() => navigate(card.route)}
                className="cursor-pointer bg-gradient-to-br from-white to-gray-50 border border-gray-200 rounded-xl p-6 shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group"
              >
                <div className="flex items-center justify-center mb-4">
                  <div className={`w-14 h-14 rounded-full flex items-center justify-center ${card.bg}`}>
                    {card.icon}
                  </div>
                </div>
                <h2 className="text-xl font-semibold text-center mb-2 group-hover:text-blue-700">
                  {card.title}
                </h2>
                <p className="text-gray-600 text-sm text-center">
                  {card.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}