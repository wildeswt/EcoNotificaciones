"use client";
import Notificacion from "./Componentes/Notificacion";
import { useState, useEffect } from "react";
import { fetchEvents} from "./apiEvents";
import { motion, AnimatePresence } from "framer-motion";
import BotonODS from "./Componentes/BotonODS";
import BotonSobreNosotros from "./Componentes/BotonSobreNosotros";
import BotonAgregarEvento from "./Componentes/BotonAgregarEvento";
import ModalODS from "./Componentes/ModalODS";
import ModalSobreNosotros from "./Componentes/ModalSobreNosotros";
import ModalAgregarEvento from "./Componentes/ModalAgregarEvento";

// Utilidad para formatear la fecha de hoy en formato 'YYYY-MM-DD'
function getTodayString() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

// --- TIPS AUTOMÁTICOS SISTÉMICOS ---

// Devuelve una lista de tips activos según el día y la hora actual
function getSystemTips(): any[] {
  const ahora = new Date();
  const diaSemana = ahora.getDay(); // 0: domingo, 1: lunes, ...
  const minutosAhora = ahora.getHours() * 60 + ahora.getMinutes();
  const tips: any[] = [];

  // Lunes a las 8:00 AM
  if (diaSemana === 1 && minutosAhora >= 8 * 60 && minutosAhora < 8 * 60 + 10) {
    tips.push({
      titulo: "Recuerda usar bolsas reutilizables",
      descripcion: "¡Haz tu parte por el planeta!",
      hora: "08:00 AM",
      tiempo: "Hoy",
      colorEstado: "bg-yellow-500",
      opacidad: "",
    });
  }
  // Viernes a las 7:30 AM
  if (diaSemana === 7 && minutosAhora >= 7 * 60 + 30 && minutosAhora < 7 * 60 + 40) {
    tips.push({
      titulo: "Hoy es un buen día para usar bicicleta",
      descripcion: "Reduce tu huella de carbono y haz ejercicio.",
      hora: "07:30 AM",
      tiempo: "Hoy",
      colorEstado: "bg-green-500",
      opacidad: "",
    });
  }
  // Domingo a las 5:37 PM
  if (diaSemana === 0 && minutosAhora >= 17 * 60 + 37 && minutosAhora < 17 * 60 + 40) {
    tips.push({
      titulo: "Domingo ecológico: ¡Desconecta aparatos que no uses!",
      descripcion: "Aprovecha el domingo para ahorrar energía en casa.",
      hora: "05:37 PM",
      tiempo: "Hoy",
      colorEstado: "bg-yellow-500",
      opacidad: "",
    });
  }
  // Puedes agregar más tips aquí...

  return tips;
}

export default function Home() {
  const [expandidoRecientes, setExpandidoRecientes] = useState(false);
  const [expandidoPasadas, setExpandidoPasadas] = useState(false);
  const [mostrarODS, setMostrarODS] = useState(false);
  const [mostrarSobreNosotros, setMostrarSobreNosotros] = useState(false);
  const [mostrarAgregarEvento, setMostrarAgregarEvento] = useState(false);
  const [recientes, setRecientes] = useState<any[]>([]);
  const [pasadas, setPasadas] = useState<any[]>([]);

type Evento = {
  id: string;
  name: string;
  date: string;
  time: string;
  location: string;
  description: string;
  category: string;
};



  // --- UTILIDADES Y LISTENERS DE EVENTOS TEMPORALES (POE) ---

  // Convierte una hora string a minutos desde medianoche (soporta 24h y 12h AM/PM)
  function horaStringAMinutos(horaStr: string): number {
    let hora = 0, minutos = 0;
    let ampm = '';
    const original = horaStr;
    horaStr = horaStr.trim();
    if (/am|pm/i.test(horaStr)) {
      [hora, minutos] = horaStr.replace(/\s?(AM|PM|am|pm)/i, '').split(':').map(Number);
      ampm = /pm/i.test(original) ? 'PM' : 'AM';
      if (ampm === 'PM' && hora !== 12) hora += 12;
      if (ampm === 'AM' && hora === 12) hora = 0;
    } else {
      [hora, minutos] = horaStr.split(':').map(Number);
    }
    return hora * 60 + minutos;
  }

  // Listener: ¿Es evento de todo el día?
  function esTodoElDia(e: Evento): boolean {
    const t = e.time.trim().toLowerCase();
    return t === 'todo el día' || t === 'todo el dia';
  }

  // Listener: ¿El evento está en curso (reciente)?
  function esEventoReciente(e: Evento, hoy: string, minutosAhora: number): boolean {
    if (e.date !== hoy) return false;
    if (esTodoElDia(e)) return true;
    if (!e.time.includes('-')) return false;
    const [inicio, fin] = e.time.split('-').map(s => s.trim());
    const minInicio = horaStringAMinutos(inicio);
    const minFin = horaStringAMinutos(fin);
    return minutosAhora >= minInicio && minutosAhora <= minFin;
  }

  // Listener: ¿El evento ya terminó (pasado)?
  function esEventoPasado(e: Evento, hoy: string, minutosAhora: number): boolean {
    if (e.date < hoy) return true;
    if (e.date !== hoy) return false;
    if (esTodoElDia(e)) return false;
    if (!e.time.includes('-')) return false;
    const [inicio, fin] = e.time.split('-').map(s => s.trim());
    const minFin = horaStringAMinutos(fin);
    return minutosAhora > minFin;
  }

  // --- SCHEDULER: EMISOR DE EVENTOS TEMPORALES (POE) ---
  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    // Scheduler: revisa el estado de los eventos cada minuto
    async function scheduler() {
      try {
        const eventos: Evento[] = await fetchEvents();
        const hoy = getTodayString();
        const ahora = new Date();
        const minutosAhora = ahora.getHours() * 60 + ahora.getMinutes();

        // Listeners: clasifican los eventos según la hora
        const recientesEventos = eventos.filter(e => esEventoReciente(e, hoy, minutosAhora)).map(e => ({
          titulo: e.name,
          descripcion: `${e.description}\nLugar: ${e.location}`,
          hora: e.time,
          tiempo: 'Hoy',
          colorEstado: e.category === 'reciclaje' ? 'bg-green-500' : 'bg-yellow-500',
          opacidad: '',
        }));

        // --- TIPS AUTOMÁTICOS SISTÉMICOS ---
        const tips = getSystemTips();
        // Combina tips automáticos con notificaciones recientes del usuario
        setRecientes([...tips, ...recientesEventos]);

        const pasadasEventos = eventos.filter(e => esEventoPasado(e, hoy, minutosAhora)).map(e => {
          const mostrarFecha = e.date < hoy;
          return {
            titulo: e.name,
            descripcion: `${e.description}\nLugar: ${e.location}`,
            hora: mostrarFecha ? e.date : e.time,
            tiempo: 'Pasado',
            colorEstado: 'bg-gray-400',
            opacidad: 'opacity-75',
          };
        });

        setPasadas(pasadasEventos);
      } catch (error) {
        console.error('Error al cargar eventos:', error);
      }
    }

    scheduler();
    intervalId = setInterval(scheduler, 20000); // Scheduler: cada minuto
    return () => clearInterval(intervalId);
  }, [mostrarAgregarEvento]);

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
      {/* Fondo de imagen */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          zIndex: 0,
          backgroundImage: "url(/Assets/hojas.jpg)",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.7, // un poco más visible para el filtro
          pointerEvents: "none",
          filter: "brightness(0.7) blur(2px)", // oscurece y desenfoca
        }}
      />
      {/* Botones laterales - Posicionados a la izquierda */}
      <div className="fixed top-[10%] left-[5%] flex flex-col space-y-3 z-30">
        <BotonODS onClick={() => setMostrarODS(true)} />
        <BotonSobreNosotros onClick={() => setMostrarSobreNosotros(true)} />
      </div>

      <div className="w-[50vw] h-[90vh] bg-white/90 backdrop-blur-xl z-20 rounded-3xl shadow-2xl border border-primary/20 p-8 relative overflow-hidden card-glow transition-all duration-300 flex flex-col justify-center  items-center">
        {/* Efecto de gradiente interno */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/80 via-white/60 to-green-50/30 rounded-3xl"></div>
        {/* Efecto de borde brillante */}
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-green-400/20 via-transparent to-green-400/20 opacity-50"></div>
        {/* Contenido principal */}
        <div className="relative z-10 flex flex-col items-center justify-center w-full h-full">

        <div
          className="text-center mb-8 sticky top-0 z-20 pt-2 pb-4 w-full"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-3 text-primary bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent">
            Eco-Notificaciones
          </h1>
          <p className="text-lg md:text-xl text-gray-600 font-medium">
            Tu asistente de notificaciones ecológicas
          </p>
        </div>

        <div className="w-full max-w-md mt-6">
          <h2 className="text-xl font-semibold mb-4 text-primary px-2 flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            Recientes
          </h2>
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
                  onClick={() => {
                    setExpandidoRecientes(true);
                    setExpandidoPasadas(false);
                  }}
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
                  className="max-h-48 overflow-y-auto space-y-3 pr-2"
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
          <h2 className="text-xl font-semibold mb-4 text-primary px-2 flex items-center gap-2">
            <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
            Pasadas
          </h2>
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
                  onClick={() => {
                    setExpandidoPasadas(true);
                    setExpandidoRecientes(false);
                  }}
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
                  className="max-h-48 overflow-y-auto space-y-3 pr-2"
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
        </div>
      </div>

      {/* Botón de agregar evento - Posicionado a la derecha */}
      <div className="fixed top-[10%] right-[5%] z-30">
        <BotonAgregarEvento onClick={() => setMostrarAgregarEvento(true)} />
      </div>

      {/* Modales */}
      <ModalODS isOpen={mostrarODS} onClose={() => setMostrarODS(false)} />
      <ModalSobreNosotros isOpen={mostrarSobreNosotros} onClose={() => setMostrarSobreNosotros(false)} />
      <ModalAgregarEvento isOpen={mostrarAgregarEvento} onClose={() => {setMostrarAgregarEvento(false) }} />
    </div>
  );
}