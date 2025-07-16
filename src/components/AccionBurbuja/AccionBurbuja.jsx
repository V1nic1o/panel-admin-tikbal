import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function AccionBurbuja({
  onConfirm,
  icon: Icono,
  color,
  title,
  descripcion,
  disabled = false
}) {
  const [showModal, setShowModal] = useState(false);

  const handleConfirmar = () => {
    setShowModal(false);
    onConfirm();
  };

  // Mapa de colores visuales del modal según la acción
  const colorMap = {
    'bg-blue-500': 'text-blue-500',
    'bg-green-500': 'text-green-500',
    'bg-yellow-500': 'text-yellow-500',
    'bg-red-600': 'text-red-600',
    'bg-gray-300': 'text-gray-500',
  };

  const iconColorClass = Object.entries(colorMap).find(([key]) =>
    color.includes(key)
  )?.[1] || 'text-gray-500';

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        title={title}
        disabled={disabled}
        className={`
          p-3 rounded-full text-white shadow 
          hover:scale-110 transition-transform duration-200 
          disabled:opacity-50 disabled:cursor-not-allowed 
          ${color}
        `}
      >
        <Icono size={16} />
      </button>

      <AnimatePresence>
        {showModal && (
          <motion.div
            className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-xl shadow-xl px-6 py-8 w-full max-w-sm mx-4 flex flex-col items-center text-center"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              {/* Ícono superior */}
              <div className={`mb-4 ${iconColorClass}`}>
                <Icono size={48} />
              </div>

              {/* Título y descripción */}
              <h3 className="text-xl font-semibold mb-2">¿Estás seguro?</h3>
              <p className="text-sm text-gray-600 mb-6">
                {descripcion || '¿Deseas continuar con esta acción?'}
              </p>

              {/* Botones */}
              <div className="flex gap-4">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 text-gray-700 hover:text-gray-900"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleConfirmar}
                  className={`px-4 py-2 text-white rounded ${
                    iconColorClass.replace('text-', 'bg-')
                  } hover:brightness-110`}
                >
                  Confirmar
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}