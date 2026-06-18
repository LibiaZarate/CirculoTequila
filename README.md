# Círculo · Panel

**Una sola verdad. De marketing a ventas.**

Panel de trazabilidad de leads para **Círculo Tequila** — del primer toque hasta el
cierre, sin perseguir hojas de cálculo. Construido a partir del formulario de
onboarding de Kenia Torres: responde sus *tres preguntas del lunes 8:00 a.m.* y
ataca el punto ciego de hoy (qué pasa con un lead **después** de transferirlo a
comercial).

> Estética premium oscura — oro y teal contenidos en las esquinas, el contenido
> sobre negro profundo. React + Vite, gráficas SVG hechas a mano, sin
> dependencias de terceros para visualización.

## Secciones

| # | Sección | Qué responde |
|---|---------|--------------|
| 01 | **Panel** | Las 3 preguntas del lunes: cuántos se generaron / calificaron / llegaron a ventas (embudo), qué pasó tras el *handoff*, y qué canales generan **clientes** (no solo conversaciones). |
| 02 | **Jardín de leads** | Estado real de cada oportunidad: etapa, responsable, última interacción, días sin movimiento y próximo paso. Buscable y exportable. |
| 03 | **Agente IA** | Manual de operación del agente: qué puede / nunca promete, cuándo escala a un humano, valores no negociables, precios oficiales, guiones y FAQs. |
| 04 | **Seguimientos** | La cola de reactivación — evita que conversaciones con interés real se enfríen (≈60% de los que no avanzan son recuperables). |
| 05 | **Rendimiento por canal** | Volumen vs. conversión a cliente por canal. *Meta trae volumen; los referidos traen clientes.* |
| 06 | **Conversión comercial** | Convierte la "caja negra" post-handoff en números: ganadas / abiertas / perdidas y **por qué** se pierden. |
| 07 | **Tendencias** | Seis semanas de evolución — conversión, calidad de lead, tiempo sin movimiento y tiempo de cierre. |

## Correr en local

```bash
npm install
npm run dev      # http://localhost:5173
```

```bash
npm run build    # genera dist/
npm run preview  # sirve el build de producción
```

Requiere Node 18+.

## Desplegar (Vercel)

El proyecto es un sitio estático de Vite — Vercel lo detecta automáticamente:

- **Build command:** `npm run build`
- **Output directory:** `dist`

También funciona en cualquier hosting estático (GitHub Pages, Netlify, etc.).

## Los datos

Toda la información vive en **`src/data/circulo.js`** — embudo, canales, leads,
motivos de pérdida, tendencias, reglas y guiones del agente. Las cifras son una
**muestra realista** coherente con el formulario de onboarding (≈50–60 leads/mes,
Meta aporta volumen, los referidos convierten mejor, y la fuga de visibilidad
tras el handoff). Para conectar datos reales de WhatsApp / Google Sheets, basta
reemplazar las estructuras de ese archivo — la interfaz no cambia.

## Funciona

- **⌘K / Ctrl+K** enfoca la búsqueda; escribe para filtrar leads por nombre,
  empresa, canal, ciudad o etapa.
- **Exportar** descarga los leads en CSV.
- El selector **Hoy / Semana / Mes** recalcula el embudo del Panel.

## Stack

- React 18 + Vite 5
- CSS puro (sistema de diseño en `src/styles/global.css`)
- Gráficas SVG propias (`src/components/Charts.jsx`) — cero librerías de charting
