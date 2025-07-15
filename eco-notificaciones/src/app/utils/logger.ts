export interface LogEntry {
  timestamp: string;
  action: string;
  details: any;
  success: boolean;
  error?: string;
}

class Logger {
  private static instance: Logger;
  private logs: LogEntry[] = [];

  private constructor() {}

  static getInstance(): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger();
    }
    return Logger.instance;
  }

  // Método principal para registrar acciones
  log(action: string, details: any, success: boolean = true, error?: string) {
    const logEntry: LogEntry = {
      timestamp: new Date().toISOString(),
      action,
      details,
      success,
      error
    };

    this.logs.push(logEntry);
    
    this.printToConsole(logEntry);
  }

  private printToConsole(logEntry: LogEntry) {
    const timestamp = new Date(logEntry.timestamp).toLocaleString('es-ES');
    const status = logEntry.success ? '✅' : '❌';
    const actionColor = logEntry.success ? '\x1b[32m' : '\x1b[31m'; // Verde para éxito, rojo para error
    const resetColor = '\x1b[0m';

    console.log(`${actionColor}${status} [${timestamp}] ${logEntry.action}${resetColor}`);
    // Mostrar detalles resumidos si es un array grande o un objeto con muchas claves
    if (Array.isArray(logEntry.details?.notificaciones)) {
      // Si es un array de notificaciones, mostrar solo cantidad y los títulos
      const resumen = logEntry.details.notificaciones.map((n: any) => n.name || n.titulo || n.id);
      console.log(`    Detalles: { notificaciones: [${resumen.length} elementos: ${resumen.slice(0,5).join(', ')}${resumen.length > 5 ? ', ...' : ''}] }`);
      // Mostrar otros detalles si existen
      const { notificaciones, ...otros } = logEntry.details;
      if (Object.keys(otros).length > 0) {
        console.log('    Otros detalles:', otros);
      }
    } else if (typeof logEntry.details === 'object' && logEntry.details !== null) {
      // Si es un objeto muy grande, mostrar solo las claves principales
      const claves = Object.keys(logEntry.details);
      if (claves.length > 6) {
        const resumen = claves.slice(0, 6).join(', ');
        console.log(`    Detalles: { claves: [${resumen}${claves.length > 6 ? ', ...' : ''}] }`);
      } else {
        console.log('    Detalles:', logEntry.details);
      }
    } else {
      console.log('    Detalles:', logEntry.details);
    }
    if (logEntry.error) {
      console.log(`     Error: ${logEntry.error}`);
    }
    console.log('');
  }

  // Obtener todos los logs
  getLogs(): LogEntry[] {
    return [...this.logs];
  }

  // Limpiar logs
  clearLogs() {
    this.logs = [];
  }
}

// Decorador para logging automático (Aspecto)
export function withLogging(target: any, propertyName: string, descriptor: PropertyDescriptor) {
  const method = descriptor.value;
  const logger = Logger.getInstance();

  descriptor.value = async function (...args: any[]) {
    const startTime = Date.now();
    const action = `${target.constructor.name}.${propertyName}`;
    
    try {
      // Log antes de la ejecución
      logger.log(`Iniciando ${action}`, { arguments: args }, true);
      
      // Ejecutar el método original
      const result = await method.apply(this, args);
      
      // Log después de la ejecución exitosa
      const executionTime = Date.now() - startTime;
      logger.log(`Completado ${action}`, { 
        result, 
        executionTime: `${executionTime}ms` 
      }, true);
      
      return result;
    } catch (error) {
      // Log en caso de error
      const executionTime = Date.now() - startTime;
      const errorMessage = error instanceof Error ? error.message : String(error);
      logger.log(`Error en ${action}`, { 
        arguments: args,
        executionTime: `${executionTime}ms` 
      }, false, errorMessage);
      
      throw error;
    }
  };

  return descriptor;
}

// Función helper para logging manual
export function logAction(action: string, details: any, success: boolean = true, error?: string) {
  const logger = Logger.getInstance();
  logger.log(action, details, success, error);
}

// Función para obtener el logger
export function getLogger(): Logger {
  return Logger.getInstance();
}

export default Logger; 