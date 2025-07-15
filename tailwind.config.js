// tailwind.config.js
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#0B3E7A',
        secondary: '#5A7F8C',
        greenGray: '#A3A88B',
        beige: '#DBCCC1',
        terracota: '#C17161',

        // 🎨 Nuevos colores suaves para fondos y contenedores
        sidebar: '#1F2937', // gris oscuro similar a Material Dashboard
        sidebarActive: '#3B82F6', // azul claro para ítems activos
        lightGray: '#F3F4F6', // para fondo general
      },
      borderRadius: {
        xl: '1rem',
        '2xl': '1.5rem',
      },
      boxShadow: {
        card: '0 2px 12px rgba(0, 0, 0, 0.1)',
        soft: '0 4px 24px rgba(0, 0, 0, 0.08)',
      },
    },
  },
  plugins: [],
};