import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { HiPlusCircle } from 'react-icons/hi';
import CrearJardin from '../../Jardines/Crear/CrearJardin';
import { FaTree } from 'react-icons/fa';

export default function TodosLosJardines() {
  const [abrirModal, setAbrirModal] = useState(false);
  const navigate = useNavigate();

  // 🔧 Mock temporal para mostrar tarjetas
  const jardines = [
    {
      id: 1,
      nombre: 'Jardín Central',
      descripcion: 'Área principal con senderos y flores.',
      imagen: 'https://source.unsplash.com/400x300/?garden,1',
    },
    {
      id: 2,
      nombre: 'Jardín de Rosas',
      descripcion: 'Especializado en diferentes tipos de rosas.',
      imagen: 'https://source.unsplash.com/400x300/?garden,2',
    },
  ];

  const irADetalle = (id) => {
    navigate(`/jardines/ver/${id}`);
  };

  return (
    <div className="p-6 md:p-10 relative">
      {/* Encabezado con botón a la derecha */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <FaTree className="text-3xl text-green-600" />
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Gestión de Jardines</h1>
            <p className="text-gray-500 text-sm">Lista de jardines registrados con opción para crear nuevos.</p>
          </div>
        </div>

        <button
          onClick={() => setAbrirModal(true)}
          className="bg-green-600 hover:bg-green-700 text-white font-medium px-5 py-2 rounded-lg shadow text-sm flex items-center gap-2"
        >
          <HiPlusCircle className="text-xl" />
          Crear nuevo jardín
        </button>
      </div>

      {/* Tarjetas de jardines */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {jardines.map((jardin) => (
          <div
            key={jardin.id}
            onClick={() => irADetalle(jardin.id)}
            className="bg-white rounded-xl border border-gray-200 shadow hover:shadow-lg transition p-4 cursor-pointer"
          >
            <img
              src={jardin.imagen}
              alt={jardin.nombre}
              className="w-full h-40 object-cover rounded-lg mb-4"
            />
            <h2 className="text-lg font-semibold text-gray-800 mb-1">{jardin.nombre}</h2>
            <p className="text-sm text-gray-500">{jardin.descripcion}</p>
          </div>
        ))}
      </div>

      {/* Modal crear jardín */}
      <CrearJardin isOpen={abrirModal} onClose={() => setAbrirModal(false)} />
    </div>
  );
}