import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-beige p-4">
      <div className="text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-2 text-primary">Eco-Notificaciones</h1>
        <p className="text-md md:text-lg text-gray-700">Tu asistente de notificaciones ecológicas</p>
      </div>

      <div className="bg-light text-primary rounded-xl shadow-md p-6 mt-6 w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Recientes</h2>
        <ul className="space-y-2">
          <li className="flex items-center space-x-2">
            <input type="checkbox" className="w-5 h-5" />
            <span>Notificación reciente 1</span>
          </li>
          <li className="flex items-center space-x-2">
            <input type="checkbox" className="w-5 h-5" />
            <span>Notificación reciente 2</span>
          </li>
        </ul>
      </div>

      <div className="bg-light text-primary rounded-xl shadow-md p-6 mt-6 w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Pasadas</h2>
        <ul className="space-y-2">
          <li className="flex items-center space-x-2">
            <input type="checkbox" className="w-5 h-5" />
            <span>Notificación pasada 1</span>
          </li>
          <li className="flex items-center space-x-2">
            <input type="checkbox" className="w-5 h-5" />
            <span>Notificación pasada 2</span>
          </li>
          <li className="flex items-center space-x-2">
            <input type="checkbox" className="w-5 h-5" />
            <span>Notificación pasada 3</span>
          </li>
        </ul>
      </div>

      <button className="fixed bottom-6 right-6 bg-yellow text-white rounded-full p-4 shadow-lg transition">+</button>
    </div>
  );
}