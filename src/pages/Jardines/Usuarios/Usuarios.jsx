// src/pages/Jardines/Usuarios/Usuarios.jsx
import { useState } from 'react';
import TablaUsuarios from '../../../components/Admin/Jardines/Usuarios/TablaUsuarios';
import ModalCrearUsuario from '../../../components/Admin/Jardines/Usuarios/ModalCrearUsuario';
import ModalEditarUsuario from '../../../components/Admin/Jardines/Usuarios/ModalEditarUsuario';
import ModalConfirmacion from '../../../components/Admin/Jardines/Usuarios/ModalConfirmacion';

export default function Usuarios() {
  const [usuarioActivo, setUsuarioActivo] = useState(null);
  const [modalCrearAbierto, setModalCrearAbierto] = useState(false);
  const [modalEditarAbierto, setModalEditarAbierto] = useState(false);
  const [modalConfirmar, setModalConfirmar] = useState({ abierto: false, tipo: '', usuario: null });

  const usuariosDemo = [
    { id: 1, nombre: 'Carlos López', correo: 'carlos@example.com', rol: 'Jardinero' },
    { id: 2, nombre: 'María Gómez', correo: 'maria@example.com', rol: 'Administrador' },
    { id: 3, nombre: 'Luis Pérez', correo: 'luis@example.com', rol: 'Jardinero' },
  ];

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

  return (
    <div className="p-4 md:p-6 lg:p-8 w-full max-w-7xl mx-auto">
      <div className="flex flex-row items-center justify-between mb-6 flex-wrap gap-4">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
          Gestión de Usuarios
        </h1>
        <button
          onClick={abrirModalCrear}
          className="bg-green-600 hover:bg-green-700 text-white font-medium px-5 py-2 rounded-lg shadow"
        >
          Crear nuevo usuario
        </button>
      </div>

      {/* 🟦 Tabla responsiva */}
      <div className="overflow-x-auto rounded-lg shadow border border-gray-200 bg-white">
        <TablaUsuarios
          usuarios={usuariosDemo}
          onEditar={abrirModalEditar}
          onConfirmar={abrirModalConfirmacion}
        />
      </div>

      {/* 🟨 Modales */}
      <ModalCrearUsuario isOpen={modalCrearAbierto} onClose={cerrarModalCrear} />
      <ModalEditarUsuario
        isOpen={modalEditarAbierto}
        onClose={cerrarModalEditar}
        usuario={usuarioActivo}
      />
      <ModalConfirmacion
        isOpen={modalConfirmar.abierto}
        onClose={cerrarModalConfirmacion}
        tipo={modalConfirmar.tipo}
        usuario={modalConfirmar.usuario}
      />
    </div>
  );
}