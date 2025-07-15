import { Outlet } from 'react-router-dom';
import { useState } from 'react';
import Header from '../components/Admin/Header/Header';
import Sidebar from '../components/Admin/Sidebar/Sidebar';

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const nombreUsuario = 'Vinicio';

  return (
    <div className="min-h-screen flex bg-gray-50 relative overflow-hidden">
      {/* Sidebar fijo */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Contenedor principal compensando el ancho del sidebar */}
      <div className="flex-1 flex flex-col lg:ml-72">
        {/* Header fijo arriba del contenido */}
        <div className="fixed top-0 left-0 lg:left-72 right-0 z-40">
          <Header
            nombreUsuario={nombreUsuario}
            onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
            sidebarOpen={sidebarOpen}
          />
        </div>

        {/* Contenido con margen superior por el header */}
        <main className="flex-1 p-4 pt-20">
          <Outlet />
        </main>
      </div>
    </div>
  );
}