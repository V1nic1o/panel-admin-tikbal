// src/components/Admin/Jardines/Usuarios/TablaUsuarios.jsx
import { HiPencilAlt, HiTrash, HiBan } from 'react-icons/hi';

export default function TablaUsuarios({ usuarios, onEditar, onConfirmar }) {
  const formatearRol = (rol) => {
    if (rol === 'admin') return 'Administrador';
    if (rol === 'jardinero') return 'Jardinero';
    return rol;
  };

  return (
    <div className="w-full">
      {/* 🖥️ Tabla en desktop */}
      <div className="hidden md:block overflow-x-auto">
        <table className="min-w-[640px] w-full table-auto bg-white border rounded-xl shadow-sm">
          <thead>
            <tr className="text-left bg-gray-50 text-gray-600 text-sm">
              <th className="px-4 py-3 font-semibold">Nombre</th>
              <th className="px-4 py-3 font-semibold">Correo</th>
              <th className="px-4 py-3 font-semibold">Rol</th>
              <th className="px-4 py-3 font-semibold">Estado</th>
              <th className="px-4 py-3 font-semibold text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(usuarios) &&
              usuarios.map((usuario) => (
                <tr key={usuario.id} className="border-t text-sm text-gray-700">
                  <td className="px-4 py-3 whitespace-nowrap">{usuario.nombre}</td>
                  <td className="px-4 py-3 whitespace-nowrap">{usuario.correo}</td>
                  <td className="px-4 py-3 whitespace-nowrap">{formatearRol(usuario.rol)}</td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span
                      className={`inline-block px-3 py-1 text-xs rounded-full font-semibold ${
                        usuario.activo
                          ? 'bg-green-100 text-green-700'
                          : 'bg-gray-200 text-gray-600'
                      }`}
                    >
                      {usuario.activo ? 'Activo' : 'Inactivo'}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <div className="flex justify-center gap-2">
                      <button
                        onClick={() => onEditar(usuario)}
                        className="w-9 h-9 rounded-full bg-blue-500 hover:bg-blue-600 flex items-center justify-center text-white"
                        title="Editar"
                      >
                        <HiPencilAlt className="text-lg" />
                      </button>
                      <button
                        onClick={() =>
                          onConfirmar(usuario, usuario.activo ? 'deshabilitar' : 'activar')
                        }
                        className={`w-9 h-9 rounded-full flex items-center justify-center text-white ${
                          usuario.activo
                            ? 'bg-yellow-500 hover:bg-yellow-600'
                            : 'bg-green-500 hover:bg-green-600'
                        }`}
                        title={usuario.activo ? 'Deshabilitar' : 'Activar'}
                      >
                        <HiBan className="text-lg" />
                      </button>
                      <button
                        onClick={() => onConfirmar(usuario, 'eliminar')}
                        className="w-9 h-9 rounded-full bg-red-500 hover:bg-red-600 flex items-center justify-center text-white"
                        title="Eliminar"
                      >
                        <HiTrash className="text-lg" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {/* 📱 Vista tipo tarjetas en móviles */}
      <div className="md:hidden flex flex-col gap-4">
        {Array.isArray(usuarios) &&
          usuarios.map((usuario) => (
            <div
              key={usuario.id}
              className="bg-white rounded-lg shadow p-4 border border-gray-200"
            >
              <p className="text-sm text-gray-500 mb-1">
                <span className="font-semibold text-gray-700">Nombre:</span>{' '}
                {usuario.nombre}
              </p>
              <p className="text-sm text-gray-500 mb-1">
                <span className="font-semibold text-gray-700">Correo:</span>{' '}
                {usuario.correo}
              </p>
              <p className="text-sm text-gray-500 mb-1">
                <span className="font-semibold text-gray-700">Rol:</span>{' '}
                {formatearRol(usuario.rol)}
              </p>
              <p className="text-sm text-gray-500 mb-2">
                <span className="font-semibold text-gray-700">Estado:</span>{' '}
                <span
                  className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                    usuario.activo
                      ? 'bg-green-100 text-green-700'
                      : 'bg-gray-200 text-gray-600'
                  }`}
                >
                  {usuario.activo ? 'Activo' : 'Inactivo'}
                </span>
              </p>
              <div className="flex justify-center gap-4 mt-2">
                <button
                  onClick={() => onEditar(usuario)}
                  className="w-10 h-10 rounded-full bg-blue-500 hover:bg-blue-600 flex items-center justify-center text-white"
                  title="Editar"
                >
                  <HiPencilAlt className="text-lg" />
                </button>
                <button
                  onClick={() =>
                    onConfirmar(usuario, usuario.activo ? 'deshabilitar' : 'activar')
                  }
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-white ${
                    usuario.activo
                      ? 'bg-yellow-500 hover:bg-yellow-600'
                      : 'bg-green-500 hover:bg-green-600'
                  }`}
                  title={usuario.activo ? 'Deshabilitar' : 'Activar'}
                >
                  <HiBan className="text-lg" />
                </button>
                <button
                  onClick={() => onConfirmar(usuario, 'eliminar')}
                  className="w-10 h-10 rounded-full bg-red-500 hover:bg-red-600 flex items-center justify-center text-white"
                  title="Eliminar"
                >
                  <HiTrash className="text-lg" />
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}