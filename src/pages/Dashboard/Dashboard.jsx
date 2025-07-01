import { motion } from 'framer-motion';
import fondo from '../../assets/FONDO.jpg';

export default function Dashboard() {
  return (
    <section
      className="min-h-screen w-full relative text-white flex flex-col justify-center items-center px-4 pt-16 sm:pt-20 pb-24 text-center
                 border-[6px] border-white rounded-3xl shadow-2xl mx-4 sm:mx-8 lg:mx-auto max-w-7xl"
    >
      {/* Fondo decorativo */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-10"
        style={{ backgroundImage: `url(${fondo})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-[#0b3e7a]/90 to-[#5a7f8c]/95 z-0 rounded-3xl" />

      {/* Contenido */}
      <motion.div
        className="relative z-10 w-full max-w-4xl border-[5px] border-white/70 rounded-2xl shadow-xl px-6 py-10 bg-white/5 backdrop-blur-sm"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 drop-shadow">
          Bienvenido al Panel de Administración
        </h2>

        <p className="text-base sm:text-lg md:text-xl text-white/90 leading-relaxed mb-10">
          Desde aquí puedes gestionar los servicios, el portafolio de proyectos y los mensajes de contacto de tu sitio web Tikb’al.
        </p>

        {/* Imagen con zoom interno */}
        <div className="mx-auto w-[280px] sm:w-[340px] md:w-[400px] border-[6px] border-white rounded-[2rem] shadow-2xl overflow-hidden">
          <motion.img
            src={fondo}
            alt="Logo Tikb’al"
            className="w-full h-auto object-contain transition-transform duration-500"
            whileHover={{ scale: 1.1 }}
          />
        </div>
      </motion.div>
    </section>
  );
}