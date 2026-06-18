// ─────────────────────────────────────────────────────────────────────────
// CÍRCULO TEQUILA · fuente única — mkt + ventas
// Todo el contenido proviene del formulario de onboarding de Kenia Torres.
// Las cifras son una muestra realista, coherente con lo declarado en el form
// (≈50–60 leads/mes, Meta trae volumen, los referidos traen clientes, y la
// "caja negra" tras la transferencia a comercial). Reemplazables con datos
// reales de WhatsApp / Google Sheets sin tocar la interfaz.
// ─────────────────────────────────────────────────────────────────────────

export const brand = {
  name: 'CÍRCULO',
  sub: 'TEQUILA',
  tagline: 'ultra premium · jalisco',
  edition: 'UNA EDICIÓN DE',
  ref: 'circulo-tequila-dp3u',
  source: 'fuente única · mkt + ventas',
  geo: '20.67°N 103.35°W · jalisco',
  norte: 'norte: día_45',
  contacto: {
    responsable: 'Kenia Torres',
    email: 'mktdigital@circulotequila.com',
    whatsapp: '+52 384 118 2580',
  },
}

// ── Embudo por periodo ──────────────────────────────────────────────────
// dot: color del punto · leak marca la fuga narrativa principal (post-handoff)
export const periods = {
  hoy: {
    label: 'Hoy',
    revenue: 0,
    ticket: 0,
    metaPct: 12,
    globalPct: 0,
    stages: [
      { key: 'gen', label: 'Generados', value: 4, dot: 'blue', sub: 'leads de hoy', note: '+1 vs ayer' },
      { key: 'conv', label: 'En conversación', value: 3, dot: 'teal', sub: 'respondió al 1er toque', note: 'IA · <2 min' },
      { key: 'cal', label: 'Calificados', value: 1, dot: 'gold', sub: 'listos para venta', note: 'calidad 0.74' },
      { key: 'sales', label: 'Enviados a ventas', value: 1, dot: 'pink', sub: 'transferidos a comercial', note: 'handoff sellado' },
      { key: 'won', label: 'Cerradas', value: 0, dot: 'green', sub: 'ventas', note: 'pipeline activo' },
    ],
  },
  semana: {
    label: 'Semana',
    revenue: 46200,
    ticket: 46200,
    metaPct: 12,
    globalPct: 7.1,
    stages: [
      { key: 'gen', label: 'Generados', value: 14, dot: 'blue', sub: 'leads del periodo', note: '+2 vs sem. previa' },
      { key: 'conv', label: 'En conversación', value: 10, dot: 'teal', sub: 'respondió al 1er toque', note: 'IA · <2 min' },
      { key: 'cal', label: 'Calificados', value: 6, dot: 'gold', sub: 'listos para venta', note: 'calidad 0.72' },
      { key: 'sales', label: 'Enviados a ventas', value: 2, dot: 'pink', sub: 'transferidos a comercial', note: 'handoff sellado' },
      { key: 'won', label: 'Cerradas', value: 1, dot: 'green', sub: '$46.2k · ventas', note: 'meta 12%' },
    ],
  },
  mes: {
    label: 'Mes',
    revenue: 138600,
    ticket: 46200,
    metaPct: 12,
    globalPct: 5.4,
    stages: [
      { key: 'gen', label: 'Generados', value: 56, dot: 'blue', sub: 'leads del periodo', note: '+9 vs mes previo' },
      { key: 'conv', label: 'En conversación', value: 41, dot: 'teal', sub: 'respondió al 1er toque', note: 'IA · <2 min' },
      { key: 'cal', label: 'Calificados', value: 22, dot: 'gold', sub: 'listos para venta', note: 'calidad 0.72' },
      { key: 'sales', label: 'Enviados a ventas', value: 9, dot: 'pink', sub: 'transferidos a comercial', note: 'handoff sellado' },
      { key: 'won', label: 'Cerradas', value: 3, dot: 'green', sub: '$138.6k · ventas', note: 'global 5.4% · meta 12%' },
    ],
  },
}

// La transición donde se pierde la visibilidad: enviados → cerradas.
export const leakIndex = 3 // marca el paso "Enviados → Cerradas" como caja negra

// ── Pregunta 3 · canales que generan CLIENTES (no solo conversaciones) ────
export const channels = [
  { name: 'Referidos', leads: 2, quality: 'alta', pct: 33, tone: 'green' },
  { name: 'Eventos / Expos', leads: 2, quality: 'alta', pct: 28, tone: 'teal' },
  { name: 'Sitio web', leads: 6, quality: 'media', pct: 12, tone: 'gold' },
  { name: 'Meta Ads · WhatsApp', leads: 46, quality: 'media', pct: 6, tone: 'golddim' },
  { name: 'Mailing', leads: 1, quality: 'baja', pct: 4, tone: 'orange' },
]
export const channelsCaption = 'Meta trae volumen; los referidos y eventos traen los clientes.'

// ── Pregunta 2 · qué pasó tras el handoff (cohorte del mes) ───────────────
export const handoff = {
  total: 9,
  segments: [
    { label: 'Ganadas', value: 3, tone: 'green' },
    { label: 'Abiertas / en proceso', value: 4, tone: 'gold' },
    { label: 'Perdidas', value: 2, tone: 'red' },
  ],
  closeDays: 14,
  closeNote: 'nada se pierde de vista',
}

// Motivos de pérdida — ventana de 90 días (su pregunta sin dato hoy).
export const lossReasons = [
  { reason: 'Sin respuesta / falta de seguimiento', value: 5 },
  { reason: 'Precio / presupuesto', value: 4 },
  { reason: 'Tiempo de decisión', value: 3 },
  { reason: 'Volumen bajo / mínimo 12', value: 2 },
  { reason: 'Zona / fuera de alcance', value: 1 },
]

// ── Tendencias · 6 semanas ────────────────────────────────────────────────
export const trends = {
  weekLabels: ['s24', 's25', 's26', 's27', 's28', 'hoy'],
  series: {
    leads: { label: 'Leads generados', data: [9, 11, 10, 13, 12, 14], unit: '' },
    conversion: { label: 'Conversión global', data: [2.3, 3.0, 3.6, 4.2, 4.8, 5.4], unit: '%' },
    calidad: { label: 'Calidad de lead', data: [0.61, 0.63, 0.66, 0.68, 0.7, 0.72], unit: '' },
    sinMovimiento: { label: 'Tiempo sin movimiento', data: [5.8, 5.2, 5.0, 4.9, 4.6, 4.4], unit: ' d' },
    cierre: { label: 'Tiempo de cierre', data: [16, 16, 15, 15, 14, 14], unit: ' d' },
  },
  highlights: [
    { label: 'Conversión global', delta: '+3.1 pts', dir: 'up' },
    { label: 'Tiempo sin movimiento', delta: '−1.4 días', dir: 'up' },
    { label: 'Calidad de lead', delta: '0.61 → 0.72', dir: 'up' },
  ],
}

// ── Etapas del embudo (las 10 de Kenia + reactivación) ────────────────────
export const stages = [
  { n: 1, key: 'nuevo', label: 'Lead nuevo', signal: 'Responde al primer mensaje o interactúa con la información.' },
  { n: 2, key: 'conversacion', label: 'En conversación', signal: 'Hace preguntas, pide más información o comparte detalles del proyecto.' },
  { n: 3, key: 'calificado', label: 'Calificado', signal: 'Comparte empresa, objetivo, cantidad estimada, ciudad o fecha.' },
  { n: 4, key: 'interesado', label: 'Interesado', signal: 'Pide avanzar, conocer el proceso, propuesta o hablar con un asesor.' },
  { n: 5, key: 'transferido', label: 'Transferido a vendedor', signal: 'El vendedor valida el proyecto y presenta la propuesta.' },
  { n: 6, key: 'propuesta', label: 'Propuesta aprobada', signal: 'El cliente acepta condiciones y confirma intención de compra.' },
  { n: 7, key: 'anticipo', label: 'Anticipo recibido', signal: 'Se confirma el pago del 50% de anticipo.' },
  { n: 8, key: 'brief', label: 'Brief completado', signal: 'El cliente entrega la información para personalizar.' },
  { n: 9, key: 'diseno', label: 'Diseño autorizado', signal: 'El cliente aprueba el arte final.' },
  { n: 10, key: 'produccion', label: 'Producción y entrega', signal: 'Pedido producido, entregado y cerrado administrativamente.' },
]
export const reactivationStage = {
  key: 'reactivacion',
  label: 'Reactivación',
  signal: 'Dejó de responder; permanece en seguimiento hasta retomar o descartar.',
}

// ── Jardín de leads · estado real de cada oportunidad ─────────────────────
// stage = número de etapa (1–10) o 'reactivacion'
export const leads = [
  { id: 'CT-118', nombre: 'Mariana Ortega', empresa: 'Grupo Hotelero Maya Resorts', canal: 'Referidos', ciudad: 'Riviera Maya', stage: 7, responsable: 'Ricardo · ventas', ultima: 'hace 1 día', dias: 1, proximo: 'Enviar brief de personalización', botellas: 60, formato: '750 ml', proposito: 'Amenidad VIP huéspedes', valor: 135000 },
  { id: 'CT-117', nombre: 'Daniela Ríos', empresa: 'Banco Aurum · RH', canal: 'Sitio web', ciudad: 'CDMX', stage: 3, responsable: 'Kenia · mkt', ultima: 'hace 5 horas', dias: 0, proximo: 'Confirmar cantidad y fecha objetivo', botellas: 100, formato: '750 ml', proposito: 'Reconocimientos fin de año', valor: 225000 },
  { id: 'CT-116', nombre: 'Andrea Cano', empresa: 'Grupo Restaurantero Sal de Mar', canal: 'Eventos / Expos', ciudad: 'Puerto Vallarta', stage: 8, responsable: 'Ricardo · ventas', ultima: 'hace 6 horas', dias: 0, proximo: 'Diseño desarrolla arte final', botellas: 36, formato: '750 ml', proposito: 'Regalo a clientes clave', valor: 81000 },
  { id: 'CT-115', nombre: 'Pablo Sáenz', empresa: 'Inmobiliaria Cumbre', canal: 'Referidos', ciudad: 'Querétaro', stage: 6, responsable: 'Ricardo · ventas', ultima: 'hace 1 día', dias: 1, proximo: 'Solicitar anticipo del 50%', botellas: 50, formato: '750 ml', proposito: 'Inauguración torre', valor: 112500 },
  { id: 'CT-114', nombre: 'Sofía Llamas', empresa: 'Hotel Casa Origen', canal: 'Meta Ads · WhatsApp', ciudad: 'San Miguel de Allende', stage: 4, responsable: 'Kenia · mkt', ultima: 'hace 1 día', dias: 1, proximo: 'Agendar llamada con asesor comercial', botellas: 48, formato: '375 ml', proposito: 'Amenidad en habitaciones', valor: 76800 },
  { id: 'CT-113', nombre: 'Carlos Méndez', empresa: 'Constructora Vértice', canal: 'Meta Ads · WhatsApp', ciudad: 'Guadalajara', stage: 5, responsable: 'Ricardo · ventas', ultima: 'hace 3 días', dias: 3, proximo: 'Vendedor debe presentar propuesta', botellas: 24, formato: '750 ml', proposito: 'Regalo corporativo fin de año', valor: 54000 },
  { id: 'CT-112', nombre: 'Verónica Salas', empresa: 'Distribuidora del Bajío', canal: 'Sitio web', ciudad: 'León', stage: 3, responsable: 'Kenia · mkt', ultima: 'hace 4 días', dias: 4, proximo: 'Falta fecha objetivo y presupuesto', botellas: 120, formato: 'mixto', proposito: 'Reventa premium', valor: 270000 },
  { id: 'CT-111', nombre: 'Compras · Duty Free', empresa: 'Aeropuerto GDL Duty Free', canal: 'Eventos / Expos', ciudad: 'Guadalajara', stage: 5, responsable: 'Ricardo · ventas', ultima: 'hace 7 días', dias: 7, proximo: '⚠ Sin respuesta del vendedor — dar seguimiento', botellas: 200, formato: '750 ml', proposito: 'Punto de venta turístico', valor: 450000 },
  { id: 'CT-110', nombre: 'Jorge Paredes', empresa: 'Paredes & Asociados', canal: 'Meta Ads · WhatsApp', ciudad: 'Guadalajara', stage: 2, responsable: 'Kenia · mkt', ultima: 'hace 2 días', dias: 2, proximo: 'Compartir precios y pedido mínimo', botellas: 12, formato: '375 ml', proposito: 'Regalo a clientes', valor: 19200 },
  { id: 'CT-109', nombre: 'Marcela Vidal', empresa: 'Eventos Vidal', canal: 'Meta Ads · WhatsApp', ciudad: 'CDMX', stage: 1, responsable: 'Kenia · mkt', ultima: 'hace 2 horas', dias: 0, proximo: 'Primer toque (IA enviado)', botellas: null, formato: '—', proposito: 'Boda corporativa', valor: null },
  { id: 'CT-108', nombre: 'Luis Fdo. Beltrán', empresa: 'Tech Solutions MX', canal: 'Meta Ads · WhatsApp', ciudad: 'Monterrey', stage: 'reactivacion', responsable: 'Kenia · mkt', ultima: 'hace 12 días', dias: 12, proximo: 'Reactivar: dejó de responder tras precios', botellas: 24, formato: '750 ml', proposito: 'Evento anual', valor: 54000 },
  { id: 'CT-107', nombre: 'Renata Gil', empresa: 'Spa & Wellness Auria', canal: 'Sitio web', ciudad: 'Riviera Maya', stage: 'reactivacion', responsable: 'Kenia · mkt', ultima: 'hace 18 días', dias: 18, proximo: 'Reactivar: sin movimiento 18 días', botellas: 30, formato: '375 ml', proposito: 'Amenidad spa', valor: 48000 },
]

// ── Agente IA · su manual de operación (de las secciones 05–07 del form) ──
export const agent = {
  intro:
    'El objetivo del agente es entregar al equipo comercial un prospecto calificado, informado e interesado — listo para que un vendedor humano cierre. Mantiene conversaciones naturales, alineadas con la experiencia premium de la marca.',
  canDo: [
    'Compartir precios vigentes de productos, canales y ediciones empresariales.',
    'Explicar productos, presentaciones, personalización, tiempos estimados, pedido mínimo, formas de pago y cobertura.',
    'Recomendar la mejor opción según las necesidades del cliente.',
    'Calificar prospectos: nombre, empresa, cargo, ciudad, volumen, fecha objetivo, presupuesto y propósito.',
    'Proponer y coordinar una llamada o cita con un vendedor.',
    'Comunicar disponibilidad estimada (nunca confirmar inventario sin validación).',
  ],
  cannot: [
    'Prometer descuentos, condiciones especiales o personalizaciones extraordinarias sin autorización.',
    'Confirmar inventario, producción o fechas definitivas sin validación interna.',
    'Compartir enlaces de pago o solicitar pagos.',
    'Garantizar tiempos de entrega o volúmenes disponibles.',
    'Solicitar datos bancarios, contraseñas o información financiera sensible por chat.',
  ],
  escalation: [
    'El prospecto manifiesta intención clara de compra.',
    'Solicita una cotización formal o un proyecto empresarial / hotelero / personalizado.',
    'Pide una llamada, reunión o videollamada.',
    'Solicita descuentos o condiciones fuera de la oferta estándar.',
    'Pide confirmar inventario, disponibilidad o fechas específicas.',
    'Quiere iniciar un pedido o proceso de pago.',
    'El agente no tiene información suficiente para responder con certeza.',
  ],
  values: [
    { title: 'Honestidad y transparencia', body: 'Información real sobre precios, tiempos y alcances. Nunca prometemos lo que no podemos cumplir.' },
    { title: 'Experiencia y atención personalizada', body: 'Entendemos cada necesidad y construimos una propuesta a la medida, sobre todo en proyectos empresariales.' },
    { title: 'Calidad sobre cantidad', body: 'Priorizamos relaciones de largo plazo sobre cierres rápidos. Cada botella representa a Círculo.' },
  ],
  faqs: [
    { q: '¿Qué son las Ediciones Empresariales?', a: 'Botellas de tequila ultra premium 100% agave totalmente personalizadas para empresas, eventos y proyectos especiales. Personalizamos botella, diseño y estuche.' },
    { q: '¿Qué se puede personalizar?', a: 'Desarrollamos un diseño exclusivo a partir de logotipos, colores, mensajes, conceptos o elementos visuales del cliente.' },
    { q: '¿Cuál es el pedido mínimo?', a: 'El pedido mínimo para Ediciones Empresariales es de 12 botellas.' },
    { q: '¿Qué presentaciones manejan para proyectos empresariales?', a: 'Presentación de 375 ml y 750 ml.' },
    { q: '¿Cuáles son los precios de las Ediciones Empresariales?', a: '375 ml: $1,600 MXN por unidad. 750 ml: $2,250 MXN por unidad. Pedido mínimo de 12 botellas.' },
    { q: '¿Cuánto tarda una edición personalizada?', a: 'Una vez autorizado el arte final, el tiempo estimado de entrega es de 20 días hábiles.' },
    { q: '¿Qué tipos de tequila manejan?', a: 'Actualmente contamos con Blanco, Joven y Reposado.' },
    { q: '¿Cuáles son los precios de la línea regular?', a: 'Blanco 375 ml: $1,600. Blanco 750 ml: $2,250. Joven 750 ml: $2,600. Reposado 750 ml: $2,900.' },
    { q: '¿Hacen envíos?', a: 'Sí, atendemos clientes en toda la República Mexicana.' },
    { q: '¿Qué métodos de pago aceptan?', a: 'Transferencia bancaria y Mercado Pago.' },
    { q: '¿Qué se requiere para iniciar un proyecto empresarial?', a: 'Compartir la información de la marca, definir los elementos a personalizar y realizar un anticipo del 50%.' },
    { q: '¿Pueden aplicar descuentos?', a: 'Cualquier descuento o condición especial debe ser revisada y autorizada por el área comercial.' },
    { q: '¿Cómo validan disponibilidad e inventario?', a: 'La disponibilidad y fechas de entrega se validan internamente antes de confirmarse al cliente.' },
    { q: '¿Puedo agendar una llamada o presentación?', a: 'Sí. Coordinamos una llamada para presentar la marca, mostrar ejemplos y resolver dudas del proceso.' },
  ],
  scripts: [
    { n: 1, title: 'Respuesta inicial', body: 'Hola, buen día 👋 ¡Gracias por tu interés en nuestras Ediciones Empresariales de Círculo Tequila! Con gusto te comparto la información para crear un regalo que represente a tu empresa. ¿Con quién tengo el gusto? 😊' },
    { n: 2, title: 'Presentación del producto', body: 'Nuestras Ediciones Empresariales son botellas de tequila ultra premium personalizadas para empresas, reconocimientos, clientes especiales y eventos. Desarrollamos el diseño exclusivo a partir de lo que nos compartas (colores, logotipo, mensajes o conceptos).' },
    { n: 3, title: 'Presentaciones y precios', body: '🔹 375 ml – $1,600 MXN c/u\n🔹 750 ml – $2,250 MXN c/u\n📦 Pedido mínimo: 12 botellas.\nAmbos formatos incluyen personalización completa de botella y estuche.' },
    { n: 4, title: 'Tiempos de entrega', body: 'Una vez autorizado el arte final, el tiempo estimado de entrega es de 20 días hábiles. Para iniciar el proyecto se solicita un anticipo del 50%.' },
    { n: 5, title: 'Calificación del prospecto', body: 'Para ayudarte mejor, ¿me platicas del proyecto? 📅 ¿Es para un evento, cliente o reconocimiento? 🍾 ¿Cuántas botellas consideras? 📍 ¿En qué ciudad está tu empresa?' },
    { n: 6, title: 'Seguimiento / reactivación', body: 'Hola 👋, nos encantaría saber qué te pareció la información sobre nuestras Ediciones Empresariales ✨ Podemos agendar una llamada para mostrarte ejemplos personalizados y resolver dudas. ¿Coordinamos una llamada esta semana?' },
  ],
  materials: 'https://drive.google.com/drive/folders/1SdL50ixHMrApGKn2vMDO-stMZtToRGFj?usp=sharing',
}

// ── Precios oficiales (reglas que el agente no puede romper) ──────────────
export const pricing = {
  linea: [
    { producto: 'Blanco', ml: '375 ml', precio: 1600 },
    { producto: 'Blanco', ml: '750 ml', precio: 2250 },
    { producto: 'Joven', ml: '750 ml', precio: 2600 },
    { producto: 'Reposado', ml: '750 ml', precio: 2900 },
  ],
  empresarial: [
    { producto: 'Personalizada', ml: '375 ml', precio: 1600 },
    { producto: 'Personalizada', ml: '750 ml', precio: 2250 },
  ],
  reglas: [
    'Pedido mínimo de 12 botellas en Ediciones Empresariales.',
    'Anticipo del 50% para iniciar producción y personalización.',
    'Descuentos, excepciones y condiciones especiales: autoriza Jefa Comercial o Director.',
    'Entrega estimada: 20 días hábiles tras autorizar el arte final.',
    'Pagos: transferencia bancaria y Mercado Pago. Cobertura: toda la República.',
  ],
}

// ── Las 3 preguntas del lunes 8:00 a.m. ───────────────────────────────────
export const mondayQuestions = [
  '¿Cuántos generamos, cuántos calificaron, cuántos llegaron a ventas?',
  'Qué pasó tras el handoff',
  'Qué canales generan clientes',
]

// ── Navegación ────────────────────────────────────────────────────────────
export const nav = [
  { n: '01', key: 'panel', label: 'Panel' },
  { n: '02', key: 'leads', label: 'Jardín de leads' },
  { n: '03', key: 'agente', label: 'Agente IA' },
  { n: '04', key: 'seguimientos', label: 'Seguimientos' },
  { n: '05', key: 'canales', label: 'Rendimiento por canal' },
  { n: '06', key: 'conversion', label: 'Conversión comercial' },
  { n: '07', key: 'tendencias', label: 'Tendencias' },
]

export const peso = (n) =>
  n == null ? '—' : new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN', maximumFractionDigits: 0 }).format(n)
