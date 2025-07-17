import { useNavigate } from 'react-router-dom';
import Lottie from 'lottie-react';

import controlWebAnim from '../../assets/animations/control web.json';
import cotizacionesAnim from '../../assets/animations/cotizaciones.json';
import jardinesAnim from '../../assets/animations/jardines.json'; // ✅ animación representativa del módulo de jardines

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
    {
      title: 'Administración de Jardines',
      description: 'Gestionar usuarios, jardines, secciones y tareas',
      animation: jardinesAnim,
      route: '/jardines',
    },
  ];

  return (
    <div className="w-full px-4 pt-4 md:pt-8">
      {/* 🟦 Contenedor tipo banner superior */}
      <div className="w-full rounded-2xl bg-white border border-gray-200 shadow-sm py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-10 text-center">
            Panel de Administración
          </h1>

          {/* 🟩 Tarjetas */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
            {cards.map((card, i) => (
              <div
                key={i}
                onClick={() => navigate(card.route)}
                className="cursor-pointer bg-gradient-to-br from-blue-50 via-white to-white rounded-xl p-6 sm:p-8 border border-gray-200 shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group flex flex-col items-center"
              >
                <div className="flex items-center justify-center w-full mb-6">
                  <Lottie
                    animationData={card.animation}
                    loop
                    autoplay
                    className="w-56 h-56 sm:w-64 sm:h-64 md:w-72 md:h-72"
                  />
                </div>
                <h2 className="text-xl font-semibold text-gray-800 group-hover:text-blue-700 mb-2 text-center">
                  {card.title}
                </h2>
                <p className="text-gray-500 text-sm text-center">
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
