"use client";
import { motion } from "framer-motion";

interface BotonAgregarEventoProps {
  onClick: () => void;
}

export default function BotonAgregarEvento({ onClick }: BotonAgregarEventoProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.3 }}
      className="fixed bottom-[10%] right-[5%] bg-yellow text-white rounded-full w-24 h-24 flex items-center justify-center shadow-lg cursor-pointer text-3xl font-bold"
      onClick={onClick}
    >
      +
    </motion.button>
  );
} 