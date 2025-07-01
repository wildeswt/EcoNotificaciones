import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-2"><a href="https://www.flaticon.com/free-icons/garden" title="garden icons">Garden icons created by C-mo Box - Flaticon</a>Eco Notificaciones</h1>
        <p className="text-lg text-gray-700">Tu asistente de notificaciones ecológicas</p>
      </div>  
      <div className="card mt-8 p-6 bg-green-200 shadow-md rounded-lg max-w-md w-full">
        <ul>
          <li><input type="checkbox"></input>  Elem 1</li>
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
