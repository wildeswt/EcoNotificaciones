"use client";
import { motion, AnimatePresence } from "framer-motion";

interface ModalSobreNosotrosProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ModalSobreNosotros({ isOpen, onClose }: ModalSobreNosotrosProps) {
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
              <div className="space-y-6">
                {/* Proyecto */}
                <div>
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
                <div>
                  <h3 className="text-lg font-bold text-green-800 mb-4">Integrantes del Equipo</h3>
                  <div className="space-y-3">
                    <div className="flex items-center p-3 bg-gray-50 rounded-lg border border-gray-200">
                      <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center mr-3">
                        <span className="text-white font-semibold text-sm">JM</span>
                      </div>
                      <div>
                        <div className="font-semibold text-green-800">Juan Márquez</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center p-3 bg-gray-50 rounded-lg border border-gray-200">
                      <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center mr-3">
                        <span className="text-white font-semibold text-sm">AP</span>
                      </div>
                      <div>
                        <div className="font-semibold text-green-800">Alfonso Palma</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center p-3 bg-gray-50 rounded-lg border border-gray-200">
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
  );
} 