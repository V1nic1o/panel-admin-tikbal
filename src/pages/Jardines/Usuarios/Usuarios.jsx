import { useState, useEffect } from 'react';
import TablaUsuarios from '../../../components/Admin/Jardines/Usuarios/TablaUsuarios';
import ModalCrearUsuario from '../../../components/Admin/Jardines/Usuarios/ModalCrearUsuario';
import ModalEditarUsuario from '../../../components/Admin/Jardines/Usuarios/ModalEditarUsuario';
import ModalConfirmacion from '../../../components/Admin/Jardines/Usuarios/ModalConfirmacion';
import api from '../../../services/api';

export default function Usuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [usuarioActivo, setUsuarioActivo] = useState(null);
  const [modalCrearAbierto, setModalCrearAbierto] = useState(false);
  const [modalEditarAbierto, setModalEditarAbierto] = useState(false);
  const [modalConfirmar, setModalConfirmar] = useState({ abierto: false, tipo: '', usuario: null });

  const [busqueda, setBusqueda] = useState('');
  const [paginaActual, setPaginaActual] = useState(1);
  const usuariosPorPagina = 10;

  const cargarUsuarios = async () => {
    try {
      const res = await api.get('/usuarios');
      const data = Array.isArray(res.data) ? res.data : res.data.usuarios || [];
      setUsuarios(data);
    } catch {
      setUsuarios([]);
    }
  };

  useEffect(() => {
    cargarUsuarios();
  }, []);

  const abrirModalCrear = () => setModalCrearAbierto(true);
  const cerrarModalCrear = () => setModalCrearAbierto(false);

  const abrirModalEditar = (usuario) => {
    setUsuarioActivo(usuario);
    setModalEditarAbierto(true);
  };

  const cerrarModalEditar = () => {
    setUsuarioActivo(null);
    setModalEditarAbierto(false);
  };

  const abrirModalConfirmacion = (usuario, tipo) => {
    setModalConfirmar({ abierto: true, tipo, usuario });
  };

  const cerrarModalConfirmacion = () => {
    setModalConfirmar({ abierto: false, tipo: '', usuario: null });
  };

  // 🔍 Filtrado por nombre
  const usuariosFiltrados = usuarios.filter((u) =>
    u.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  // 📄 Paginación
  const totalPaginas = Math.ceil(usuariosFiltrados.length / usuariosPorPagina);
  const usuariosPagina = usuariosFiltrados.slice(
    (paginaActual - 1) * usuariosPorPagina,
    paginaActual * usuariosPorPagina
  );

  const cambiarPagina = (nueva) => {
    if (nueva >= 1 && nueva <= totalPaginas) setPaginaActual(nueva);
  };

  return (
    <div className="p-4 md:p-6 lg:p-8 w-full max-w-7xl mx-auto">
      <div className="flex flex-row items-center justify-between mb-6 flex-wrap gap-4">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Gestión de Usuarios</h1>
        <button
          onClick={abrirModalCrear}
          className="bg-green-600 hover:bg-green-700 text-white font-medium px-5 py-2 rounded-lg shadow"
        >
          Crear nuevo usuario
        </button>
      </div>

      {/* 🔎 Buscador */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Buscar por nombre..."
          value={busqueda}
          onChange={(e) => {
            setBusqueda(e.target.value);
            setPaginaActual(1); // volver a primera página si se busca
          }}
          className="w-full md:max-w-xs border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      {/* 🟦 Tabla */}
      <div className="overflow-x-auto rounded-lg shadow border border-gray-200 bg-white">
        <TablaUsuarios
          usuarios={usuariosPagina}
          onEditar={abrirModalEditar}
          onConfirmar={abrirModalConfirmacion}
        />
      </div>

      {/* 📑 Paginación */}
      {totalPaginas > 1 && (
        <div className="flex justify-center items-center mt-6 gap-2 flex-wrap text-sm">
          <button
            onClick={() => cambiarPagina(paginaActual - 1)}
            disabled={paginaActual === 1}
            className="px-3 py-1 rounded border bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
          >
            Anterior
          </button>
          {Array.from({ length: totalPaginas }).map((_, i) => (
            <button
              key={i}
              onClick={() => cambiarPagina(i + 1)}
              className={`px-3 py-1 rounded border ${
                paginaActual === i + 1
                  ? 'bg-blue-600 text-white font-semibold'
                  : 'bg-gray-100 hover:bg-gray-200'
              }`}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={() => cambiarPagina(paginaActual + 1)}
            disabled={paginaActual === totalPaginas}
            className="px-3 py-1 rounded border bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
          >
            Siguiente
          </button>
        </div>
      )}

      {/* 🟨 Modales */}
      <ModalCrearUsuario
        isOpen={modalCrearAbierto}
        onClose={() => {
          cerrarModalCrear();
          cargarUsuarios();
        }}
        onGuardar={cargarUsuarios}
      />
      <ModalEditarUsuario
        isOpen={modalEditarAbierto}
        onClose={() => {
          cerrarModalEditar();
          cargarUsuarios();
        }}
        usuario={usuarioActivo}
      />
      <ModalConfirmacion
        isOpen={modalConfirmar.abierto}
        onClose={() => {
          cerrarModalConfirmacion();
          cargarUsuarios();
        }}
        tipo={modalConfirmar.tipo}
        usuario={modalConfirmar.usuario}
      />
    </div>
  );
}