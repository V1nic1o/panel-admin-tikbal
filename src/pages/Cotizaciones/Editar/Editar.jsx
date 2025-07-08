import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../../services/api';
import { FaSave, FaPlus, FaTrash, FaClipboardList } from 'react-icons/fa';

export default function Editar() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [cliente, setCliente] = useState({ nombre: '', nit: '' });
  const [clienteId, setClienteId] = useState(null);
  const [observaciones, setObservaciones] = useState('');
  const [productos, setProductos] = useState([]);
  const [mensaje, setMensaje] = useState('');

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const res = await api.get('/cotizaciones');
        const cotizacion = res.data.find(c => c.id === parseInt(id));

        if (!cotizacion) {
          setMensaje('❌ Cotización no encontrada');
          return;
        }

        setCliente({
          nombre: cotizacion.Cliente.nombre,
          nit: cotizacion.Cliente.nit
        });
        setClienteId(cotizacion.Cliente.id);
        setObservaciones(cotizacion.observaciones || '');

        setProductos(
          cotizacion.DetalleCotizacions.map(p => ({
            descripcion: p.descripcion,
            cantidad: Number(p.cantidad),
            precioUnitario: Number(p.precioUnitario),
            total: Number(p.total),
            tipo: p.tipo || 'bien'
          }))
        );
      } catch (error) {
        console.error(error);
        setMensaje('❌ Error al cargar la cotización');
      }
    };

    cargarDatos();
  }, [id]);

  const handleChangeProducto = (index, campo, valor) => {
    const nuevos = [...productos];
    nuevos[index][campo] = campo === 'cantidad' || campo === 'precioUnitario'
      ? Number(valor)
      : valor;

    if (campo === 'cantidad' || campo === 'precioUnitario') {
      nuevos[index].total = nuevos[index].cantidad * nuevos[index].precioUnitario;
    }

    setProductos(nuevos);
  };

  const eliminarProducto = (index) => {
    const nuevos = [...productos];
    nuevos.splice(index, 1);
    setProductos(nuevos);
  };

  const agregarProducto = () => {
    setProductos([
      ...productos,
      {
        descripcion: '',
        cantidad: 1,
        precioUnitario: 0,
        total: 0,
        tipo: 'bien'
      }
    ]);
  };

  const guardarCambios = async () => {
    try {
      const total = productos.reduce((acc, p) => acc + p.total, 0).toFixed(2);

      await api.put(`/cotizaciones/${id}`, {
        clienteId,
        productos,
        total,
        observaciones
      });

      setMensaje('✅ Cotización actualizada correctamente');
      setTimeout(() => navigate('/cotizaciones/historial'), 1500);
    } catch (err) {
      console.error(err);
      setMensaje('❌ Error al actualizar cotización');
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-center mb-6">Editar Cotización</h2>

      {mensaje && (
        <div className="text-center text-sm text-blue-700 mb-4">{mensaje}</div>
      )}

      <div className="grid gap-4 mb-8 bg-white p-6 rounded shadow">
        <div>
          <label className="block text-sm font-medium text-gray-700">Nombre del Cliente</label>
          <input
            type="text"
            value={cliente.nombre}
            disabled
            className="w-full border px-3 py-2 rounded bg-gray-100 text-gray-700"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">NIT</label>
          <input
            type="text"
            value={cliente.nit}
            disabled
            className="w-full border px-3 py-2 rounded bg-gray-100 text-gray-700"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Observaciones</label>
          <textarea
            rows={3}
            value={observaciones}
            onChange={e => setObservaciones(e.target.value)}
            placeholder="Editar observaciones..."
            className="w-full border px-3 py-2 rounded"
          />
        </div>
      </div>

      <h3 className="text-xl font-semibold mb-4">Productos</h3>
      <div className="space-y-6">
        {productos.map((p, index) => (
          <div key={index} className="grid md:grid-cols-5 gap-4 items-end bg-white p-4 rounded shadow">
            <div>
              <label className="text-sm font-medium">Descripción</label>
              <input
                type="text"
                value={p.descripcion}
                onChange={e => handleChangeProducto(index, 'descripcion', e.target.value)}
                className="w-full border rounded px-2 py-1"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Cantidad</label>
              <input
                type="number"
                value={p.cantidad}
                onChange={e => handleChangeProducto(index, 'cantidad', e.target.value)}
                className="w-full border rounded px-2 py-1"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Precio Unitario</label>
              <input
                type="number"
                value={p.precioUnitario}
                onChange={e => handleChangeProducto(index, 'precioUnitario', e.target.value)}
                className="w-full border rounded px-2 py-1"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Tipo</label>
              <select
                value={p.tipo}
                onChange={e => handleChangeProducto(index, 'tipo', e.target.value)}
                className="w-full border rounded px-2 py-1"
              >
                <option value="bien">Bien</option>
                <option value="servicio">Servicio</option>
              </select>
            </div>
            <div className="flex flex-col gap-2 items-center justify-end">
              <p className="text-sm">Total: Q{p.total.toFixed(2)}</p>
              <button
                onClick={() => eliminarProducto(index)}
                className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 text-sm flex items-center gap-1"
              >
                <FaTrash /> Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={agregarProducto}
        className="w-full mt-6 bg-green-600 hover:bg-green-700 text-white font-medium px-4 py-2 rounded flex justify-center items-center gap-2"
      >
        <FaPlus /> Agregar producto
      </button>

      <button
        onClick={guardarCambios}
        className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded flex justify-center items-center gap-2"
      >
        <FaSave /> Guardar Cambios
      </button>

      <div className="fixed bottom-6 right-6">
        <button
          onClick={() => navigate('/cotizaciones/historial')}
          title="Volver al historial"
          className="bg-gray-300 hover:bg-gray-400 rounded-full p-3 shadow"
        >
          <FaClipboardList size={18} />
        </button>
      </div>
    </div>
  );
}