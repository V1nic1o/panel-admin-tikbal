// src/pages/Secciones/Detalle/components/ModalCrearTarea.jsx
import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';
import { HiPlusCircle, HiX } from 'react-icons/hi';

export default function ModalCrearTarea({ isOpen, onClose, onGuardar }) {
  const [imagenes, setImagenes] = useState([]);
  const [formData, setFormData] = useState({ nombre: '', descripcion: '' });

  const handleImagenChange = (e) => {
    const files = Array.from(e.target.files);
    setImagenes(files);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const nuevaTarea = { ...formData, imagenes };
    onGuardar?.(nuevaTarea);
    onClose();
    setFormData({ nombre: '', descripcion: '' });
    setImagenes([]);
  };

  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
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
            <Dialog.Panel className="w-full max-w-lg bg-white rounded-2xl shadow-xl p-6 relative max-h-[90vh] overflow-y-auto">
              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-red-400 hover:text-red-600 transition"
              >
                <HiX className="text-2xl" />
              </button>

              <div className="flex items-center gap-3 mb-4">
                <HiPlusCircle className="text-2xl text-green-600" />
                <Dialog.Title className="text-lg font-semibold text-gray-800">
                  Crear tarea en sección
                </Dialog.Title>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nombre de la tarea
                  </label>
                  <input
                    type="text"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-green-500 focus:border-green-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Descripción
                  </label>
                  <textarea
                    name="descripcion"
                    value={formData.descripcion}
                    onChange={handleChange}
                    rows={3}
                    required
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-green-500 focus:border-green-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Imágenes de la tarea
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImagenChange}
                    className="w-full text-sm"
                  />

                  {/* Vista previa */}
                  {imagenes.length > 0 && (
                    <div className="mt-2 grid grid-cols-2 gap-2">
                      {imagenes.map((img, i) => (
                        <img
                          key={i}
                          src={URL.createObjectURL(img)}
                          alt={`Tarea imagen ${i}`}
                          className="h-24 object-cover rounded-lg border"
                        />
                      ))}
                    </div>
                  )}
                </div>

                <div className="pt-2 flex justify-end">
                  <button
                    type="submit"
                    className="bg-green-600 hover:bg-green-700 text-white font-medium px-5 py-2 rounded-lg shadow"
                  >
                    Guardar tarea
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