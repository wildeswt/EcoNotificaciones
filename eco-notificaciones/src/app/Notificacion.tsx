import React from "react";

interface NotificacionProps {
  titulo: string;
  descripcion: string;
  hora: string;
  tiempo: string;
  colorEstado: string; // Ejemplo: 'bg-green-500', 'bg-yellow-500', 'bg-gray-400'
  opacidad?: string; // Ejemplo: 'opacity-75'
}

const Notificacion: React.FC<NotificacionProps> = ({
  titulo,
  descripcion,
  hora,
  tiempo,
  colorEstado,
  opacidad = ""
}) => {
  return (
    <div className={`bg-white/40 backdrop-blur-md rounded-2xl shadow-sm border border-gray-100 p-4 hover:shadow-md transition-shadow cursor-pointer ${opacidad}`}>
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
          <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center">
            <svg className="w-3 h-3 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notificacion; 