import { useState } from 'react';
import DragDropArea from './DragDropArea';
import { HiOutlinePuzzle } from 'react-icons/hi';

export default function CrearSecciones() {
  const [secciones, setSecciones] = useState([
    {
      id: '1',
      nombre: 'Zona de descanso',
      descripcion: 'Área con bancas y sombra natural',
      imagen: null,
    },
    {
      id: '2',
      nombre: 'Huerto educativo',
      descripcion: 'Espacio para cultivo escolar',
      imagen: null,
    },
  ]);

  return (
    <div className="p-6 md:p-10 max-w-5xl mx-auto">
      {/* 🔰 Encabezado */}
      <div className="mb-8 flex items-center gap-3">
        <HiOutlinePuzzle className="text-3xl text-indigo-500" />
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Crear Secciones</h1>
          <p className="text-gray-500 text-sm">Organiza las secciones del jardín visualmente.</p>
        </div>
      </div>

      {/* 🧩 Zona drag-and-drop */}
      <DragDropArea secciones={secciones} setSecciones={setSecciones} />
    </div>
  );
}