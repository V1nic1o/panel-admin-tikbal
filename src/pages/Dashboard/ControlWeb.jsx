// src/pages/ControlWeb.jsx
import { useNavigate } from 'react-router-dom';
import { FaTools, FaFolderOpen, FaEnvelopeOpenText } from 'react-icons/fa';

export default function ControlWeb() {
  const navigate = useNavigate();

  const cards = [
    {
      title: 'Servicios',
      description: 'Gestionar los servicios que se muestran en la web',
      icon: <FaTools className="text-3xl text-white" />,
      bg: 'bg-green-700',
      route: '/servicios',
    },
    {
      title: 'Proyectos',
      description: 'Subir y ordenar proyectos del portafolio',
      icon: <FaFolderOpen className="text-3xl text-white" />,
      bg: 'bg-indigo-700',
      route: '/proyectos',
    },
    {
      title: 'Mensajes',
      description: 'Leer los mensajes enviados por los visitantes',
      icon: <FaEnvelopeOpenText className="text-3xl text-white" />,
      bg: 'bg-red-600',
      route: '/mensajes',
    },
  ];

  return (
    <div className="min-h-screen px-6 py-12 bg-gradient-to-br from-[#003366] to-[#0077b6] flex flex-col items-center justify-center text-white">
      <h1 className="text-4xl font-bold mb-12 text-center drop-shadow-lg">
        Secciones de Página Web
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl">
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