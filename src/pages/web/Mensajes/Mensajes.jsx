// src/pages/Mensajes/Mensajes.jsx
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTrash, FaEye, FaTimes } from 'react-icons/fa';
import api from '../../../services/api';

export default function Mensajes() {
  const [mensajes, setMensajes] = useState([]);
  const [modalMensaje, setModalMensaje] = useState(null);

  // 🔄 Obtener mensajes reales
  useEffect(() => {
    const fetchMensajes = async () => {
      try {
        const res = await api.get('/mensajes');
        setMensajes(res.data);
      } catch (err) {
        console.error('Error al cargar mensajes:', err);
      }
    };
    fetchMensajes();
  }, []);

  // 🗑️ Eliminar
  const eliminarMensaje = async (mensaje) => {
    if (!window.confirm('¿Deseas eliminar este mensaje?')) return;

    try {
      await api.delete(`/mensajes/${mensaje.id}`);
      setMensajes(mensajes.filter((m) => m.id !== mensaje.id));
    } catch (err) {
      console.error('Error al eliminar:', err);
    }
  };

  const abrirModal = (mensaje) => setModalMensaje(mensaje);
  const cerrarModal = () => setModalMensaje(null);

  return (
    <div className="relative">
      <h2 className="text-2xl font-bold text-primary mb-6">Mensajes Recibidos</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {mensajes.map((msg, idx) => (
          <motion.div
            key={msg.id}
            className="bg-white rounded-lg shadow p-4 border border-gray-100 hover:shadow-md relative"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg font-semibold text-secondary">{msg.nombre}</h3>
            <p className="text-sm text-gray-500">{msg.correo}</p>
            <p className="mt-2 text-gray-700 text-sm line-clamp-2">{msg.mensaje}</p>
            <div className="flex justify-end gap-3 mt-4">
              <button
                onClick={() => abrirModal(msg)}
                className="text-blue-600 hover:underline text-sm"
              >
                <FaEye className="inline mr-1" /> Ver
              </button>
              <button
                onClick={() => eliminarMensaje(msg)}
                className="text-red-600 hover:underline text-sm"
              >
                <FaTrash className="inline mr-1" /> Eliminar
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* MODAL de Vista */}
      <AnimatePresence>
        {modalMensaje && (
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
              <h3 className="text-xl font-semibold text-primary mb-4">Mensaje de {modalMensaje.nombre}</h3>
              <p className="text-sm text-gray-600 mb-1"><strong>Correo:</strong> {modalMensaje.correo}</p>
              <p className="text-sm text-gray-700 whitespace-pre-wrap">
                <strong>Mensaje:</strong><br /> {modalMensaje.mensaje}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}