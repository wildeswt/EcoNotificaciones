"use client";
import Image from "next/image";
import Notificacion from "./Notificacion";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

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
  const [expandidoRecientes, setExpandidoRecientes] = useState(false);
  const [expandidoPasadas, setExpandidoPasadas] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-beige p-4">
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
    </div>
  );
}