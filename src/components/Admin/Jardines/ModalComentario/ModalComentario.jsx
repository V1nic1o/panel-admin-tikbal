import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';
import { HiX } from 'react-icons/hi';

export default function ModalComentario({ isOpen, onClose, onGuardar }) {
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [imagenes, setImagenes] = useState([]);

  const handleImagenChange = (e) => {
    const files = Array.from(e.target.files);
    const urls = files.map((file) => URL.createObjectURL(file));
    setImagenes(urls);
  };

  const handleSubmit = () => {
    if (!titulo.trim()) return;

    onGuardar({
      titulo,
      descripcion,
      imagenes,
    });

    // Limpiar
    setTitulo('');
    setDescripcion('');
    setImagenes([]);
    onClose();
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300" leave="ease-in duration-200"
          enterFrom="opacity-0" enterTo="opacity-100"
          leaveFrom="opacity-100" leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/25 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-full p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300" leave="ease-in duration-200"
              enterFrom="opacity-0 scale-95" enterTo="opacity-100 scale-100"
              leaveFrom="opacity-100 scale-100" leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                {/* Header */}
                <div className="flex justify-between items-center mb-4">
                  <Dialog.Title as="h3" className="text-lg font-medium text-gray-900">
                    Nuevo Comentario
                  </Dialog.Title>
                  <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                    <HiX className="w-5 h-5" />
                  </button>
                </div>

                {/* Formulario */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Título
                    </label>
                    <input
                      type="text"
                      value={titulo}
                      onChange={(e) => setTitulo(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 text-sm"
                      placeholder="Ej: Trabajo incompleto"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Descripción
                    </label>
                    <textarea
                      value={descripcion}
                      onChange={(e) => setDescripcion(e.target.value)}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 text-sm"
                      placeholder="Escribe detalles o sugerencias sobre esta tarea"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Imágenes (opcional)
                    </label>
                    <input
                      type="file"
                      multiple
                      onChange={handleImagenChange}
                      className="block w-full text-sm text-gray-600"
                    />
                    {imagenes.length > 0 && (
                      <div className="grid grid-cols-2 gap-2 mt-3">
                        {imagenes.map((src, idx) => (
                          <img key={idx} src={src} alt={`Comentario ${idx}`} className="w-full h-32 object-cover rounded-md shadow-sm" />
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Botones */}
                <div className="mt-6 flex justify-end gap-2">
                  <button
                    onClick={onClose}
                    className="px-4 py-2 rounded-md text-gray-600 hover:text-gray-800 text-sm"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={handleSubmit}
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm font-medium"
                  >
                    Guardar comentario
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}