import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { HiArrowLeft } from 'react-icons/hi';
import ModalComentario from '../../../components/Admin/Jardines/ModalComentario/ModalComentario';

export default function DetalleTarea() {
  const { id, seccionId, tareaId } = useParams();
  const navigate = useNavigate();
  const [tarea, setTarea] = useState(null);
  const [comentarios, setComentarios] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const tareasMock = [
      {
        id: 't1',
        nombre: 'Cortar césped',
        descripcion: 'Mantener el área verde en buen estado.',
        imagenes: [
          'https://source.unsplash.com/600x400/?grass,cutting',
          'https://source.unsplash.com/600x400/?lawnmower',
        ],
      },
      {
        id: 't2',
        nombre: 'Pintar bancas',
        descripcion: 'Renovar el color de las bancas para mayor atractivo.',
        imagenes: [
          'https://source.unsplash.com/600x400/?bench,paint',
        ],
      },
      {
        id: 't3',
        nombre: 'Colocar señalización',
        descripcion: 'Añadir señales direccionales para los visitantes.',
        imagenes: [
          'https://source.unsplash.com/600x400/?sign,park',
        ],
      },
    ];

    const encontrada = tareasMock.find((t) => t.id === tareaId);
    if (encontrada) {
      setTarea(encontrada);
    } else {
      navigate(`/jardines/ver/${id}/${seccionId}`);
    }
  }, [id, seccionId, tareaId, navigate]);

  const handleGuardarComentario = (nuevoComentario) => {
    setComentarios((prev) => [...prev, nuevoComentario]);
  };

  if (!tarea) return null;

  return (
    <div className="p-6 md:p-10">
      {/* Botón volver */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => navigate(-1)}
          className="text-gray-600 hover:text-gray-800 flex items-center gap-1 text-sm"
        >
          <HiArrowLeft className="text-lg" />
          Volver
        </button>

        <button
          onClick={() => setModalOpen(true)}
          className="bg-green-600 hover:bg-green-700 text-white text-sm px-4 py-2 rounded-md"
        >
          Agregar comentario
        </button>
      </div>

      {/* Título */}
      <h1 className="text-2xl font-bold text-gray-800 mb-2">{tarea.nombre}</h1>
      <p className="text-gray-600 text-sm mb-6">{tarea.descripcion}</p>

      {/* Galería de imágenes */}
      {tarea.imagenes?.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
          {tarea.imagenes.map((img, idx) => (
            <img
              key={idx}
              src={img}
              alt={`Imagen ${idx + 1}`}
              className="w-full h-64 object-cover rounded-lg shadow"
            />
          ))}
        </div>
      )}

      {/* Comentarios */}
      {comentarios.length > 0 && (
        <div className="mt-10">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Comentarios</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {comentarios.map((comentario, idx) => (
              <div
                key={idx}
                className="bg-white p-4 rounded-lg shadow border border-gray-100"
              >
                <h3 className="text-md font-semibold text-gray-800 mb-1">
                  {comentario.titulo}
                </h3>
                <p className="text-sm text-gray-600 mb-2">
                  {comentario.descripcion}
                </p>
                {comentario.imagenes?.length > 0 && (
                  <div className="grid grid-cols-2 gap-2">
                    {comentario.imagenes.map((src, i) => (
                      <img
                        key={i}
                        src={src}
                        alt={`Comentario ${i}`}
                        className="w-full h-28 object-cover rounded"
                      />
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      <ModalComentario
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onGuardar={handleGuardarComentario}
      />
    </div>
  );
}