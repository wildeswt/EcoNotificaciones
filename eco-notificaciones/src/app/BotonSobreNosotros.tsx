import { Users } from "lucide-react";
import { motion } from "framer-motion";
import React from "react";

interface BotonSobreNosotrosProps {
  onClick?: () => void;
  className?: string;
}

const BotonSobreNosotros: React.FC<BotonSobreNosotrosProps> = ({ onClick, className = "" }) => (
  <motion.button
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.4, delay: 0.3 }}
    onClick={onClick}
    className={`bg-white text-primary rounded-xl w-16 h-16 flex items-center justify-center shadow-lg cursor-pointer border-2 border-primary/20 hover:border-primary/40 transition-all duration-200 ${className}`}
  >
    <div className="text-center">
      <Users className="w-6 h-6 mb-1" />
      <div className="text-xs font-semibold">Nosotros</div>
    </div>
  </motion.button>
);

export default BotonSobreNosotros; 