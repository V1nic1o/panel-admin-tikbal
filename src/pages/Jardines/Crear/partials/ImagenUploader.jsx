// src/pages/Jardines/Crear/partials/ImagenUploader.jsx
import { HiUpload, HiX } from 'react-icons/hi';

export default function ImagenUploader({ imagen, setImagen }) {
  const handleImagen = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagen(URL.createObjectURL(file));
    }
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Imagen aérea del jardín
      </label>
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <label className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-lg border border-blue-300 hover:bg-blue-200 transition">
          <HiUpload className="text-xl" />
          <span>Subir imagen</span>
          <input type="file" accept="image/*" className="hidden" onChange={handleImagen} />
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
  );
}