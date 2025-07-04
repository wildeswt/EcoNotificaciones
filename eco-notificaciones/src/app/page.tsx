import Image from "next/image";
import Notificacion from "./Notificacion";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-beige p-4">
      <div className="text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-2 text-primary">Eco-Notificaciones</h1>
        <p className="text-md md:text-lg text-gray-700">Tu asistente de notificaciones ecológicas</p>
      </div>

      <div className="w-full max-w-md mt-6">
        <h2 className="text-xl font-semibold mb-4 text-primary px-2">Recientes</h2>
        <div className="space-y-3">
          <Notificacion
            titulo="Recordatorio de reciclaje"
            descripcion="Es hora de separar los residuos orgánicos"
            hora="12:30"
            tiempo="Ahora"
            colorEstado="bg-green-500"
          />
          <Notificacion
            titulo="Consumo de energía"
            descripcion="Tu consumo está 15% por encima del promedio"
            hora="12:25"
            tiempo="Hace 5 min"
            colorEstado="bg-yellow-500"
          />
        </div>
      </div>

      <div className="w-full max-w-md mt-6">
        <h2 className="text-xl font-semibold mb-4 text-primary px-2">Pasadas</h2>
        <div className="space-y-3">
          <Notificacion
            titulo="Agua ahorrada"
            descripcion="Has ahorrado 5L de agua hoy"
            hora="11:30"
            tiempo="Hace 1 hora"
            colorEstado="bg-gray-400"
            opacidad="opacity-75"
          />
          <Notificacion
            titulo="Transporte sostenible"
            descripcion="Has usado transporte público 3 veces esta semana"
            hora="10:30"
            tiempo="Hace 2 horas"
            colorEstado="bg-gray-400"
            opacidad="opacity-75"
          />
          <Notificacion
            titulo="Huella de carbono"
            descripcion="Tu huella de carbono se redujo 2kg esta semana"
            hora="09:30"
            tiempo="Hace 3 horas"
            colorEstado="bg-gray-400"
            opacidad="opacity-75"
          />
        </div>
      </div>

      <button className="fixed bottom-[10%] right-[5%] bg-yellow text-white rounded-full w-24 h-24 flex items-center justify-center shadow-lg transition hover:scale-105 cursor-pointer text-3xl font-bold">+</button>
    </div>
  );
}