import { useNavigate } from 'react-router-dom';
import Lottie from 'lottie-react';

import controlWebAnim from '../../assets/animations/control web.json';
import cotizacionesAnim from '../../assets/animations/cotizaciones.json';

export default function Dashboard() {
  const navigate = useNavigate();

  const cards = [
    {
      title: 'Control de Página Web',
      description: 'Editar contenido visual de la web pública',
      animation: controlWebAnim,
      route: '/control-web',
    },
    {
      title: 'Gestión de Cotizaciones',
      description: 'Crear, editar y administrar cotizaciones',
      animation: cotizacionesAnim,
      route: '/cotizaciones',
    },
  ];

  return (
    <div className="min-h-screen px-6 py-12 bg-gradient-to-br from-[#f4f4f4] to-[#dbccc1]">
      <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-10">
        Panel de Administración
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {cards.map((card, i) => (
          <div
            key={i}
            onClick={() => navigate(card.route)}
            className="cursor-pointer bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl border border-gray-200 hover:border-blue-500 transition-all duration-300 group flex flex-col items-center"
          >
            <div className="flex items-center justify-center w-full mb-6">
              <Lottie
                animationData={card.animation}
                loop
                className="w-48 h-48 sm:w-56 sm:h-56 md:w-60 md:h-60"
              />
            </div>
            <h2 className="text-xl font-semibold text-gray-800 group-hover:text-blue-800 mb-2 text-center">
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