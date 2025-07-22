import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';
import { HiOutlineSparkles, HiX } from 'react-icons/hi';
import { FaSpinner } from 'react-icons/fa';
import ImagenUploader from './partials/ImagenUploader';
import InfoJardin from './partials/InfoJardin';
import InfoCliente from './partials/InfoCliente';

export default function CrearJardin({ isOpen, onClose }) {
  const [imagen, setImagen] = useState(null);
  const [cargando, setCargando] = useState(false);

  const [form, setForm] = useState({
    nombre: '',
    descripcion: '',
    cliente: '',
    nit: '',
    direccion: '',
    correo: '',
    telefono: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setCargando(true);
    setTimeout(() => {
      setCargando(false);
      alert('Jardín guardado (simulado)');
      onClose();
      setForm({
        nombre: '',
        descripcion: '',
        cliente: '',
        nit: '',
        direccion: '',
        correo: '',
        telefono: '',
      });
      setImagen(null);
    }, 1500);
  };

  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        {/* Fondo oscuro con desenfoque */}
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

        {/* Panel modal compacto y centrado */}
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
            <Dialog.Panel className="w-full max-w-md max-h-[90vh] overflow-y-auto bg-white rounded-2xl shadow-xl p-4 sm:p-6 relative">
              {/* Botón cerrar */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-red-400 hover:text-red-600 transition"
              >
                <HiX className="text-2xl sm:text-3xl" />
              </button>

              {/* Encabezado */}
              <div className="flex items-center gap-3 mb-4">
                <HiOutlineSparkles className="text-2xl text-green-600" />
                <Dialog.Title className="text-lg font-semibold text-gray-800">
                  Crear Jardín
                </Dialog.Title>
              </div>

              {/* Formulario vertical compacto */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <ImagenUploader imagen={imagen} setImagen={setImagen} />
                <InfoJardin form={form} handleChange={handleChange} vertical />
                <InfoCliente form={form} handleChange={handleChange} vertical />

                <div className="pt-2 flex justify-end">
                  <button
                    type="submit"
                    disabled={cargando}
                    className="bg-green-600 hover:bg-green-700 text-white font-semibold px-5 py-2 rounded-lg shadow flex items-center gap-2"
                  >
                    {cargando ? (
                      <>
                        <FaSpinner className="animate-spin" />
                        Guardando...
                      </>
                    ) : (
                      'Guardar jardín'
                    )}
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