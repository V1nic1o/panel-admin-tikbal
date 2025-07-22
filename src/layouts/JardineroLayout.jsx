// ✅ layouts/JardineroLayout.jsx
import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Jardinero/Sidebar/Sidebar';
import Header from '../components/Jardinero/Header/Header';

export default function JardineroLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen flex bg-gray-50 relative overflow-hidden">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div className="flex-1 flex flex-col lg:ml-72">
        <div className="fixed top-0 left-0 lg:left-72 right-0 z-40">
          <Header
            onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
            sidebarOpen={sidebarOpen}
          />
        </div>

        <main className="flex-1 p-4 pt-20">
          <Outlet />
        </main>
      </div>
    </div>
  );
}