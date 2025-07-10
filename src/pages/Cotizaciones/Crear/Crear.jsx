import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../../services/api';
import { FaTrash, FaPlus, FaSave, FaHome } from 'react-icons/fa';

export default function CrearCotizacion() {
  const [cliente, setCliente] = useState({
    nombre: '',
    nit: '',
    direccion: '',
    correo: '',
    telefono: ''
  });
  const [observaciones, setObservaciones] = useState('');
  const [productos, setProductos] = useState([
    { descripcion: '', cantidad: '', precioUnitario: '', total: 0, tipo: 'bien' }
  ]);
  const [mensaje, setMensaje] = useState('');
  const navigate = useNavigate();

  const calcularTotales = (index) => {
    const nuevos = [...productos];
    const p = nuevos[index];
    const cantidad = parseFloat(p.cantidad) || 0;
    const precio = parseFloat(p.precioUnitario) || 0;
    p.total = cantidad * precio;
    setProductos(nuevos);
  };

  const agregarFila = () => {
    setProductos([
      ...productos,
      { descripcion: '', cantidad: '', precioUnitario: '', total: 0, tipo: 'bien' }
    ]);
  };

  const eliminarFila = (index) => {
    const nuevos = [...productos];
    nuevos.splice(index, 1);
    setProductos(nuevos);
  };

  const totalGeneral = productos.reduce((acc, p) => acc + Number(p.total), 0).toFixed(2);

  const guardarCotizacion = async () => {
    if (!cliente.nombre || !cliente.nit) {
      setMensaje('Por favor completa los datos del cliente.');
      return;
    }

    if (
      productos.length === 0 ||
      productos.some(p => !p.descripcion || !p.cantidad || !p.precioUnitario)
    ) {
      setMensaje('Verifica que todos los productos estén completos.');
      return;
    }

    try {
      const resCliente = await api.post('/clientes', cliente);
      const clienteId = resCliente.data.id;

      const resCotizacion = await api.post('/cotizaciones', {
        clienteId,
        productos,
        total: totalGeneral,
        observaciones
      });

      const cotizacionId = resCotizacion.data.cotizacionId;
      setMensaje('✅ Cotización guardada correctamente');

      await new Promise(resolve => setTimeout(resolve, 1000));

      try {
        const res = await api.get(`/cotizaciones/pdf/${cotizacionId}`);
        const pdfURL = res.data.url;

        const nombreDesdeURL = pdfURL.split('/').pop(); // cotizacion-123-cliente.pdf
        const response = await fetch(pdfURL);
        const blob = await response.blob();

        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = nombreDesdeURL || 'cotizacion.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } catch (pdfError) {
        console.error('❌ Error al descargar el PDF:', pdfError.message);
        setMensaje('⚠️ Cotización guardada, pero falló la descarga del PDF');
      }

      setCliente({ nombre: '', nit: '', direccion: '', correo: '', telefono: '' });
      setObservaciones('');
      setProductos([{ descripcion: '', cantidad: '', precioUnitario: '', total: 0, tipo: 'bien' }]);

      setTimeout(() => navigate('/cotizaciones/historial'), 1500);
    } catch (error) {
      console.error(error);
      setMensaje('❌ Error al guardar la cotización');
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h2 className="text-2xl md:text-4xl font-bold text-center mb-6">Nueva Cotización</h2>

      <div className="grid gap-4 mb-8 bg-white p-6 rounded shadow">
        <div>
          <label className="block text-sm font-medium text-gray-700">Nombre del Cliente</label>
          <input
            type="text"
            className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
            placeholder="Ej. Municipalidad de Antigua"
            value={cliente.nombre}
            onChange={e => setCliente({ ...cliente, nombre: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">NIT</label>
          <input
            type="text"
            className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
            placeholder="Ej. 1234567"
            value={cliente.nit}
            onChange={e => setCliente({ ...cliente, nit: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Dirección</label>
          <input
            type="text"
            className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
            placeholder="Ej. Zona 1, Ciudad de Guatemala"
            value={cliente.direccion}
            onChange={e => setCliente({ ...cliente, direccion: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Correo electrónico</label>
          <input
            type="email"
            className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
            placeholder="Ej. cliente@email.com"
            value={cliente.correo}
            onChange={e => setCliente({ ...cliente, correo: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Teléfono</label>
          <input
            type="tel"
            className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
            placeholder="Ej. 55555555"
            value={cliente.telefono}
            onChange={e => setCliente({ ...cliente, telefono: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Observaciones</label>
          <textarea
            rows={3}
            className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
            placeholder="Observaciones sobre la cotización..."
            value={observaciones}
            onChange={e => setObservaciones(e.target.value)}
          />
        </div>
      </div>

      {/* Productos */}
      <div className="bg-white p-6 rounded shadow mb-6">
        <h3 className="text-xl font-semibold mb-4">Productos</h3>
        {productos.map((p, index) => (
          <div key={index} className="grid md:grid-cols-6 gap-4 mb-4 items-end border-b pb-4">
            <div>
              <label className="text-sm font-medium">Tipo</label>
              <select
                className="block w-full border rounded px-2 py-1"
                value={p.tipo}
                onChange={e => {
                  const nuevos = [...productos];
                  nuevos[index].tipo = e.target.value;
                  setProductos(nuevos);
                }}
              >
                <option value="bien">Bien</option>
                <option value="servicio">Servicio</option>
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="text-sm font-medium">Descripción</label>
              <input
                type="text"
                className="w-full border rounded px-2 py-1"
                placeholder="Ej. Grama, Agapanto..."
                value={p.descripcion}
                onChange={e => {
                  const nuevos = [...productos];
                  nuevos[index].descripcion = e.target.value;
                  setProductos(nuevos);
                }}
              />
            </div>

            <div>
              <label className="text-sm font-medium">Cantidad</label>
              <input
                type="number"
                className="w-full border rounded px-2 py-1"
                min="1"
                value={p.cantidad}
                onChange={e => {
                  const nuevos = [...productos];
                  nuevos[index].cantidad = e.target.value;
                  calcularTotales(index);
                }}
              />
            </div>

            <div>
              <label className="text-sm font-medium">Precio (Q)</label>
              <input
                type="number"
                className="w-full border rounded px-2 py-1"
                min="0"
                value={p.precioUnitario}
                onChange={e => {
                  const nuevos = [...productos];
                  nuevos[index].precioUnitario = e.target.value;
                  calcularTotales(index);
                }}
              />
            </div>

            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-700">Q{p.total.toFixed(2)}</span>
              <button
                onClick={() => eliminarFila(index)}
                className="text-red-600 hover:text-red-800 text-lg"
                title="Eliminar producto"
              >
                <FaTrash />
              </button>
            </div>
          </div>
        ))}
        <button
          onClick={agregarFila}
          className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 flex items-center gap-2"
        >
          <FaPlus /> <span>Agregar producto</span>
        </button>
      </div>

      <div className="text-right mb-6 text-xl font-bold">
        Total: Q{totalGeneral}
      </div>

      <div className="flex justify-between items-center flex-col sm:flex-row gap-4">
        <button
          onClick={() => navigate('/cotizaciones')}
          className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400 flex items-center gap-2"
        >
          <FaHome /> <span>Inicio</span>
        </button>

        <button
          onClick={guardarCotizacion}
          className="px-6 py-2 rounded bg-green-600 text-white hover:bg-green-700 flex items-center gap-2"
        >
          <FaSave /> <span>Guardar Cotización</span>
        </button>
      </div>

      {mensaje && (
        <div className="mt-6 text-center text-sm text-blue-700 font-medium">{mensaje}</div>
      )}
    </div>
  );
}