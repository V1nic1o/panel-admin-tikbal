// src/services/LoaderContext.jsx
import { createContext, useContext, useState } from 'react';

const LoaderContext = createContext();

export function useLoader() {
  return useContext(LoaderContext);
}

export function LoaderProvider({ children }) {
  const [cargando, setCargando] = useState(false);

  const value = {
    cargando,
    mostrarCarga: () => setCargando(true),
    ocultarCarga: () => setCargando(false),
  };

  return (
    <LoaderContext.Provider value={value}>
      {children}
      {cargando && (
        <div className="fixed inset-0 bg-white/70 z-[999] flex items-center justify-center">
          <div className="animate-spin text-4xl text-primary">
            <FaSpinner />
          </div>
        </div>
      )}
    </LoaderContext.Provider>
  );
}