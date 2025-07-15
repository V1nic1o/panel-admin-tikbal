import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPlus, FaTimes, FaTrash, FaEdit, FaLeaf } from 'react-icons/fa';
import api from '../../services/api';

export default function Servicios() {
  const [modalAbierto, setModalAbierto] = useState(false);
  const [modoEdicion, setModoEdicion] = useState(false);
  const [servicioEditando, setServicioEditando] = useState(null);
  const [servicios, setServicios] = useState([]);
  const [nuevoServicio, setNuevoServicio] = useState({
    nombre: '',
    descripcion: '',
    imagenes: [],
    imagenesActuales: []
  });

  useEffect(() => {
    api.get('/servicios').then((res) => setServicios(res.data));
  }, []);

  const abrirModal = (servicio = null) => {
    if (servicio) {
      setModoEdicion(true);
      setServicioEditando(servicio);
      setNuevoServicio({
        ...servicio,
        imagenes: [],
        imagenesActuales: servicio.imagenes || []
      });
    } else {
      setModoEdicion(false);
      setNuevoServicio({ nombre: '', descripcion: '', imagenes: [], imagenesActuales: [] });
    }
    setModalAbierto(true);
  };

  const cerrarModal = () => {
    setModalAbierto(false);
    setServicioEditando(null);
    setModoEdicion(false);
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'imagenes') {
      setNuevoServicio((prev) => ({
        ...prev,
        imagenes: [...prev.imagenes, ...Array.from(files)]
      }));
    } else {
      setNuevoServicio((prev) => ({ ...prev, [name]: value }));
    }
  };

  const eliminarImagenActual = (index) => {
    setNuevoServicio((prev) => ({
      ...prev,
      imagenesActuales: prev.imagenesActuales.filter((_, i) => i !== index)
    }));
  };

  const eliminarImagenNueva = (index) => {
    setNuevoServicio((prev) => ({
      ...prev,
      imagenes: prev.imagenes.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('nombre', nuevoServicio.nombre);
    formData.append('descripcion', nuevoServicio.descripcion);
    nuevoServicio.imagenes.forEach((file) => formData.append('imagenes', file));
    formData.append('imagenesActuales', JSON.stringify(nuevoServicio.imagenesActuales));

    try {
      if (modoEdicion && servicioEditando) {
        await api.put(`/servicios/${servicioEditando.id}`, formData);
      } else {
        await api.post('/servicios', formData);
      }
      const res = await api.get('/servicios');
      setServicios(res.data);
      cerrarModal();
    } catch (err) {
      console.error('Error al guardar servicio', err);
    }
  };

  const eliminarServicio = async (servicio) => {
    try {
      await api.delete(`/servicios/${servicio.id}`);
      setServicios(servicios.filter((s) => s.id !== servicio.id));
    } catch (err) {
      console.error('Error al eliminar', err);
    }
  };

  return (
    <div className="relative w-full">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
          <FaLeaf className="text-green-600" /> Gestión de Servicios
        </h2>
        <button
          onClick={() => abrirModal()}
          className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          <FaPlus className="mr-2" /> Nuevo Servicio
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {servicios.map((serv) => (
          <motion.div
            key={serv.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-5 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition"
          >
            <h3 className="text-lg font-semibold text-blue-800 mb-1">{serv.nombre}</h3>
            <p className="text-gray-600 text-sm mb-3">{serv.descripcion}</p>
            {serv.imagenes?.length > 0 && (
              <div className="flex gap-2 flex-wrap mb-3">
                {serv.imagenes.map((url, i) => (
                  <img
                    key={i}
                    src={url}
                    alt="servicio"
                    className="w-16 h-16 object-cover rounded-md border"
                  />
                ))}
              </div>
            )}
            <div className="flex justify-end gap-3">
              <button
                onClick={() => abrirModal(serv)}
                className="text-blue-600 hover:underline text-sm flex items-center gap-1"
              >
                <FaEdit /> Editar
              </button>
              <button
                onClick={() => eliminarServicio(serv)}
                className="text-red-600 hover:underline text-sm flex items-center gap-1"
              >
                <FaTrash /> Eliminar
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {modalAbierto && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-xl shadow-xl p-6 w-full max-w-lg relative"
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
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                {modoEdicion ? 'Editar Servicio' : 'Nuevo Servicio'}
              </h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  name="nombre"
                  value={nuevoServicio.nombre}
                  onChange={handleChange}
                  placeholder="Nombre del servicio"
                  required
                  className="w-full border border-gray-300 rounded-md p-3"
                />
                <textarea
                  name="descripcion"
                  value={nuevoServicio.descripcion}
                  onChange={handleChange}
                  placeholder="Descripción"
                  rows="4"
                  required
                  className="w-full border border-gray-300 rounded-md p-3"
                ></textarea>

                {nuevoServicio.imagenesActuales?.length > 0 && (
                  <div className="flex gap-2 flex-wrap">
                    {nuevoServicio.imagenesActuales.map((img, i) => (
                      <div key={i} className="relative">
                        <img src={img} className="w-16 h-16 rounded object-cover border" />
                        <button
                          type="button"
                          onClick={() => eliminarImagenActual(i)}
                          className="absolute top-0 right-0 bg-red-600 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center"
                        >×</button>
                      </div>
                    ))}
                  </div>
                )}

                {nuevoServicio.imagenes.length > 0 && (
                  <div className="flex gap-2 flex-wrap">
                    {nuevoServicio.imagenes.map((file, i) => (
                      <div key={i} className="relative">
                        <img
                          src={URL.createObjectURL(file)}
                          className="w-16 h-16 rounded object-cover border"
                        />
                        <button
                          type="button"
                          onClick={() => eliminarImagenNueva(i)}
                          className="absolute top-0 right-0 bg-red-600 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center"
                        >×</button>
                      </div>
                    ))}
                  </div>
                )}

                <input
                  type="file"
                  name="imagenes"
                  onChange={handleChange}
                  multiple
                  className="w-full border border-gray-300 rounded-md p-3"
                />
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
                >
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