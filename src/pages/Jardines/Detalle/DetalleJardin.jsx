import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import {
  HiArrowLeft,
  HiOutlineSparkles,
  HiPlusCircle,
  HiPencil,
  HiTrash,
} from 'react-icons/hi';
import ModalCrearSeccion from '../../../components/Admin/Jardines/ModalCrearSeccion/ModalCrearSeccion';

export default function DetalleJardin() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [jardin, setJardin] = useState(null);
  const [abrirModalSeccion, setAbrirModalSeccion] = useState(false);
  const [secciones, setSecciones] = useState([]);
  const [seccionEditando, setSeccionEditando] = useState(null);

  useEffect(() => {
    const mockJardines = [
      {
        id: '1',
        nombre: 'Jardín Central',
        descripcion: 'Área principal con senderos y flores.',
        imagen: 'https://source.unsplash.com/800x400/?garden,1',
        cliente: 'Municipalidad de Antigua',
        nit: '1234567',
        direccion: 'Zona 1, Ciudad de Guatemala',
        correo: 'cliente@correo.com',
        telefono: '55555555',
      },
      {
        id: '2',
        nombre: 'Jardín de Rosas',
        descripcion: 'Especializado en diferentes tipos de rosas.',
        imagen: 'https://source.unsplash.com/800x400/?garden,2',
        cliente: 'Municipalidad de Mixco',
        nit: '7654321',
        direccion: 'Zona 2, Ciudad de Guatemala',
        correo: 'mixco@correo.com',
        telefono: '44444444',
      },
    ];

    const encontrado = mockJardines.find((j) => j.id === id);
    if (encontrado) setJardin(encontrado);
    else navigate('/jardines/ver');

    const seccionesMock = [
      {
        id: 'sec-1',
        nombre: 'Entrada Principal',
        descripcion: 'Zona de bienvenida con césped y arbustos.',
        imagenes: ['https://source.unsplash.com/400x300/?garden,path'],
      },
      {
        id: 'sec-2',
        nombre: 'Área de juegos',
        descripcion: 'Espacio con juegos para niños y bancos.',
        imagenes: ['https://source.unsplash.com/400x300/?garden,playground'],
      },
      {
        id: 'sec-3',
        nombre: 'Zona de meditación',
        descripcion: 'Jardín tranquilo con piedras y fuentes de agua.',
        imagenes: ['https://source.unsplash.com/400x300/?garden,zen'],
      },
    ];

    setSecciones(seccionesMock);
  }, [id, navigate]);

  const agregarSeccion = (nuevaSeccion) => {
    if (seccionEditando !== null) {
      setSecciones((prev) =>
        prev.map((sec, i) => (i === seccionEditando ? nuevaSeccion : sec))
      );
      setSeccionEditando(null);
    } else {
      setSecciones((prev) => [...prev, nuevaSeccion]);
    }
    setAbrirModalSeccion(false);
  };

  const editarSeccion = (index) => {
    setSeccionEditando(index);
    setAbrirModalSeccion(true);
  };

  const eliminarSeccion = (index) => {
    if (window.confirm('¿Estás seguro que deseas eliminar esta sección?')) {
      setSecciones((prev) => prev.filter((_, i) => i !== index));
    }
  };

  if (!jardin) return null;

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

      {/* Título + botón */}
      <div className="flex items-center justify-between mb-4 gap-4">
        <div className="flex items-center gap-3">
          <HiOutlineSparkles className="text-2xl text-green-600" />
          <h1 className="text-xl font-bold text-gray-800">{jardin.nombre}</h1>
        </div>
        <button
          onClick={() => setAbrirModalSeccion(true)}
          className="bg-green-600 hover:bg-green-700 text-white font-medium px-4 py-2 rounded-lg text-sm flex items-center gap-2 shadow"
        >
          <HiPlusCircle className="text-lg" />
          Crear sección
        </button>
      </div>

      {/* Imagen */}
      <img
        src={jardin.imagen}
        alt={jardin.nombre}
        className="w-full h-64 object-cover rounded-lg mb-4"
      />

      {/* Descripción */}
      <p className="text-gray-600 text-sm mb-6">{jardin.descripcion}</p>

      {/* Datos del cliente */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm mb-10">
        <div>
          <p className="font-medium text-gray-700">Cliente:</p>
          <p className="text-gray-600">{jardin.cliente}</p>
        </div>
        <div>
          <p className="font-medium text-gray-700">NIT:</p>
          <p className="text-gray-600">{jardin.nit}</p>
        </div>
        <div>
          <p className="font-medium text-gray-700">Dirección:</p>
          <p className="text-gray-600">{jardin.direccion}</p>
        </div>
        <div>
          <p className="font-medium text-gray-700">Correo electrónico:</p>
          <p className="text-gray-600">{jardin.correo}</p>
        </div>
        <div>
          <p className="font-medium text-gray-700">Teléfono:</p>
          <p className="text-gray-600">{jardin.telefono}</p>
        </div>
      </div>

      {/* Visualización de secciones */}
      {secciones.length > 0 && (
        <div className="mt-8 space-y-4">
          <h2 className="text-lg font-semibold text-gray-800">Secciones del jardín</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {secciones.map((sec, idx) => (
              <div
                key={idx}
                className="border rounded-lg shadow p-4 bg-white relative cursor-pointer hover:ring-2 hover:ring-green-500 transition"
                onClick={() => navigate(`/jardines/ver/${id}/${sec.id}`)}
              >
                {sec.imagenes?.length > 0 && (
                  <img
                    src={sec.imagenes[0]}
                    alt={`Sección ${idx + 1}`}
                    className="w-full h-40 object-cover rounded mb-3"
                  />
                )}
                <h3 className="font-bold text-gray-700 mb-1">{sec.nombre}</h3>
                <p className="text-sm text-gray-600 mb-2">{sec.descripcion}</p>
                <div className="flex justify-end gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      editarSeccion(idx);
                    }}
                    className="text-blue-600 hover:text-blue-800 text-sm"
                  >
                    <HiPencil className="inline-block mr-1" /> Editar
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      eliminarSeccion(idx);
                    }}
                    className="text-red-600 hover:text-red-800 text-sm"
                  >
                    <HiTrash className="inline-block mr-1" /> Eliminar
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Modal de crear/editar sección */}
      <ModalCrearSeccion
        isOpen={abrirModalSeccion}
        onClose={() => {
          setAbrirModalSeccion(false);
          setSeccionEditando(null);
        }}
        onGuardar={agregarSeccion}
        seccionInicial={seccionEditando !== null ? secciones[seccionEditando] : null}
      />
    </div>
  );
}