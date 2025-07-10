// src/pages/Cotizaciones/Historial/Historial.jsx
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../../services/api';
import {
  FaHome,
  FaPlus,
  FaFilePdf,
  FaPen,
  FaTrash,
  FaSpinner,
  FaWhatsapp,
} from 'react-icons/fa';

export default function Historial() {
  const [cotizaciones, setCotizaciones] = useState([]);
  const [filtros, setFiltros] = useState({
    clienteNombre: '',
    estado: '',
    fechaDesde: '',
    fechaHasta: ''
  });
  const [mensaje, setMensaje] = useState('');
  const [cargando, setCargando] = useState(false);
  const navigate = useNavigate();

  const obtenerCotizaciones = async () => {
    setCargando(true);
    try {
      const res = await api.get('/cotizaciones', { params: filtros });
      setCotizaciones(res.data);
      setMensaje('');
    } catch (err) {
      setMensaje('❌ Error al cargar cotizaciones');
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    obtenerCotizaciones();
  }, []);

  const handleDescargarPDF = async (id, nombreCliente) => {
    setCargando(true);
    try {
      const res = await api.get(`/cotizaciones/pdf/${id}`);
      const pdfURL = res.data.url;

      const response = await fetch(pdfURL);
      const blob = await response.blob();
      const nombreArchivo = `cotizacion-${nombreCliente.replace(/\s+/g, '_')}.pdf`;

      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = nombreArchivo;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      if (error.response?.status === 400) {
        setMensaje('⚠️ La cotización está incompleta. No se puede generar el PDF.');
      } else {
        console.error('Error al descargar el PDF:', error);
        setMensaje('❌ Error inesperado al generar el PDF.');
      }
    } finally {
      setCargando(false);
    }
  };

  const handleEnviarWhatsApp = async (id, nombreCliente, telefono) => {
    const numeroLimpio = (telefono || '').toString().replace(/\D/g, '');
    console.log('☎️ Número limpio:', numeroLimpio);

    if (!numeroLimpio || numeroLimpio.length < 8) {
      console.warn('⚠️ Número no válido');
      setMensaje('⚠️ Este cliente no tiene un número válido para WhatsApp.');
      return;
    }

    setCargando(true);
    try {
      const res = await api.get(`/cotizaciones/pdf/${id}`);
      const pdfURL = res.data.url;

      const mensaje = `Hola ${nombreCliente}, te comparto la cotización solicitada: ${pdfURL}`;
      const whatsappURL = `https://wa.me/502${numeroLimpio}?text=${encodeURIComponent(mensaje)}`;

      console.log('📩 Mensaje:', mensaje);
      console.log('🔗 URL generada:', whatsappURL);

      window.open(whatsappURL, '_blank');
    } catch (error) {
      console.error('❌ Error al preparar envío por WhatsApp:', error);
      setMensaje('❌ No se pudo generar el PDF para enviar por WhatsApp');
    } finally {
      setCargando(false);
    }
  };

  const actualizarEstado = async (id, nuevoEstado) => {
    setCargando(true);
    try {
      await api.put(`/cotizaciones/estado/${id}`, { estado: nuevoEstado });
      setMensaje('✅ Estado actualizado correctamente');
      obtenerCotizaciones();
    } catch (err) {
      setMensaje('❌ Error al actualizar el estado');
      setCargando(false);
    }
  };

  const eliminarCotizacion = async (id) => {
    if (!window.confirm('¿Estás seguro de eliminar esta cotización?')) return;

    setCargando(true);
    try {
      await api.delete(`/cotizaciones/${id}`);
      setMensaje('🗑️ Cotización eliminada correctamente');
      obtenerCotizaciones();
    } catch (err) {
      console.error(err);
      setMensaje('❌ Error al eliminar la cotización');
      setCargando(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 relative">
      {cargando && (
        <div className="absolute inset-0 bg-white/80 flex items-center justify-center z-50">
          <FaSpinner className="animate-spin text-5xl text-blue-800" />
        </div>
      )}

      <h2 className="text-3xl font-bold text-center mb-6">Historial de Cotizaciones</h2>

      <div className="grid md:grid-cols-5 gap-4 mb-6 bg-white p-4 rounded shadow">
        <input
          type="text"
          placeholder="Buscar por cliente"
          className="border rounded px-2 py-1"
          value={filtros.clienteNombre}
          onChange={e => setFiltros({ ...filtros, clienteNombre: e.target.value })}
        />
        <select
          className="border rounded px-2 py-1"
          value={filtros.estado}
          onChange={e => setFiltros({ ...filtros, estado: e.target.value })}
        >
          <option value="">Todos los estados</option>
          <option value="pendiente">Pendiente</option>
          <option value="entregada">Entregada</option>
          <option value="cancelada">Cancelada</option>
        </select>
        <input
          type="date"
          className="border rounded px-2 py-1"
          value={filtros.fechaDesde}
          onChange={e => setFiltros({ ...filtros, fechaDesde: e.target.value })}
        />
        <input
          type="date"
          className="border rounded px-2 py-1"
          value={filtros.fechaHasta}
          onChange={e => setFiltros({ ...filtros, fechaHasta: e.target.value })}
        />
        <button
          onClick={obtenerCotizaciones}
          className="bg-blue-600 text-white rounded px-3 py-1 hover:bg-blue-700 flex items-center justify-center gap-2"
        >
          🔍 Buscar
        </button>
      </div>

      {mensaje && (
        <div className="text-center text-sm text-blue-700 mb-4">{mensaje}</div>
      )}

      <div className="grid gap-4">
        {cotizaciones.map(c => {
          const telefono = (c.Cliente.telefono || '').toString().trim();
          return (
            <div
              key={c.id}
              className="bg-white shadow rounded p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
            >
              <div>
                <p><strong>Cliente:</strong> {c.Cliente.nombre}</p>
                <p><strong>Teléfono:</strong> {telefono || 'No disponible'}</p>
                <p><strong>Fecha:</strong> {new Date(c.fecha).toLocaleDateString()}</p>
                <p><strong>Total:</strong> Q{c.total}</p>
              </div>

              <div className="flex flex-col md:items-end gap-2">
                <div>
                  <label className="block text-sm font-medium mb-1">Estado:</label>
                  <select
                    value={c.estado}
                    className="border rounded px-2 py-1"
                    onChange={e => actualizarEstado(c.id, e.target.value)}
                  >
                    <option value="pendiente">Pendiente</option>
                    <option value="entregada">Entregada</option>
                    <option value="cancelada">Cancelada</option>
                  </select>
                </div>

                <div className="flex flex-wrap gap-2 mt-2">
                  <button
                    onClick={() => handleDescargarPDF(c.id, c.Cliente.nombre)}
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 flex items-center gap-1"
                  >
                    <FaFilePdf /> PDF
                  </button>
                  <button
                    onClick={() => handleEnviarWhatsApp(c.id, c.Cliente.nombre, telefono)}
                    className={`px-3 py-1 rounded flex items-center gap-1 ${
                      telefono.length >= 8
                        ? 'bg-green-500 hover:bg-green-600 text-white'
                        : 'bg-gray-300 text-gray-600 cursor-not-allowed'
                    }`}
                    disabled={telefono.length < 8}
                  >
                    <FaWhatsapp /> WhatsApp
                  </button>
                  <button
                    onClick={() => navigate(`/cotizaciones/editar/${c.id}`)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 flex items-center gap-1"
                  >
                    <FaPen /> Editar
                  </button>
                  <button
                    onClick={() => eliminarCotizacion(c.id)}
                    className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 flex items-center gap-1"
                  >
                    <FaTrash /> Eliminar
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="fixed bottom-6 right-6 flex flex-col gap-4">
        <button
          onClick={() => navigate('/')}
          title="Ir a inicio"
          className="bg-gray-300 hover:bg-gray-400 rounded-full p-3 shadow"
        >
          <FaHome size={18} />
        </button>
        <button
          onClick={() => navigate('/cotizaciones/crear')}
          title="Nueva cotización"
          className="bg-green-600 hover:bg-green-700 text-white rounded-full p-3 shadow"
        >
          <FaPlus size={18} />
        </button>
      </div>
    </div>
  );
}