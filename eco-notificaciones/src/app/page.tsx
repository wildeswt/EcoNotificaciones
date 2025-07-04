"use client";
import Image from "next/image";
import Notificacion from "./Notificacion";
import { useState } from "react";

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
          {notificacionesRecientes.length > 1 && !expandidoRecientes ? (
            <div className="cursor-pointer select-none" onClick={() => setExpandidoRecientes(true)}>
              {/* Stack visual */}
              <div className="absolute left-0 right-0 top-2 z-0 scale-95 blur-[1px] opacity-70">
                <Notificacion {...notificacionesRecientes[1]} />
              </div>
              <div className="relative z-10">
                <Notificacion {...notificacionesRecientes[0]} />
              </div>
              <div className="flex justify-center mt-2">
                <span className="text-xs text-gray-500">{notificacionesRecientes.length} notificaciones</span>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              {notificacionesRecientes.map((n, i) => (
                <Notificacion key={i} {...n} />
              ))}
              {notificacionesRecientes.length > 1 && (
                <div className="flex justify-center mt-2">
                  <button
                    className="text-xs text-primary underline hover:text-yellow transition"
                    onClick={() => setExpandidoRecientes(false)}
                  >
                    Contraer
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="w-full max-w-md mt-6">
        <h2 className="text-xl font-semibold mb-4 text-primary px-2">Pasadas</h2>
        <div className="relative min-h-[80px]">
          {notificacionesPasadas.length > 1 && !expandidoPasadas ? (
            <div className="cursor-pointer select-none" onClick={() => setExpandidoPasadas(true)}>
              {/* Stack visual */}
              <div className="absolute left-0 right-0 top-2 z-0 scale-95 blur-[1px] opacity-70">
                <Notificacion {...notificacionesPasadas[1]} />
              </div>
              <div className="relative z-10">
                <Notificacion {...notificacionesPasadas[0]} />
              </div>
              <div className="flex justify-center mt-2">
                <span className="text-xs text-gray-500">{notificacionesPasadas.length} notificaciones</span>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              {notificacionesPasadas.map((n, i) => (
                <Notificacion key={i} {...n} />
              ))}
              {notificacionesPasadas.length > 1 && (
                <div className="flex justify-center mt-2">
                  <button
                    className="text-xs text-primary underline hover:text-yellow transition"
                    onClick={() => setExpandidoPasadas(false)}
                  >
                    Contraer
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <button className="fixed bottom-[10%] right-[5%] bg-yellow text-white rounded-full w-24 h-24 flex items-center justify-center shadow-lg transition hover:scale-105 cursor-pointer text-3xl font-bold">+</button>
    </div>
  );
}