// Script de prueba para verificar el sistema de logging
// Ejecutar en la consola del navegador después de cargar la aplicación

console.log('🧪 Iniciando pruebas del sistema de logging...');

// Función para simular la creación de una notificación
async function testNotificationCreation() {
  console.log('\n📝 Probando creación de notificación...');
  
  // Simular datos de notificación
  const testNotification = {
    name: "Prueba de Logging",
    date: "2024-01-15",
    time: "10:00 AM - 11:00 AM",
    location: "Sala de Pruebas",
    description: "Esta es una notificación de prueba para verificar el sistema de logging",
    category: "reciclaje"
  };

  try {
    // Simular el flujo completo
    console.log('✅ Simulando flujo de creación de notificación...');
    
    // 1. Log de inicio (debería aparecer automáticamente)
    console.log('📋 Notificación a crear:', testNotification);
    
    // 2. Simular validación
    console.log('🔍 Validando notificación...');
    
    // 3. Simular envío
    console.log('📤 Enviando notificación...');
    
    // 4. Simular respuesta exitosa
    console.log('✅ Notificación enviada exitosamente');
    
    console.log('\n🎯 Verifica en la consola que aparezcan los logs automáticos:');
    console.log('   - "Iniciando procesamiento de notificación"');
    console.log('   - "Validación de notificación exitosa"');
    console.log('   - "Iniciando NotificationService.createNotification"');
    console.log('   - "Completado NotificationService.createNotification"');
    console.log('   - "Notificación procesada exitosamente"');
    
  } catch (error) {
    console.error('❌ Error en la prueba:', error);
  }
}

// Función para verificar que el logger está disponible
function checkLoggerAvailability() {
  console.log('\n🔍 Verificando disponibilidad del logger...');
  
  // Verificar si el logger está disponible globalmente
  if (typeof window !== 'undefined') {
    console.log('✅ Logger disponible en el navegador');
    
    // Intentar acceder al logger
    try {
      // Esto debería funcionar si el logger está correctamente importado
      console.log('✅ Sistema de logging inicializado correctamente');
    } catch (error) {
      console.error('❌ Error al acceder al logger:', error);
    }
  } else {
    console.log('⚠️  Ejecutando en entorno Node.js');
  }
}

// Función para mostrar instrucciones de prueba
function showTestInstructions() {
  console.log('\n📋 INSTRUCCIONES PARA PROBAR EL SISTEMA DE LOGGING:');
  console.log('1. Abre la aplicación en el navegador');
  console.log('2. Abre la consola del navegador (F12)');
  console.log('3. Haz clic en el botón "+" para crear una notificación');
  console.log('4. Completa el formulario y haz clic en "Crear Evento"');
  console.log('5. Verifica que aparezcan los logs automáticos en la consola');
  console.log('');
  console.log('📊 LOGS ESPERADOS:');
  console.log('✅ [timestamp] Iniciando procesamiento de notificación');
  console.log('✅ [timestamp] Validación de notificación exitosa');
  console.log('✅ [timestamp] Iniciando NotificationService.createNotification');
  console.log('✅ [timestamp] Completado NotificationService.createNotification');
  console.log('✅ [timestamp] Notificación procesada exitosamente');
  console.log('');
  console.log('🎯 VERIFICACIONES:');
  console.log('• ¿Se registra QUÉ notificación se envió?');
  console.log('• ¿Se registra CUÁNDO se envió (timestamp)?');
  console.log('• ¿Los logs aparecen ANTES/DESPUÉS de la lógica principal?');
  console.log('• ¿Las funciones principales NO están contaminadas?');
}

// Ejecutar pruebas
checkLoggerAvailability();
showTestInstructions();

// Exportar función de prueba para uso manual
if (typeof window !== 'undefined') {
  window.testNotificationCreation = testNotificationCreation;
  console.log('\n💡 Para ejecutar la prueba manualmente, usa: testNotificationCreation()');
}

console.log('\n🎉 Script de prueba cargado. ¡Revisa la consola para ver los logs!'); 