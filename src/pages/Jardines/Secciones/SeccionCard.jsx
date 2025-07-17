import { HiOutlinePhotograph } from 'react-icons/hi';

export default function SeccionCard({ seccion }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow hover:shadow-md transition-all p-4 cursor-pointer">
      {/* Imagen */}
      <div className="w-full h-40 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden mb-3">
        {seccion.imagen ? (
          <img
            src={seccion.imagen}
            alt="Imagen sección"
            className="w-full h-full object-cover"
          />
        ) : (
          <HiOutlinePhotograph className="text-4xl text-gray-400" />
        )}
      </div>

      {/* Nombre */}
      <h3 className="text-md font-semibold text-gray-800 mb-1 truncate">
        {seccion.nombre || 'Nombre de la sección'}
      </h3>

      {/* Descripción */}
      <p className="text-sm text-gray-500 line-clamp-3">
        {seccion.descripcion || 'Descripción breve de esta sección del jardín.'}
      </p>
    </div>
  );
}