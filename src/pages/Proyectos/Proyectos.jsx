import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPlus, FaTimes, FaTrash, FaEdit, FaProjectDiagram } from 'react-icons/fa';
import api from '../../services/api';
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

function SortableImage({ id, url, onDelete }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners} className="relative">
      <img src={url} className="w-16 h-16 rounded object-cover" />
      <button
        type="button"
        onClick={onDelete}
        className="absolute top-0 right-0 bg-red-600 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center"
      >
        ×
      </button>
    </div>
  );
}

export default function Proyectos() {
  const [modalAbierto, setModalAbierto] = useState(false);
  const [modoEdicion, setModoEdicion] = useState(false);
  const [proyectoEditando, setProyectoEditando] = useState(null);
  const [proyectos, setProyectos] = useState([]);
  const [nuevoProyecto, setNuevoProyecto] = useState({
    nombre: '',
    ubicacion: '',
    cliente: '',
    descripcion: '',
    imagenes: [],
    imagenesActuales: []
  });

  useEffect(() => {
    api.get('/proyectos').then((res) => setProyectos(res.data));
  }, []);

  const abrirModal = (proyecto = null) => {
    if (proyecto) {
      setModoEdicion(true);
      setProyectoEditando(proyecto);
      setNuevoProyecto({ ...proyecto, imagenes: [], imagenesActuales: proyecto.imagenes || [] });
    } else {
      setModoEdicion(false);
      setNuevoProyecto({ nombre: '', ubicacion: '', cliente: '', descripcion: '', imagenes: [], imagenesActuales: [] });
    }
    setModalAbierto(true);
  };

  const cerrarModal = () => {
    setModalAbierto(false);
    setModoEdicion(false);
    setProyectoEditando(null);
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'imagenes') {
      setNuevoProyecto((prev) => ({ ...prev, imagenes: [...prev.imagenes, ...Array.from(files)] }));
    } else {
      setNuevoProyecto((prev) => ({ ...prev, [name]: value }));
    }
  };

  const eliminarImagenActual = (index) => {
    setNuevoProyecto((prev) => ({
      ...prev,
      imagenesActuales: prev.imagenesActuales.filter((_, i) => i !== index)
    }));
  };

  const eliminarImagenNueva = (index) => {
    setNuevoProyecto((prev) => ({
      ...prev,
      imagenes: prev.imagenes.filter((_, i) => i !== index)
    }));
  };

  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      setNuevoProyecto((prev) => {
        const oldIndex = prev.imagenesActuales.findIndex((img) => img === active.id);
        const newIndex = prev.imagenesActuales.findIndex((img) => img === over.id);
        const nuevos = arrayMove(prev.imagenesActuales, oldIndex, newIndex);
        return { ...prev, imagenesActuales: nuevos };
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('nombre', nuevoProyecto.nombre);
    formData.append('ubicacion', nuevoProyecto.ubicacion);
    formData.append('cliente', nuevoProyecto.cliente);
    formData.append('descripcion', nuevoProyecto.descripcion);
    nuevoProyecto.imagenes.forEach((file) => formData.append('imagenes', file));
    formData.append('imagenesActuales', JSON.stringify(nuevoProyecto.imagenesActuales));

    try {
      if (modoEdicion && proyectoEditando) {
        await api.put(`/proyectos/${proyectoEditando.id}`, formData);
      } else {
        await api.post('/proyectos', formData);
      }

      const res = await api.get('/proyectos');
      setProyectos(res.data);
      cerrarModal();
    } catch (err) {
      console.error('Error al guardar proyecto:', err);
    }
  };

  const eliminarProyecto = async (proyecto) => {
    try {
      await api.delete(`/proyectos/${proyecto.id}`);
      setProyectos(proyectos.filter((p) => p.id !== proyecto.id));
    } catch (err) {
      console.error('Error al eliminar proyecto:', err);
    }
  };

  return (
    <div className="relative">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-primary flex items-center gap-2">
          <FaProjectDiagram /> Gestión de Proyectos
        </h2>
        <button
          onClick={() => abrirModal()}
          className="flex items-center bg-primary text-white px-4 py-2 rounded-md hover:opacity-90"
        >
          <FaPlus className="mr-2" /> Nuevo Proyecto
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {proyectos.map((proy) => (
          <motion.div
            key={proy.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-4 shadow rounded-md border border-gray-100 hover:shadow-md"
          >
            <h3 className="text-lg font-semibold text-secondary mb-1">{proy.nombre}</h3>
            <p className="text-sm text-gray-500">{proy.ubicacion}</p>
            <p className="text-sm text-gray-600 italic">Cliente: {proy.cliente}</p>
            <p className="text-sm text-gray-700 mt-1">{proy.descripcion}</p>

            {proy.imagenes?.length > 0 && (
              <div className="flex gap-2 flex-wrap mt-2">
                {proy.imagenes.map((url, i) => (
                  <img key={i} src={url} alt="proyecto" className="w-16 h-16 object-cover rounded" />
                ))}
              </div>
            )}

            <div className="flex justify-end gap-2 mt-3">
              <button
                onClick={() => abrirModal(proy)}
                className="text-blue-600 hover:underline text-sm flex items-center gap-1"
              >
                <FaEdit /> Editar
              </button>
              <button
                onClick={() => eliminarProyecto(proy)}
                className="text-red-600 hover:underline text-sm flex items-center gap-1"
              >
                <FaTrash /> Eliminar
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* MODAL */}
      <AnimatePresence>
        {modalAbierto && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative"
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -50, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <button
                className="absolute top-3 right-3 text-gray-500 hover:text-red-500"
                onClick={cerrarModal}
              >
                <FaTimes />
              </button>
              <h3 className="text-xl font-semibold text-primary mb-4">
                {modoEdicion ? 'Editar Proyecto' : 'Nuevo Proyecto'}
              </h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <input type="text" name="nombre" value={nuevoProyecto.nombre} onChange={handleChange} placeholder="Nombre del proyecto" required className="w-full border border-gray-300 rounded-md p-3" />
                <input type="text" name="ubicacion" value={nuevoProyecto.ubicacion} onChange={handleChange} placeholder="Ubicación" className="w-full border border-gray-300 rounded-md p-3" />
                <input type="text" name="cliente" value={nuevoProyecto.cliente} onChange={handleChange} placeholder="Cliente" className="w-full border border-gray-300 rounded-md p-3" />
                <textarea name="descripcion" value={nuevoProyecto.descripcion} onChange={handleChange} placeholder="Descripción del proyecto" rows="4" className="w-full border border-gray-300 rounded-md p-3"></textarea>

                {/* Imágenes actuales con drag-and-drop usando dnd-kit */}
                <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                  <SortableContext items={nuevoProyecto.imagenesActuales} strategy={verticalListSortingStrategy}>
                    <div className="flex gap-2 flex-wrap">
                      {nuevoProyecto.imagenesActuales.map((img, i) => (
                        <SortableImage
                          key={img}
                          id={img}
                          url={img}
                          onDelete={() => eliminarImagenActual(i)}
                        />
                      ))}
                    </div>
                  </SortableContext>
                </DndContext>

                {/* Imágenes nuevas */}
                {nuevoProyecto.imagenes.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {nuevoProyecto.imagenes.map((file, i) => (
                      <div key={i} className="relative">
                        <img src={URL.createObjectURL(file)} className="w-16 h-16 rounded object-cover" />
                        <button type="button" onClick={() => eliminarImagenNueva(i)} className="absolute top-0 right-0 bg-red-600 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">×</button>
                      </div>
                    ))}
                  </div>
                )}

                <input type="file" name="imagenes" onChange={handleChange} multiple className="w-full border border-gray-300 rounded-md p-3" />

                <button type="submit" className="w-full bg-primary text-white py-2 rounded-md font-semibold hover:opacity-90">
                  {modoEdicion ? 'Guardar Cambios' : 'Guardar'}
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}