export default function InfoCliente({ form, handleChange }) {
  return (
    <div className="grid grid-cols-1 gap-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Nombre del Cliente
        </label>
        <input
          type="text"
          name="cliente"
          value={form.cliente}
          onChange={handleChange}
          placeholder="Ej. Municipalidad de Antigua"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-green-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">NIT</label>
        <input
          type="text"
          name="nit"
          value={form.nit}
          onChange={handleChange}
          placeholder="Ej. 1234567"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-green-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Dirección</label>
        <input
          type="text"
          name="direccion"
          value={form.direccion}
          onChange={handleChange}
          placeholder="Ej. Zona 1, Ciudad de Guatemala"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-green-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Correo electrónico</label>
        <input
          type="email"
          name="correo"
          value={form.correo}
          onChange={handleChange}
          placeholder="Ej. cliente@email.com"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-green-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Teléfono</label>
        <input
          type="tel"
          name="telefono"
          value={form.telefono}
          onChange={handleChange}
          placeholder="Ej. 55555555"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-green-500"
        />
      </div>
    </div>
  );
}