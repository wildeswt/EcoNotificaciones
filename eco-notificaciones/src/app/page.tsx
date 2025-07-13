"use client";
import Image from "next/image";
import Notificacion from "./Notificacion";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Leaf, Users } from "lucide-react";
import BotonODS from "./BotonODS";
import BotonSobreNosotros from "./BotonSobreNosotros";
import BotonAgregarEvento from "./BotonAgregarEvento";
import ModalODS from "./ModalODS";
import ModalSobreNosotros from "./ModalSobreNosotros";
import ModalAgregarEvento from "./ModalAgregarEvento";

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
  const [mostrarODS, setMostrarODS] = useState(false);
  const [mostrarSobreNosotros, setMostrarSobreNosotros] = useState(false);
  const [mostrarAgregarEvento, setMostrarAgregarEvento] = useState(false);
  const [recientes, setRecientes] = useState(notificacionesRecientes);
  const [pasadas, setPasadas] = useState(notificacionesPasadas);

  useEffect(() => {
    if (typeof window !== "undefined" && "Notification" in window) {
      if (Notification.permission === "default") {
        Notification.requestPermission().then(permission => {
          if (permission === "granted") {
            mostrarNotificacion();
          }
        });
      } else if (Notification.permission === "granted") {
        mostrarNotificacion();
      }
    }
  }, []);

  // Función para eliminar notificación reciente
  function eliminarNotificacionReciente(idx: number) {
    setRecientes(prev => prev.filter((_, i) => i !== idx));
  }
  // Función para eliminar notificación pasada
  function eliminarNotificacionPasada(idx: number) {
    setPasadas(prev => prev.filter((_, i) => i !== idx));
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 relative overflow-hidden">
      {/* Fondo animado */}
      <motion.div
        className="absolute inset-0"
        animate={{
          background: [
            "radial-gradient(circle at 0% 0%, #bbf7d0 0%, transparent 50%), radial-gradient(circle at 100% 0%, #dcfce7 0%, transparent 50%), radial-gradient(circle at 0% 100%, #bbf7d0 0%, transparent 50%), radial-gradient(circle at 100% 100%, #dcfce7 0%, transparent 50%)",
            "radial-gradient(circle at 20% 20%, #dcfce7 0%, transparent 50%), radial-gradient(circle at 80% 20%, #bbf7d0 0%, transparent 50%), radial-gradient(circle at 20% 80%, #dcfce7 0%, transparent 50%), radial-gradient(circle at 80% 80%, #bbf7d0 0%, transparent 50%)",
            "radial-gradient(circle at 40% 40%, #bbf7d0 0%, transparent 50%), radial-gradient(circle at 60% 40%, #dcfce7 0%, transparent 50%), radial-gradient(circle at 40% 60%, #bbf7d0 0%, transparent 50%), radial-gradient(circle at 60% 60%, #dcfce7 0%, transparent 50%)",
            "radial-gradient(circle at 0% 0%, #bbf7d0 0%, transparent 50%), radial-gradient(circle at 100% 0%, #dcfce7 0%, transparent 50%), radial-gradient(circle at 0% 100%, #bbf7d0 0%, transparent 50%), radial-gradient(circle at 100% 100%, #dcfce7 0%, transparent 50%)",
          ]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <div className="w-[50vw] h-[80vh] bg-white z-20 rounded-2xl shadow-xl inset-ring-2 p-6">
        {/* Contenido principal */}
        <div className="relative z-10 flex flex-col items-center justify-center w-full">
        {/* Botones laterales - Posicionados a la izquierda */}
        <div className="fixed top-[10%] left-[5%] flex flex-col space-y-3">
          <BotonODS onClick={() => setMostrarODS(true)} />
          <BotonSobreNosotros onClick={() => setMostrarSobreNosotros(true)} />
        </div>

        <div className="text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-2 text-primary">Eco-Notificaciones</h1>
          <p className="text-md md:text-lg text-gray-700">Tu asistente de notificaciones ecológicas</p>
        </div>

        <div className="w-full max-w-md mt-6">
          <h2 className="text-xl font-semibold mb-4 text-primary px-2">Recientes</h2>
          <div className="relative min-h-[80px]">
            <AnimatePresence mode="wait">
              {recientes.length > 1 && !expandidoRecientes ? (
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
                    <Notificacion {...recientes[1]} expandida={false} />
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="relative z-10"
                  >
                    <Notificacion {...recientes[0]} expandida={false} />
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.2, delay: 0.15 }}
                    className="flex justify-center mt-2"
                  >
                    <span className="text-xs text-gray-500">{recientes.length} notificaciones</span>
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
                    {recientes.map((n, i) => (
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
                        <Notificacion {...n} onRemove={() => eliminarNotificacionReciente(i)} expandida={true} />
                      </motion.div>
                    ))}
                  </AnimatePresence>
                  {recientes.length > 1 && (
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
              {pasadas.length > 1 && !expandidoPasadas ? (
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
                    <Notificacion {...pasadas[1]} expandida={false} />
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="relative z-10"
                  >
                    <Notificacion {...pasadas[0]} expandida={false} />
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.2, delay: 0.15 }}
                    className="flex justify-center mt-2"
                  >
                    <span className="text-xs text-gray-500">{pasadas.length} notificaciones</span>
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
                    {pasadas.map((n, i) => (
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
                        <Notificacion {...n} onRemove={() => eliminarNotificacionPasada(i)} expandida={true} />
                      </motion.div>
                    ))}
                  </AnimatePresence>
                  {pasadas.length > 1 && (
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

                <BotonAgregarEvento onClick={() => setMostrarAgregarEvento(true)} />

        {/* Modales */}
        <ModalODS isOpen={mostrarODS} onClose={() => setMostrarODS(false)} />
        <ModalSobreNosotros isOpen={mostrarSobreNosotros} onClose={() => setMostrarSobreNosotros(false)} />
        <ModalAgregarEvento isOpen={mostrarAgregarEvento} onClose={() => setMostrarAgregarEvento(false)} />
        </div>
      </div>
    </div>
  );
}

function mostrarNotificacion() {
  const title = "¡Hola!";
  const options = {
    body: "Esta es una notificación de prueba",
    icon: "/icono.png",
    tag: "notificacion-prueba"
  };
  const notification = new Notification(title, options);

  notification.addEventListener("click", () => {
    window.open("https://www.ejemplo.com", "_blank");
    notification.close();
  });
}