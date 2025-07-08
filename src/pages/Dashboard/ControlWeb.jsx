import { useNavigate } from 'react-router-dom';
import { FaTools, FaFolderOpen, FaEnvelopeOpenText } from 'react-icons/fa';

export default function ControlWeb() {
  const navigate = useNavigate();

  const cards = [
    {
      title: 'Servicios',
      description: 'Gestionar los servicios que se muestran en la web',
      icon: <FaTools className="text-4xl text-green-700" />,
      route: '/servicios',
    },
    {
      title: 'Proyectos',
      description: 'Subir y ordenar proyectos del portafolio',
      icon: <FaFolderOpen className="text-4xl text-indigo-700" />,
      route: '/proyectos',
    },
    {
      title: 'Mensajes',
      description: 'Leer los mensajes enviados por los visitantes',
      icon: <FaEnvelopeOpenText className="text-4xl text-red-700" />,
      route: '/mensajes',
    },
  ];

  return (
    <div className="min-h-screen px-6 py-12 bg-gradient-to-br from-[#f4f4f4] to-[#dbccc1]">
      <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-10">
        Secciones de Página Web
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {cards.map((card, i) => (
          <div
            key={i}
            onClick={() => navigate(card.route)}
            className="cursor-pointer bg-white rounded-2xl p-6 shadow-xl hover:shadow-2xl border border-gray-200 hover:border-blue-500 transition-all duration-300 group"
          >
            <div className="flex items-center justify-center mb-4">
              {card.icon}
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