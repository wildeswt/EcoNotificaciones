"use client";
import { motion, AnimatePresence } from "framer-motion";
import { fetchEvents, createNotificationWithValidation } from "../apiEvents";
import { useState } from "react";
import { logAction } from "../utils/logger";

interface ModalAgregarEventoProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ModalAgregarEvento({ isOpen, onClose }: ModalAgregarEventoProps) {
  const [nombre_ev, setNombreEv] = useState("");
  const [descripcion_ev, setDescripcionEv] = useState("");
  const [tipo_ev, setTipoEv] = useState("");
  const [fecha_ev, setFechaEv] = useState("");
  const [hora_inicio_ev, setHoraInicioEv] = useState("");
  const [hora_inicio_ampm, setHoraInicioAMPM] = useState("AM");
  const [hora_fin_ev, setHoraFinEv] = useState("");
  const [hora_fin_ampm, setHoraFinAMPM] = useState("AM");
  const [todoElDia, setTodoElDia] = useState(false);
  const [localizacion_ev, setLocalizacionEv] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [errorTitulo, setErrorTitulo] = useState("");
  const [errorDescripcion, setErrorDescripcion] = useState("");
  const [errorFecha, setErrorFecha] = useState("");
  const [errorHora, setErrorHora] = useState("");
  const [errorLocalizacion, setErrorLocalizacion] = useState("");
  const [errorTipo, setErrorTipo] = useState("");

  // Agrego la función auxiliar para comparar horas
  function validarHoraFin(horaInicio: string, ampmInicio: string, horaFin: string, ampmFin: string) {
    if (!horaInicio || !horaFin) return false;
    const [h1, m1] = horaInicio.split(":");
    const [h2, m2] = horaFin.split(":");
    let horaInicioNum = parseInt(h1);
    let horaFinNum = parseInt(h2);
    if (ampmInicio === "PM" && horaInicioNum !== 12) horaInicioNum += 12;
    if (ampmInicio === "AM" && horaInicioNum === 12) horaInicioNum = 0;
    if (ampmFin === "PM" && horaFinNum !== 12) horaFinNum += 12;
    if (ampmFin === "AM" && horaFinNum === 12) horaFinNum = 0;
    const minutosInicio = parseInt(m1);
    const minutosFin = parseInt(m2);
    const totalMinInicio = horaInicioNum * 60 + minutosInicio;
    const totalMinFin = horaFinNum * 60 + minutosFin;
    return totalMinFin <= totalMinInicio;
  }

  return (
    <AnimatePresence >
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 flex  justify-center z-50 p-4 border-2 border-primary/20"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="bg-white rounded-2xl w-full max-w-2xl shadow-2xl overflow-y-auto border-2 border-primary/20"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header del Modal */}
            <div className="flex  justify-between p-6 border-b border-gray-200">
              <div>
                <h2 className="text-2xl font-bold text-primary">Agregar Evento</h2>
                <p className="text-gray-600 mt-1">Crear nueva notificación ecológica</p>
              </div>
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors duration-200 cursor-pointer"
              >
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </motion.button>
            </div>

            {/* Contenido del Modal */}
            <div className="p-6">
              <div className="space-y-4">
                {/* Título */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Título del evento
                  </label>
                  <input
                    type="text"
                    className={`w-full px-3 py-2 border ${errores.titulo ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent`}
                    placeholder="Ej: Recordatorio de reciclaje"
                    value={nombre_ev}
                    onChange={(e) => setNombreEv(e.target.value)}
                  />
                  {errorTitulo && (
                    <div className="text-red-600 text-xs mt-1">{errorTitulo}</div>
                  )}
                </div>


                {/* Descripción */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Descripción
                  </label>
                  <textarea
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
                    rows={3}
                    placeholder="Describe el evento o notificación..."
                    value={descripcion_ev}
                    onChange={(e) => setDescripcionEv(e.target.value)}
                  />
                  {errorDescripcion && (
                    <div className="text-red-600 text-xs mt-1">{errorDescripcion}</div>
                  )}
                </div>

                {/* Fecha del evento */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Fecha del evento
                  </label>
                  <input
                    type="date"
                    pattern="\\d{4}-\\d{2}-\\d{2}"
                    inputMode="numeric"
                    className={`w-full px-3 py-2 border ${errores.fecha ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent`}
                    value={fecha_ev}
                    onChange={e => {
                      // Solo permitir valores numéricos y guiones
                      const val = e.target.value.replace(/[^0-9-]/g, "");
                      setFechaEv(val);
                    }}
                  />
                  {errorFecha && (
                    <div className="text-red-600 text-xs mt-1">{errorFecha}</div>
                  )}
                </div>

                {/* Todo el día */}
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="todoElDia"
                    checked={todoElDia}
                    onChange={e => setTodoElDia(e.target.checked)}
                  />
                  <label htmlFor="todoElDia" className="text-sm font-medium text-gray-700">Evento todo el día</label>
                </div>

                {/* Hora de inicio y fin solo si no es todo el día */}
                {!todoElDia && (
                  <div className="flex flex-col md:flex-row md:items-end gap-4">
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Hora de inicio
                      </label>
                      <div className="flex gap-2">
                        <select
                          className="px-2 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                          value={hora_inicio_ev.length >= 2 ? hora_inicio_ev.slice(0,2) : ''}
                          onChange={e => {
                            const minutos = hora_inicio_ev.length === 5 ? hora_inicio_ev.slice(3,5) : '00';
                            const nuevaHora = e.target.value + ':' + minutos;
                            setHoraInicioEv(nuevaHora);
                            // Validar hora fin
                            if (hora_fin_ev && validarHoraFin(nuevaHora, hora_inicio_ampm, hora_fin_ev, hora_fin_ampm)) {
                              setErrorHora('La hora de fin debe ser mayor que la de inicio.');
                            } else {
                              setErrorHora('');
                            }
                          }}
                        >
                          <option value="">hh</option>
                          {[...Array(12)].map((_, i) => (
                            <option key={i+1} value={String(i+1).padStart(2, '0')}>{String(i+1).padStart(2, '0')}</option>
                          ))}
                        </select>
                        <select
                          className="px-2 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                          value={hora_inicio_ev.length === 5 ? hora_inicio_ev.slice(3,5) : ''}
                          onChange={e => {
                            const horas = hora_inicio_ev.length >= 2 ? hora_inicio_ev.slice(0,2) : '01';
                            const nuevaHora = horas + ':' + e.target.value;
                            setHoraInicioEv(nuevaHora);
                            // Validar hora fin
                            if (hora_fin_ev && validarHoraFin(nuevaHora, hora_inicio_ampm, hora_fin_ev, hora_fin_ampm)) {
                              setErrorHora('La hora de fin debe ser mayor que la de inicio.');
                            } else {
                              setErrorHora('');
                            }
                          }}
                        >
                          <option value="">mm</option>
                          {[...Array(60)].map((_, i) => (
                            <option key={i} value={String(i).padStart(2, '0')}>{String(i).padStart(2, '0')}</option>
                          ))}
                        </select>
                        <select
                          className="px-2 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                          value={hora_inicio_ampm}
                          onChange={e => {
                            setHoraInicioAMPM(e.target.value);
                            if (hora_fin_ev && validarHoraFin(hora_inicio_ev, e.target.value, hora_fin_ev, hora_fin_ampm)) {
                              setErrorHora('La hora de fin debe ser mayor que la de inicio.');
                            } else {
                              setErrorHora('');
                            }
                          }}
                        >
                          <option value="AM">AM</option>
                          <option value="PM">PM</option>
                        </select>
                      </div>
                    </div>
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Hora de fin
                      </label>
                      <div className="flex gap-2">
                        <select
                          className="px-2 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                          value={hora_fin_ev.length >= 2 ? hora_fin_ev.slice(0,2) : ''}
                          onChange={e => {
                            const minutos = hora_fin_ev.length === 5 ? hora_fin_ev.slice(3,5) : '00';
                            const nuevaHora = e.target.value + ':' + minutos;
                            setHoraFinEv(nuevaHora);
                            if (hora_inicio_ev && validarHoraFin(hora_inicio_ev, hora_inicio_ampm, nuevaHora, hora_fin_ampm)) {
                              setErrorHora('La hora de fin debe ser mayor que la de inicio.');
                            } else {
                              setErrorHora('');
                            }
                          }}
                        >
                          <option value="">hh</option>
                          {[...Array(12)].map((_, i) => (
                            <option key={i+1} value={String(i+1).padStart(2, '0')}>{String(i+1).padStart(2, '0')}</option>
                          ))}
                        </select>
                        <select
                          className="px-2 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                          value={hora_fin_ev.length === 5 ? hora_fin_ev.slice(3,5) : ''}
                          onChange={e => {
                            const horas = hora_fin_ev.length >= 2 ? hora_fin_ev.slice(0,2) : '01';
                            const nuevaHora = horas + ':' + e.target.value;
                            setHoraFinEv(nuevaHora);
                            if (hora_inicio_ev && validarHoraFin(hora_inicio_ev, hora_inicio_ampm, nuevaHora, hora_fin_ampm)) {
                              setErrorHora('La hora de fin debe ser mayor que la de inicio.');
                            } else {
                              setErrorHora('');
                            }
                          }}
                        >
                          <option value="">mm</option>
                          {[...Array(60)].map((_, i) => (
                            <option key={i} value={String(i).padStart(2, '0')}>{String(i).padStart(2, '0')}</option>
                          ))}
                        </select>
                        <select
                          className="px-2 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                          value={hora_fin_ampm}
                          onChange={e => {
                            setHoraFinAMPM(e.target.value);
                            if (hora_inicio_ev && validarHoraFin(hora_inicio_ev, hora_inicio_ampm, hora_fin_ev, e.target.value)) {
                              setErrorHora('La hora de fin debe ser mayor que la de inicio.');
                            } else {
                              setErrorHora('');
                            }
                          }}
                        >
                          <option value="AM">AM</option>
                          <option value="PM">PM</option>
                        </select>
                      </div>
                    </div>
                  </div>
                )}
                {errorHora && (
                  <div className="text-red-600 text-xs mt-1">{errorHora}</div>
                )}

                {/* Localización */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Localización
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Ej: Edificio Central"
                    value={localizacion_ev}
                    onChange={e => setLocalizacionEv(e.target.value)}
                  />
                  {errorLocalizacion && (
                    <div className="text-red-600 text-xs mt-1">{errorLocalizacion}</div>
                  )}
                </div>

                {/* Tipo de evento */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tipo de evento
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    value={tipo_ev}
                    onChange={(e) => setTipoEv(e.target.value)}
                  >
                    <option value="">Seleccionar tipo</option>
                    <option value="reciclaje">Reciclaje</option>
                    <option value="energia">Ahorro de energía</option>
                    <option value="agua">Ahorro de agua</option>
                    <option value="transporte">Transporte sostenible</option>
                    <option value="otros">Otros</option>
                  </select>
                  {errorTipo && (
                    <div className="text-red-600 text-xs mt-1">{errorTipo}</div>
                  )}
                </div>
                </div>

                {/* Botones */}
              <div className="md:col-span-2 flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-3 pt-4">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={onClose}
                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                  >
                    Cancelar
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200"
                    onClick={async () => {
                    setErrorMsg("");
                    setErrorTitulo("");
                    setErrorDescripcion("");
                    setErrorFecha("");
                    setErrorHora("");
                    setErrorLocalizacion("");
                    setErrorTipo("");
                    let hayError = false;
                    if (nombre_ev.trim().length < 3) {
                      setErrorTitulo("El título debe tener al menos 3 caracteres.");
                      hayError = true;
                    }
                    if (descripcion_ev.trim().length < 10) {
                      setErrorDescripcion("La descripción debe tener al menos 10 caracteres.");
                      hayError = true;
                    }
                    // Validación de fecha
                    const hoy = new Date();
                    hoy.setHours(0,0,0,0);
                    if (!fecha_ev) {
                      setErrorFecha("La fecha es obligatoria.");
                      hayError = true;
                    } else {
                      const fechaSeleccionada = new Date(fecha_ev);
                      if (fechaSeleccionada >= hoy) {
                        setErrorFecha("Solo se permiten fechas anteriores a hoy.");
                        hayError = true;
                      }
                    }
                    // Validación de horas
                    if (!todoElDia) {
                      if (!hora_inicio_ev || !hora_fin_ev) {
                        setErrorHora("Debes seleccionar la hora de inicio y fin.");
                        hayError = true;
                      } else {
                        // Validar que la hora de inicio no sea pasada si es hoy
                        if (fecha_ev === hoy.toISOString().slice(0,10)) {
                          const ahora = new Date();
                          const [h, m] = hora_inicio_ev.split(":");
                          let horaNum = parseInt(h);
                          if (hora_inicio_ampm === "PM" && horaNum !== 12) horaNum += 12;
                          if (hora_inicio_ampm === "AM" && horaNum === 12) horaNum = 0;
                          const minutosNum = parseInt(m);
                          const horaEvento = new Date();
                          horaEvento.setHours(horaNum, minutosNum, 0, 0);
                          if (horaEvento < ahora) {
                            setErrorHora("La hora de inicio no puede ser pasada.");
                            hayError = true;
                          }
                        }
                        // Validar que la hora de fin sea mayor que la de inicio
                        const [h1, m1] = hora_inicio_ev.split(":");
                        const [h2, m2] = hora_fin_ev.split(":");
                        let horaInicioNum = parseInt(h1);
                        let horaFinNum = parseInt(h2);
                        if (hora_inicio_ampm === "PM" && horaInicioNum !== 12) horaInicioNum += 12;
                        if (hora_inicio_ampm === "AM" && horaInicioNum === 12) horaInicioNum = 0;
                        if (hora_fin_ampm === "PM" && horaFinNum !== 12) horaFinNum += 12;
                        if (hora_fin_ampm === "AM" && horaFinNum === 12) horaFinNum = 0;
                        const minutosInicio = parseInt(m1);
                        const minutosFin = parseInt(m2);
                        const totalMinInicio = horaInicioNum * 60 + minutosInicio;
                        const totalMinFin = horaFinNum * 60 + minutosFin;
                        if (totalMinFin <= totalMinInicio) {
                          setErrorHora("La hora de fin debe ser mayor que la de inicio.");
                          hayError = true;
                        }
                      }
                    }
                    // Validación localización
                    if (!localizacion_ev.trim()) {
                      setErrorLocalizacion("La localización es obligatoria.");
                      hayError = true;
                    }
                    // Validación tipo
                    if (!tipo_ev) {
                      setErrorTipo("Debes seleccionar un tipo de evento.");
                      hayError = true;
                    }
                    if (hayError) return;
                      try {
                        // Formatear hora inicio y fin a 'hh:mm AM/PM'
                        const horaInicioFormateada = hora_inicio_ev ? `${hora_inicio_ev}${hora_inicio_ampm ? ' ' + hora_inicio_ampm : ''}`.replace(/^([0-9]{2}):([0-9]{2})/, (m, h, min) => `${('0' + ((+h % 12) || 12)).slice(-2)}:${min}`) : '';
                        const horaFinFormateada = hora_fin_ev ? `${hora_fin_ev}${hora_fin_ampm ? ' ' + hora_fin_ampm : ''}`.replace(/^([0-9]{2}):([0-9]{2})/, (m, h, min) => `${('0' + ((+h % 12) || 12)).slice(-2)}:${min}`) : '';
                        const nuevaNotificacion = {
                          name: nombre_ev,
                          date: fecha_ev,
                          time: todoElDia ? 'Todo el día' : `${horaInicioFormateada} - ${horaFinFormateada}`,
                          location: localizacion_ev,
                          description: descripcion_ev,
                          category: tipo_ev,
                        };
                        setNombreEv("");
                        setDescripcionEv("");
                        setTipoEv("");
                        setFechaEv("");
                        setHoraInicioEv("");
                        setTodoElDia(false);
                        setHoraInicioAMPM("AM");
                        setHoraFinEv("");
                        setHoraFinAMPM("AM");
                        setLocalizacionEv("");
                        await createNotificationWithValidation(nuevaNotificacion);
                        onClose();
                      } catch (error) {
                      setErrorMsg("Error al crear el evento. Verifica los datos e inténtalo de nuevo.");
                        console.error("Error al crear el evento:", error);
                      }
                    }}
                  >
                    Crear Evento
                  </motion.button>
                {/* Mensaje de error general */}
                {(errores.titulo || errores.fecha || errores.hora) && (
                  <div className="text-red-500 text-xs mt-2">
                    {errores.titulo && <div>{errores.titulo}</div>}
                    {errores.fecha && <div>{errores.fecha}</div>}
                    {errores.hora && <div>{errores.hora}</div>}
                  </div>
                )}
                </div>
              {errorMsg && (
                <div className="text-red-600 text-sm mt-2 text-center">{errorMsg}</div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
} 