// src/components/SeccionCard.jsx
import { useNavigate } from 'react-router-dom';

export default function SeccionCard({ icon: Icon, title, route, description }) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(route)}
      className="cursor-pointer bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl border border-gray-200 hover:border-blue-500 transition-all duration-300 group"
    >
      <div className="flex items-center justify-center mb-4">
        <Icon className="text-4xl text-blue-800 group-hover:scale-110 transition-transform" />
      </div>
      <h3 className="text-xl font-bold text-center text-gray-800 group-hover:text-blue-800 mb-2">
        {title}
      </h3>
      <p className="text-gray-500 text-sm text-center">{description}</p>
    </div>
  );
}