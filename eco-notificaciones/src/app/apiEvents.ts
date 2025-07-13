// apiEvents.ts

export async function fetchEvents() {
  return fetch('/api/notificaciones')
  .then((res )=> (res.json()))
  .catch((err)=> (console.error(err)))
} 


export async function postEvent(notificación:any) {
  return fetch('/api/notificaciones', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(notificación),
  })
  .then((res) => {
    if (!res.ok) {
      throw new Error('Error al agregar notificación');
    }
    return res.json();
  })
  .catch((error) => {
    console.error("Error al agregar notificación:", error);
  });
}

