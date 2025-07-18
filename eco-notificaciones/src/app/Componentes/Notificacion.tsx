import React from "react";

interface NotificacionProps {
  titulo: string;
  descripcion: string;
  hora: string;
  tiempo: string;
  colorEstado: string; 
  opacidad?: string;
  onRemove?: () => void;
  expandida?: boolean;
}

const Notificacion: React.FC<NotificacionProps> = ({
  titulo,
  descripcion,
  hora,
  tiempo,
  colorEstado,
  opacidad = "",
  onRemove,
  expandida = false
}) => {
  return (
    <div className={`text-secundary bg-white/20 backdrop-blur-lg rounded-2xl shadow-lg border border-white/30 p-4 hover:shadow-xl transition-all duration-200 cursor-pointer ${opacidad}`}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-1">
            <div className={`w-2 h-2 ${colorEstado} rounded-full`}></div>
            <span className="text-sm text-gray-500">{tiempo}</span>
          </div>
          <h3 className="font-medium text-gray-900 mb-1">{titulo}</h3>
          <p className="text-sm text-gray-600">{descripcion}</p>
        </div>
        <div className="flex flex-col items-end space-y-1">
          <span className="text-xs text-gray-400">{hora}</span>
          {expandida && onRemove && (
            <button
              type="button"
              onClick={onRemove}
              className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 group cursor-pointer"
              tabIndex={0}
              aria-label="Eliminar notificación"
            >
              <svg className="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 20 20">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 6l8 8M6 14L14 6" />
              </svg>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Notificacion; 