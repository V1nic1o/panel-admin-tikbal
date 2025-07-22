import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import {
  HiArrowLeft,
  HiPlusCircle,
  HiPencil,
  HiTrash,
} from 'react-icons/hi';
import ModalCrearTarea from '../../../components/Admin/Jardines/ModalCrearTarea/ModalCrearTarea';

export default function DetalleSeccion() {
  const { id, seccionId } = useParams();
  const navigate = useNavigate();
  const [seccion, setSeccion] = useState(null);
  const [tareas, setTareas] = useState([]);
  const [modalAbierto, setModalAbierto] = useState(false);

  useEffect(() => {
    // ✅ Mock de secciones
    const mockSecciones = [
      {
        id: 'sec-1',
        nombre: 'Entrada Principal',
        descripcion: 'Zona de bienvenida con césped y arbustos.',
      },
      {
        id: 'sec-2',
        nombre: 'Zona de juegos',
        descripcion: 'Espacio con juegos para niños.',
      },
    ];

    // ✅ Mock de tareas (simulación visual)
    const mockTareas = [
      {
        id: 't1',
        nombre: 'Cortar césped',
        descripcion: 'Mantener el área verde en buen estado.',
        imagenes: [
          'https://source.unsplash.com/400x300/?grass,cutting',
        ],
      },
      {
        id: 't2',
        nombre: 'Pintar bancas',
        descripcion: 'Renovar el color de las bancas para mayor atractivo.',
        imagenes: [
          'https://source.unsplash.com/400x300/?bench,paint',
        ],
      },
      {
        id: 't3',
        nombre: 'Colocar señalización',
        descripcion: 'Añadir señales direccionales para los visitantes.',
        imagenes: [
          'https://source.unsplash.com/400x300/?sign,garden',
        ],
      },
    ];

    const encontrada = mockSecciones.find((s) => s.id === seccionId);
    if (encontrada) {
      setSeccion(encontrada);
      setTareas(mockTareas); // ✅ Cargamos las tareas mock
    } else {
      navigate(`/jardines/ver/${id}`);
    }
  }, [id, seccionId, navigate]);

  const agregarTarea = (nuevaTarea) => {
    setTareas((prev) => [...prev, nuevaTarea]);
    setModalAbierto(false);
  };

  const irADetalleTarea = (tareaId) => {
    navigate(`/jardines/ver/${id}/${seccionId}/tarea/${tareaId}`);
  };

  if (!seccion) return null;

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
      </div>

      {/* Título y botón crear */}
      <div className="flex items-center justify-between mb-4 gap-4">
        <h1 className="text-xl font-bold text-gray-800">
          {seccion.nombre}
        </h1>
        <button
          onClick={() => setModalAbierto(true)}
          className="bg-green-600 hover:bg-green-700 text-white font-medium px-4 py-2 rounded-lg text-sm flex items-center gap-2 shadow"
        >
          <HiPlusCircle className="text-lg" />
          Crear tarea
        </button>
      </div>

      {/* Descripción */}
      <p className="text-gray-600 text-sm mb-6">{seccion.descripcion}</p>

      {/* Tareas */}
      {tareas.length > 0 && (
        <div className="mt-6 space-y-4">
          <h2 className="text-lg font-semibold text-gray-800">
            Tareas en esta sección
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {tareas.map((tarea, idx) => (
              <div
                key={idx}
                onClick={() => irADetalleTarea(tarea.id)}
                className="border rounded-lg shadow p-4 bg-white relative cursor-pointer hover:ring-2 hover:ring-green-500 transition"
              >
                {tarea.imagenes?.length > 0 && (
                  <img
                    src={tarea.imagenes[0]}
                    alt={`Tarea ${idx + 1}`}
                    className="w-full h-40 object-cover rounded mb-3"
                  />
                )}
                <h3 className="font-bold text-gray-700 mb-1">
                  {tarea.nombre}
                </h3>
                <p className="text-sm text-gray-600 mb-2">
                  {tarea.descripcion}
                </p>
                <div className="flex justify-end gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      // Lógica de edición si la implementas
                    }}
                    className="text-blue-600 hover:text-blue-800 text-sm"
                  >
                    <HiPencil className="inline-block mr-1" />
                    Editar
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      // Lógica de eliminación si la implementas
                    }}
                    className="text-red-600 hover:text-red-800 text-sm"
                  >
                    <HiTrash className="inline-block mr-1" />
                    Eliminar
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Modal crear tarea */}
      <ModalCrearTarea
        isOpen={modalAbierto}
        onClose={() => setModalAbierto(false)}
        onGuardar={agregarTarea}
      />
    </div>
  );
}