import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import { logAction } from '../../utils/logger';

const filePath = path.join(process.cwd(), 'data', 'notificaciones.json');

export async function GET() {
  try {
    logAction('Solicitud GET de notificaciones', { endpoint: '/api/notificaciones' }, true);
    
    const data = await fs.readFile(filePath, 'utf-8');
    const notificaciones = JSON.parse(data);
    
    logAction('Notificaciones obtenidas exitosamente', { 
      count: notificaciones.length,
      notificaciones: notificaciones.map((n: any) => ({ id: n.id, name: n.name, category: n.category }))
    }, true);
    
    return NextResponse.json(notificaciones);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    logAction('Error al obtener notificaciones', { 
      endpoint: '/api/notificaciones',
      error: errorMessage 
    }, false, errorMessage);
    
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const nuevaNotificacion = await request.json();
    
    logAction('Solicitud POST de nueva notificación', { 
      endpoint: '/api/notificaciones',
      notificacion: nuevaNotificacion 
    }, true);
    
    const data = await fs.readFile(filePath, 'utf-8');
    const notificaciones = JSON.parse(data);
    notificaciones.push(nuevaNotificacion);
    
    await fs.writeFile(filePath, JSON.stringify(notificaciones, null, 2), 'utf-8');
    
    logAction('Notificación creada exitosamente', { 
      notificacion: nuevaNotificacion,
      totalNotificaciones: notificaciones.length 
    }, true);
    
    return NextResponse.json({ ok: true });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    logAction('Error al crear notificación', { 
      endpoint: '/api/notificaciones',
      error: errorMessage 
    }, false, errorMessage);
    
    return NextResponse.json({ ok: false, error: errorMessage }, { status: 500 });
  }
}