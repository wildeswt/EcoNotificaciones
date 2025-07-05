import Image from "next/image";

export default function Home() {
  mostrarNotificacion();
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-2">Eco Notificaciones</h1>
        <p className="text-lg text-gray-700">Tu asistente de notificaciones ecológicas</p>
      </div>  
      <div className="card mt-8 p-6 bg-green-200 shadow-md rounded-lg max-w-md w-full">
        <ul>
          <li><input type="checkbox"></input> Elem 1</li>
          <li><input type="checkbox"></input> Elem 2</li>
          <li><input type="checkbox"></input> Elem 3</li>
          <li><input type="checkbox"></input> Elem 4</li>
          <li><input type="checkbox"></input> Elem 5</li>
        </ul>
      </div>
      <div className="card mt-8 p-6 bg-green-200 shadow-md rounded-lg max-w-md w-full">
        <ul>
          <li><input type="checkbox"></input> Elem 1</li>
          <li><input type="checkbox"></input> Elem 2</li>
          <li><input type="checkbox"></input> Elem 3</li>
          <li><input type="checkbox"></input> Elem 4</li>
          <li><input type="checkbox"></input> Elem 5</li>
        </ul>
      </div>
    </div>
  );
}

if (Notification.permission === 'default') {
  Notification.requestPermission().then(permission => {
    if (permission === 'granted') {
      console.log('Permiso de notificaciones concedido');
    }
  });
}

// Crear y mostrar la notificación (dentro de una función o evento)
function mostrarNotificacion() {
  if (Notification.permission === 'granted') {
    const title = '¡Hola!';
    const options = {
      body: 'Esta es una notificación de prueba',
      icon: 'icono.png',
      tag: 'notificacion-prueba'
    };
    const notification = new Notification(title, options);

    // Manejar el clic en la notificación
    notification.addEventListener('click', () => {
      window.open('https://www.ejemplo.com', '_blank'); // Redirigir a una URL
      notification.close(); // Cerrar la notificación
    });
  }
}