export default function InfoJardin({ form, handleChange }) {
  return (
    <div className="grid grid-cols-1 gap-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Nombre del jardín
        </label>
        <input
          type="text"
          name="nombre"
          value={form.nombre}
          onChange={handleChange}
          placeholder="Ej. Jardín Central"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-green-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Descripción
        </label>
        <input
          type="text"
          name="descripcion"
          value={form.descripcion}
          onChange={handleChange}
          placeholder="Breve descripción del jardín"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-green-500"
        />
      </div>
    </div>
  );
}