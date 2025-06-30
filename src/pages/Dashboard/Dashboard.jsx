// src/pages/Dashboard/Dashboard.jsx
import { motion } from 'framer-motion';
import fondo from '../../assets/FONDO.jpg'; // puedes cambiar esta imagen por una más apropiada si lo deseas

export default function Dashboard() {
  return (
    <section
      className="min-h-screen bg-cover bg-center relative text-white text-center flex flex-col justify-center items-center px-4"
      style={{ backgroundImage: `linear-gradient(to bottom, rgba(11, 62, 122, 0.7), rgba(11, 62, 122, 0.9)), url(${fondo})` }}
    >
      <motion.h2
        className="text-3xl md:text-5xl font-bold mb-4 drop-shadow-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Bienvenido al Panel de Administración
      </motion.h2>
      <motion.p
        className="text-lg md:text-xl max-w-2xl mx-auto text-white/90"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        Desde aquí puedes gestionar los servicios, el portafolio de proyectos y los mensajes de contacto de tu sitio web Tikb’al.
      </motion.p>
    </section>
  );
}