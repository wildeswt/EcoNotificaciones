"use client";
import { motion, AnimatePresence } from "framer-motion";
import { postEvent } from "../apiEvents";
import { useState } from "react";

interface ModalAgregarEventoProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ModalAgregarEvento({ isOpen, onClose }: ModalAgregarEventoProps) {
  
  const [nombre_ev, setNombreEv] = useState("");
  const [descripcion_ev, setDescripcionEv] = useState("");
  const [tipo_ev, setTipoEv] = useState("");
  

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="bg-white rounded-2xl w-full max-w-md shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header del Modal */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div>
                <h2 className="text-2xl font-bold text-primary">Agregar Evento</h2>
                <p className="text-gray-600 mt-1">Crear nueva notificación ecológica</p>
              </div>
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors duration-200 cursor-pointer"
              >
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </motion.button>
            </div>

            {/* Contenido del Modal */}
            <div className="p-6">
              <div className="space-y-4">
                {/* Título */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Título del evento
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Ej: Recordatorio de reciclaje"
                    value={nombre_ev}
                    onChange={(e) => setNombreEv(e.target.value)}
                  />
                </div>

                {/* Descripción */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Descripción
                  </label>
                  <textarea
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
                    rows={3}
                    placeholder="Describe el evento o notificación..."
                    value={descripcion_ev}
                    onChange={(e) => setDescripcionEv(e.target.value)}
                  />
                </div>

                {/* Tipo de evento */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tipo de evento
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    value={tipo_ev}
                    onChange={(e) => setTipoEv(e.target.value)}
                  >
                    <option value="">Seleccionar tipo</option>
                    <option value="reciclaje">Reciclaje</option>
                    <option value="energia">Ahorro de energía</option>
                    <option value="agua">Ahorro de agua</option>
                    <option value="transporte">Transporte sostenible</option>
                    <option value="otros">Otros</option>
                  </select>
                </div>

                {/* Botones */}
                <div className="flex space-x-3 pt-4">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={onClose}
                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                  >
                    Cancelar
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200"
                    onClick={() => {
                      try {
                        const nuevaNotificacion = {
                          id: "e005",
                          name: nombre_ev,
                          date: "2025-07-05",
                          time: "09:00 AM - 04:00 PM",
                          location: "Plaza Central de la Universidad",
                          description: descripcion_ev,
                          category: tipo_ev,
                        };
                        setNombreEv("");
                        setDescripcionEv("");
                        setTipoEv("");
                        postEvent(nuevaNotificacion);
                        onClose();
                      }
                      catch (error) {
                        console.error("Error al crear el evento:", error);
                      }
                    }}
                  >
                    Crear Evento
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
} 