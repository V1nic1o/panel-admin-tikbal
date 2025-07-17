import { useState } from 'react';
import { HiUpload, HiX, HiOutlineSparkles } from 'react-icons/hi';
import { FaSpinner } from 'react-icons/fa';

export default function CrearJardin() {
  const [imagen, setImagen] = useState(null);
  const [cargando, setCargando] = useState(false);

  const handleImagen = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagen(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setCargando(true);
    setTimeout(() => {
      setCargando(false);
      alert('Jardín guardado (simulado)');
    }, 1500);
  };

  return (
    <div className="p-6 md:p-10 min-h-screen">
      <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-2xl p-8">
        <div className="mb-6 flex items-center gap-3">
          <HiOutlineSparkles className="text-3xl text-pink-400" />
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-1">Crear Jardín</h1>
            <p className="text-gray-500 text-sm">
              Completa los siguientes campos para registrar un nuevo jardín.
            </p>
          </div>
        </div>

        <form className="space-y-8" onSubmit={handleSubmit}>
          {/* Imagen */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Imagen aérea del jardín
            </label>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <label className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-lg border border-blue-300 hover:bg-blue-200 transition">
                <HiUpload className="text-xl" />
                <span>Subir imagen</span>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImagen}
                />
              </label>
              {imagen && (
                <div className="relative w-40 h-40 rounded overflow-hidden border">
                  <img src={imagen} alt="Vista previa" className="object-cover w-full h-full" />
                  <button
                    type="button"
                    className="absolute top-1 right-1 bg-white/80 hover:bg-white rounded-full p-1 text-red-500"
                    onClick={() => setImagen(null)}
                  >
                    <HiX className="text-lg" />
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Jardín info */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nombre del jardín</label>
              <input type="text" placeholder="Ej. Jardín Central" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-400" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
              <input type="text" placeholder="Breve descripción del jardín" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-400" />
            </div>
          </div>

          {/* Cliente info */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nombre del Cliente</label>
              <input type="text" placeholder="Ej. Municipalidad de Antigua" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-400" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">NIT</label>
              <input type="text" placeholder="Ej. 1234567" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-400" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Dirección</label>
              <input type="text" placeholder="Ej. Zona 1, Ciudad de Guatemala" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-400" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Correo electrónico</label>
              <input type="email" placeholder="Ej. cliente@email.com" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-400" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Teléfono</label>
              <input type="tel" placeholder="Ej. 55555555" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-400" />
            </div>
          </div>

          {/* Botón */}
          <div className="pt-4 flex justify-end">
            <button
              type="submit"
              disabled={cargando}
              className="bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-2 rounded-lg shadow flex items-center gap-2"
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
      </div>
    </div>
  );
}