"use client";
import { motion, AnimatePresence } from "framer-motion";

interface ModalODSProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ModalODS({ isOpen, onClose }: ModalODSProps) {
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
                onClick={onClose}
                className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors duration-200 cursor-pointer"
              >
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </motion.button>
            </div>
            <div className="p-6">
              <div className="grid md:grid-cols-2 gap-6">
                {/* ODS 11 */}
                <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                  <div className="flex items-center mb-4">
                    <h3 className="text-lg font-bold text-green-800">ODS 11: Ciudades y Comunidades Sostenibles</h3>
                  </div>
                  <p className="text-sm text-gray-700 leading-relaxed mb-4">
                    Lograr que las ciudades y los asentamientos humanos sean inclusivos, seguros, 
                    resilientes y sostenibles. Incluye transporte público, espacios verdes, 
                    gestión de residuos y calidad del aire.
                  </p>
                  <div className="bg-gray-50 rounded-lg p-3">
                    <p className="text-xs text-green-700 italic leading-relaxed">
                      El proyecto contribuye directamente al ODS 11 al promover hábitos ecológicos en un entorno urbano-universitario.
                    </p>
                  </div>
                </div>

                {/* ODS 12 */}
                <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                  <div className="flex items-center mb-4">
                    <h3 className="text-lg font-bold text-blue-800">ODS 12: Producción y Consumo Responsables</h3>
                  </div>
                  <p className="text-sm text-gray-700 leading-relaxed mb-4">
                    Garantizar modalidades de consumo y producción sostenibles. Reduce el desperdicio 
                    de alimentos, promueve el reciclaje y fomenta prácticas empresariales sostenibles.
                  </p>
                  <div className="bg-gray-50 rounded-lg p-3">
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
  );
} 