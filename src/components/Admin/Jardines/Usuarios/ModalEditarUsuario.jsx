import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState, useEffect } from 'react';
import { HiPencilAlt, HiX } from 'react-icons/hi';

export default function ModalEditarUsuario({ isOpen, onClose, usuario }) {
  const [formData, setFormData] = useState({
    nombre: '',
    correo: '',
    telefono: '',
    direccion: '',
    rol: '',
  });

  useEffect(() => {
    if (usuario) {
      setFormData({
        nombre: usuario.nombre || '',
        correo: usuario.correo || '',
        telefono: usuario.telefono || '',
        direccion: usuario.direccion || '',
        rol: usuario.rol || '',
      });
    }
  }, [usuario]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('🟡 Editando usuario:', formData);
    onClose();
  };

  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        {/* Fondo oscuro */}
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

        {/* Modal */}
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
            <Dialog.Panel className="w-full max-w-md rounded-2xl bg-white shadow-xl p-6 relative">
              {/* Botón cerrar */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-red-400 hover:text-red-600 transition"
              >
                <HiX className="text-2xl sm:text-3xl" />
              </button>

              {/* Título */}
              <div className="flex items-center gap-3 mb-4">
                <HiPencilAlt className="text-2xl text-blue-600" />
                <Dialog.Title className="text-lg font-semibold text-gray-800">
                  Editar Usuario
                </Dialog.Title>
              </div>

              {/* Formulario */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nombre completo
                  </label>
                  <input
                    type="text"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Correo electrónico
                  </label>
                  <input
                    type="email"
                    name="correo"
                    value={formData.correo}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Teléfono
                  </label>
                  <input
                    type="tel"
                    name="telefono"
                    value={formData.telefono}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Dirección
                  </label>
                  <input
                    type="text"
                    name="direccion"
                    value={formData.direccion}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Rol del usuario
                  </label>
                  <select
                    name="rol"
                    value={formData.rol}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Selecciona un rol</option>
                    <option value="Administrador">Administrador</option>
                    <option value="Jardinero">Jardinero</option>
                  </select>
                </div>

                <div className="pt-2 flex justify-end">
                  <button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-5 py-2 rounded-lg shadow"
                  >
                    Guardar cambios
                  </button>
                </div>
              </form>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}