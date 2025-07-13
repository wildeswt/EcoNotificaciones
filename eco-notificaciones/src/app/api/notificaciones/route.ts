import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';


const filePath = path.join(process.cwd(), 'data', 'notificaciones.json');


export async function GET() {
  const data = await fs.readFile(filePath, 'utf-8');
  return NextResponse.json(JSON.parse(data));
}

export async function POST(request: Request) {
  try {
    const nuevaNotificacion = await request.json();
    const data = await fs.readFile(filePath, 'utf-8');
    const notificaciones = JSON.parse(data);
    notificaciones.push(nuevaNotificacion);
    await fs.writeFile(filePath, JSON.stringify(notificaciones, null, 2), 'utf-8');
    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  }
}