import { FaLeaf } from 'react-icons/fa';

export default function InicioJardinero() {
  return (
    <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8 text-center">
      <div className="flex justify-center mb-4">
        <FaLeaf className="text-green-500 text-4xl" />
      </div>

      <h1 className="text-2xl font-bold text-gray-800 mb-2">
        ¡Bienvenido al Panel del Jardinero!
      </h1>

      <p className="text-gray-600">
        Desde aquí podrás visualizar tus tareas, revisar el estado de tu jardín y recibir instrucciones del administrador.
      </p>

      <div className="mt-6">
        <p className="text-sm text-gray-500">
          Si tienes dudas, comunícate con tu administrador asignado.
        </p>
      </div>
    </div>
  );
}