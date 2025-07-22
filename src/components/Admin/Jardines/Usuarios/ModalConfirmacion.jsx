// src/components/Admin/Jardines/Usuarios/ModalConfirmacion.jsx
import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';
import { HiTrash, HiBan, HiX } from 'react-icons/hi';
import api from '../../../../services/api';

export default function ModalConfirmacion({ isOpen, onClose, tipo, usuario, onConfirmado }) {
  const [isLoading, setIsLoading] = useState(false);

  const obtenerMensaje = () => {
    if (!usuario) return '';
    if (tipo === 'eliminar') {
      return `¿Estás seguro de que deseas eliminar a "${usuario.nombre}"? Esta acción no se puede deshacer.`;
    }
    if (tipo === 'deshabilitar') {
      return `¿Deseas deshabilitar a "${usuario.nombre}" temporalmente? Podrás volver a activarlo más adelante.`;
    }
    if (tipo === 'activar') {
      return `¿Deseas volver a activar a "${usuario.nombre}"?`;
    }
    return '';
  };

  const handleConfirmar = async () => {
    if (!usuario) return;
    setIsLoading(true);

    try {
      if (tipo === 'eliminar') {
        await api.delete(`/usuarios/${usuario.id}`);
      }

      if (tipo === 'deshabilitar' || tipo === 'activar') {
        await api.patch(`/usuarios/estado/${usuario.id}`);
      }

      onConfirmado?.(); // 🔄 Notificar al componente padre si desea recargar
    } catch (error) {
      alert('Error al ejecutar la acción');
    } finally {
      setIsLoading(false);
      onClose();
    }
  };

  const iconoAccion = tipo === 'eliminar' ? (
    <div className="flex justify-center">
      <HiTrash className="text-red-500 text-5xl mb-4" />
    </div>
  ) : (
    <div className="flex justify-center">
      <HiBan
        className={`text-5xl mb-4 ${
          tipo === 'activar' ? 'text-green-500' : 'text-yellow-500'
        }`}
      />
    </div>
  );

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        {/* Fondo difuminado */}
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-200"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-150"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Dialog.Panel className="w-full max-w-md bg-white rounded-2xl shadow-xl p-6 relative text-center">
              {/* Cerrar */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
              >
                <HiX className="text-xl" />
              </button>

              {/* Ícono */}
              {iconoAccion}

              {/* Texto */}
              <Dialog.Title className="text-xl font-bold text-gray-800 mb-2">
                ¿Estás seguro?
              </Dialog.Title>
              <p className="text-gray-600 text-sm mb-6">{obtenerMensaje()}</p>

              {/* Botones */}
              <div className="flex justify-center gap-4">
                <button
                  onClick={onClose}
                  disabled={isLoading}
                  className="text-gray-700 hover:underline font-medium"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleConfirmar}
                  disabled={isLoading}
                  className={`px-5 py-2 rounded-md text-white font-semibold shadow ${
                    tipo === 'eliminar'
                      ? 'bg-red-600 hover:bg-red-700'
                      : tipo === 'activar'
                      ? 'bg-green-600 hover:bg-green-700'
                      : 'bg-yellow-500 hover:bg-yellow-600'
                  }`}
                >
                  {isLoading ? 'Procesando...' : 'Confirmar'}
                </button>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}