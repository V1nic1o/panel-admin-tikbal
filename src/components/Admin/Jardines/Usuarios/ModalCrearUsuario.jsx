import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState, useEffect } from 'react';
import { HiPlusCircle, HiX } from 'react-icons/hi';
import api from '../../../../services/api';

export default function ModalCrearUsuario({ isOpen, onClose, onGuardar }) {
  const [formData, setFormData] = useState({
    nombre: '',
    correo: '',
    telefono: '',
    direccion: '',
    rol: 'jardinero',
  });

  const [loading, setLoading] = useState(false);
  const [usuarioActual, setUsuarioActual] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (!storedToken) return;

    try {
      const payloadBase64 = storedToken.split('.')[1];
      const decodedPayload = JSON.parse(atob(payloadBase64));
      setUsuarioActual(decodedPayload);
    } catch (error) {
      console.error('No se pudo decodificar el token');
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const limpiarFormulario = () => {
    setFormData({
      nombre: '',
      correo: '',
      telefono: '',
      direccion: '',
      rol: 'jardinero',
    });
  };

  const enviarWhatsApp = (telefono, password) => {
    if (!telefono || !password) {
      console.log('❌ No hay teléfono o contraseña para WhatsApp:', telefono, password);
      return;
    }

    const mensaje = `👋 Hola ${formData.nombre}, tu cuenta ha sido creada en Tikb’al.\n\n📧 Usuario: ${formData.correo}\n🔑 Contraseña: ${password}\n\nPuedes iniciar sesión con estos datos en cualquier momento.`;
    const numero = telefono.replace(/\D/g, '');

    const url = `https://wa.me/502${numero}?text=${encodeURIComponent(mensaje)}`;

    console.log('✅ Redirigiendo a WhatsApp con URL:', url);

    // Redirige después de limpiar y cerrar modal
    setTimeout(() => {
      window.location.href = url;
    }, 300);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log('📨 Enviando datos del formulario:', formData);

    try {
      const res = await api.post('/usuarios', formData);
      console.log('✅ Usuario creado:', res.data);

      const password = res.data?.usuario?.passwordTemporal;
      console.log('🔑 Contraseña generada:', password);

      onGuardar?.();
      onClose();
      limpiarFormulario();
      enviarWhatsApp(formData.telefono, password);
    } catch (error) {
      console.error('❌ Error al crear usuario:', error);
      if (error.response) {
        alert(`Error: ${error.response.data?.error || 'Error del servidor'}`);
      } else {
        alert('Error al conectarse al servidor');
      }
    } finally {
      setLoading(false);
    }
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
            <Dialog.Panel className="w-full max-w-md rounded-2xl bg-white shadow-xl p-6 relative">
              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-red-400 hover:text-red-600 transition"
              >
                <HiX className="text-2xl sm:text-3xl" />
              </button>

              <div className="flex items-center gap-3 mb-4">
                <HiPlusCircle className="text-2xl text-green-600" />
                <Dialog.Title className="text-lg font-semibold text-gray-800">
                  Crear nuevo usuario
                </Dialog.Title>
              </div>

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
                    required
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

                {usuarioActual?.rol === 'admin' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Rol
                    </label>
                    <select
                      name="rol"
                      value={formData.rol}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="jardinero">Jardinero</option>
                      <option value="admin">Administrador</option>
                    </select>
                  </div>
                )}

                <div className="pt-2 flex justify-end">
                  <button
                    type="submit"
                    disabled={loading}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-5 py-2 rounded-lg shadow disabled:opacity-50"
                  >
                    {loading ? 'Guardando...' : 'Guardar usuario'}
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