"use client";
import Image from "next/image";
import Notificacion from "./Notificacion";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Leaf, Users } from "lucide-react";

const notificacionesRecientes = [
  {
    titulo: "Recordatorio de reciclaje",
    descripcion: "Es hora de separar los residuos orgánicos",
    hora: "12:30",
    tiempo: "Ahora",
    colorEstado: "bg-green-500"
  },
  {
    titulo: "Consumo de energía",
    descripcion: "Tu consumo está 15% por encima del promedio",
    hora: "12:25",
    tiempo: "Hace 5 min",
    colorEstado: "bg-yellow-500"
  }
];

const notificacionesPasadas = [
  {
    titulo: "Agua ahorrada",
    descripcion: "Has ahorrado 5L de agua hoy",
    hora: "11:30",
    tiempo: "Hace 1 hora",
    colorEstado: "bg-gray-400",
    opacidad: "opacity-75"
  },
  {
    titulo: "Transporte sostenible",
    descripcion: "Has usado transporte público 3 veces esta semana",
    hora: "10:30",
    tiempo: "Hace 2 horas",
    colorEstado: "bg-gray-400",
    opacidad: "opacity-75"
  },
  {
    titulo: "Huella de carbono",
    descripcion: "Tu huella de carbono se redujo 2kg esta semana",
    hora: "09:30",
    tiempo: "Hace 3 horas",
    colorEstado: "bg-gray-400",
    opacidad: "opacity-75"
  }
];

export default function Home() {
  mostrarNotificacion();
  const [expandidoRecientes, setExpandidoRecientes] = useState(false);
  const [expandidoPasadas, setExpandidoPasadas] = useState(false);
  const [mostrarODS, setMostrarODS] = useState(false);
  const [mostrarSobreNosotros, setMostrarSobreNosotros] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-beige p-4">
      {/* Botones laterales - Posicionados a la izquierda */}
      <div className="fixed top-[10%] left-[5%] flex flex-col space-y-3">
        {/* Botón ODS */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          onClick={() => setMostrarODS(true)}
          className="bg-white text-primary rounded-xl w-16 h-16 flex items-center justify-center shadow-lg cursor-pointer border-2 border-primary/20 hover:border-primary/40 transition-all duration-200"
        >
          <div className="text-center">
            <Leaf className="w-6 h-6 mb-1" />
            <div className="text-xs font-semibold">ODS</div>
          </div>
        </motion.button>

        {/* Botón Sobre Nosotros */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          onClick={() => setMostrarSobreNosotros(true)}
          className="bg-white text-primary rounded-xl w-16 h-16 flex items-center justify-center shadow-lg cursor-pointer border-2 border-primary/20 hover:border-primary/40 transition-all duration-200"
        >
          <div className="text-center">
            <Users className="w-6 h-6 mb-1" />
            <div className="text-xs font-semibold">Nosotros</div>
          </div>
        </motion.button>
      </div>

      <div className="text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-2 text-primary">Eco-Notificaciones</h1>
        <p className="text-md md:text-lg text-gray-700">Tu asistente de notificaciones ecológicas</p>
      </div>

      <div className="w-full max-w-md mt-6">
        <h2 className="text-xl font-semibold mb-4 text-primary px-2">Recientes</h2>
        <div className="relative min-h-[80px]">
          <AnimatePresence mode="wait">
            {notificacionesRecientes.length > 1 && !expandidoRecientes ? (
              <motion.div
                key="stacked"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="cursor-pointer select-none"
                onClick={() => setExpandidoRecientes(true)}
              >
                {/* Stack visual */}
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 0.7, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.05 }}
                  className="absolute left-0 right-0 top-2 z-0 scale-95 blur-[1px]"
                >
                  <Notificacion {...notificacionesRecientes[1]} />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="relative z-10"
                >
                  <Notificacion {...notificacionesRecientes[0]} />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.2, delay: 0.15 }}
                  className="flex justify-center mt-2"
                >
                  <span className="text-xs text-gray-500">{notificacionesRecientes.length} notificaciones</span>
                </motion.div>
              </motion.div>
            ) : (
              <motion.div
                key="expanded"
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="space-y-3"
              >
                <AnimatePresence>
                  {notificacionesRecientes.map((n, i) => (
                    <motion.div
                      key={i}
                      layout
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ 
                        duration: 0.25, 
                        delay: i * 0.08,
                        ease: "easeOut"
                      }}
                    >
                      <Notificacion {...n} />
                    </motion.div>
                  ))}
                </AnimatePresence>
                {notificacionesRecientes.length > 1 && (
                  <motion.div
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25, delay: 0.2 }}
                    className="flex justify-center mt-2"
                  >
                    <button
                      className="text-xs text-primary underline hover:text-yellow transition cursor-pointer select-none"
                      onClick={() => setExpandidoRecientes(false)}
                    >
                      Contraer
                    </button>
                  </motion.div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="w-full max-w-md mt-6">
        <h2 className="text-xl font-semibold mb-4 text-primary px-2">Pasadas</h2>
        <div className="relative min-h-[80px]">
          <AnimatePresence mode="wait">
            {notificacionesPasadas.length > 1 && !expandidoPasadas ? (
              <motion.div
                key="stacked"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="cursor-pointer select-none"
                onClick={() => setExpandidoPasadas(true)}
              >
                {/* Stack visual */}
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 0.7, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.05 }}
                  className="absolute left-0 right-0 top-2 z-0 scale-95 blur-[1px]"
                >
                  <Notificacion {...notificacionesPasadas[1]} />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="relative z-10"
                >
                  <Notificacion {...notificacionesPasadas[0]} />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.2, delay: 0.15 }}
                  className="flex justify-center mt-2"
                >
                  <span className="text-xs text-gray-500">{notificacionesPasadas.length} notificaciones</span>
                </motion.div>
              </motion.div>
            ) : (
              <motion.div
                key="expanded"
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="space-y-3"
              >
                <AnimatePresence>
                  {notificacionesPasadas.map((n, i) => (
                    <motion.div
                      key={i}
                      layout
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ 
                        duration: 0.25, 
                        delay: i * 0.08,
                        ease: "easeOut"
                      }}
                    >
                      <Notificacion {...n} />
                    </motion.div>
                  ))}
                </AnimatePresence>
                {notificacionesPasadas.length > 1 && (
                  <motion.div
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25, delay: 0.2 }}
                    className="flex justify-center mt-2"
                  >
                    <button
                      className="text-xs text-primary underline hover:text-yellow transition cursor-pointer select-none"
                      onClick={() => setExpandidoPasadas(false)}
                    >
                      Contraer
                    </button>
                  </motion.div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.98 }}
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
        className="fixed bottom-[10%] right-[5%] bg-yellow text-white rounded-full w-24 h-24 flex items-center justify-center shadow-lg cursor-pointer text-3xl font-bold"
      >
        +
      </motion.button>

      {/* Modal ODS */}
      <AnimatePresence>
        {mostrarODS && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setMostrarODS(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="bg-white rounded-2xl w-full max-w-3xl shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header del Modal */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <div>
                  <h2 className="text-2xl font-bold text-primary">Objetivos de Desarrollo Sostenible</h2>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setMostrarODS(false)}
                  className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors duration-200"
                >
                  <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </motion.button>
              </div>

              {/* Contenido del Modal */}
              <div className="p-6">
                <div className="grid md:grid-cols-2 gap-6">
                  {/* ODS 11 */}
                  <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 border border-green-200 shadow-sm">
                    <div className="flex items-center mb-4">
                      <h3 className="text-lg font-bold text-green-800">ODS 11: Ciudades y Comunidades Sostenibles</h3>
                    </div>
                    <p className="text-sm text-gray-700 leading-relaxed mb-4">
                      Lograr que las ciudades y los asentamientos humanos sean inclusivos, seguros, 
                      resilientes y sostenibles. Incluye transporte público, espacios verdes, 
                      gestión de residuos y calidad del aire.
                    </p>
                    <div className="bg-white/70 rounded-lg p-3 border-l-4 border-green-500">
                      <p className="text-xs text-green-700 italic leading-relaxed">
                        El proyecto contribuye directamente al ODS 11 al promover hábitos ecológicos en un entorno urbano-universitario.
                      </p>
                    </div>
                  </div>

                  {/* ODS 12 */}
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-200 shadow-sm">
                    <div className="flex items-center mb-4">
                      <h3 className="text-lg font-bold text-blue-800">ODS 12: Producción y Consumo Responsables</h3>
                    </div>
                    <p className="text-sm text-gray-700 leading-relaxed mb-4">
                      Garantizar modalidades de consumo y producción sostenibles. Reduce el desperdicio 
                      de alimentos, promueve el reciclaje y fomenta prácticas empresariales sostenibles.
                    </p>
                    <div className="bg-white/70 rounded-lg p-3 border-l-4 border-blue-500">
                      <p className="text-xs text-blue-700 italic leading-relaxed">
                        El proyecto contribuye directamente al ODS 12 al incentivar un uso más consciente de los recursos y una reducción de residuos.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modal Sobre Nosotros */}
      <AnimatePresence>
        {mostrarSobreNosotros && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setMostrarSobreNosotros(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="bg-white rounded-2xl w-full max-w-2xl shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header del Modal */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <div>
                  <h2 className="text-2xl font-bold text-primary">Sobre Nosotros</h2>
                  <p className="text-gray-600 mt-1">Equipo de Desarrollo</p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setMostrarSobreNosotros(false)}
                  className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors duration-200"
                >
                  <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </motion.button>
              </div>

              {/* Contenido del Modal */}
              <div className="p-6">
                <div className="space-y-6">
                  {/* Proyecto */}
                  <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-xl p-6 border border-primary/20">
                    <h3 className="text-lg font-bold text-primary mb-3">Eco-Notificaciones</h3>
                    <p className="text-sm text-gray-700 leading-relaxed mb-3">
                      Una aplicación innovadora diseñada para promover hábitos sostenibles en el entorno universitario. 
                      Nuestro objetivo es crear conciencia ambiental y facilitar la adopción de prácticas ecológicas 
                      a través de notificaciones inteligentes y personalizadas.
                    </p>
                    <div className="text-xs text-primary font-medium">
                      Tecnologías: Next.js, TypeScript, Tailwind CSS, Framer Motion
                    </div>
                  </div>

                  {/* Integrantes */}
                  <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 border border-green-200">
                    <h3 className="text-lg font-bold text-green-800 mb-4">Integrantes del Equipo</h3>
                    <div className="space-y-3">
                      <div className="flex items-center p-3 bg-white/70 rounded-lg border border-green-200">
                        <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center mr-3">
                          <span className="text-white font-semibold text-sm">JM</span>
                        </div>
                        <div>
                          <div className="font-semibold text-green-800">Juan Márquez</div>
                        </div>
                      </div>
                      
                      <div className="flex items-center p-3 bg-white/70 rounded-lg border border-green-200">
                        <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center mr-3">
                          <span className="text-white font-semibold text-sm">AP</span>
                        </div>
                        <div>
                          <div className="font-semibold text-green-800">Alfonso Palma</div>
                        </div>
                      </div>
                      
                      <div className="flex items-center p-3 bg-white/70 rounded-lg border border-green-200">
                        <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center mr-3">
                          <span className="text-white font-semibold text-sm">MS</span>
                        </div>
                        <div>
                          <div className="font-semibold text-green-800">María Sandoval</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

if (Notification.permission === 'default') {
  Notification.requestPermission().then(permission => {
    if (permission === 'granted') {
      console.log('Permiso de notificaciones concedido');
    }
  });
}

// Crear y mostrar la notificación (dentro de una función o evento)
function mostrarNotificacion() {
  if (Notification.permission === 'granted') {
    const title = '¡Hola!';
    const options = {
      body: 'Esta es una notificación de prueba',
      icon: 'icono.png',
      tag: 'notificacion-prueba'
    };
    const notification = new Notification(title, options);

    // Manejar el clic en la notificación
    notification.addEventListener('click', () => {
      window.open('https://www.ejemplo.com', '_blank'); // Redirigir a una URL
      notification.close(); // Cerrar la notificación
    });
  }
}