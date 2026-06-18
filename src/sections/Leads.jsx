import { useRef, useState } from 'react'
import { kanbanColumns, pesoCompact } from '../data/circulo.js'

export default function Leads({ board, setBoard, query = '' }) {
  const dragId = useRef(null)
  const [overCol, setOverCol] = useState(null)

  const q = query.trim().toLowerCase()
  const match = (c) =>
    !q || [c.name, c.ciudad, c.ocasion, c.bot].join(' ').toLowerCase().includes(q)

  const pipeline = board
    .filter((c) => c.col !== 'cerrado')
    .reduce((s, c) => s + (c.value || 0), 0)
  const cerrado = board.filter((c) => c.col === 'cerrado').reduce((s, c) => s + (c.value || 0), 0)

  const onDrop = (colKey) => {
    const id = dragId.current
    setOverCol(null)
    dragId.current = null
    if (!id) return
    setBoard((prev) => prev.map((c) => (c.id === id ? { ...c, col: colKey } : c)))
  }

  return (
    <section>
      <div className="section-head">
        <div>
          <div className="eyebrow">Leads</div>
          <h1 className="headline">
            Pipeline <span className="gold">vivo.</span>
          </h1>
          <p className="subhead">
            Arrastra una tarjeta entre columnas — el valor de pipeline se recalcula y persiste. El
            estado real de cada oportunidad, sin perseguir hojas de cálculo.
          </p>
        </div>
        <div className="pipeline-badge">
          <span className="pipeline-badge__label">pipeline_calificado</span>
          <span className="pipeline-badge__value">{pesoCompact(pipeline)}</span>
          <span className="pipeline-badge__sub">cerrado {pesoCompact(cerrado)}</span>
        </div>
      </div>

      <div className="kanban">
        {kanbanColumns.map((col) => {
          const cards = board.filter((c) => c.col === col.key && match(c))
          const colTotal = board
            .filter((c) => c.col === col.key)
            .reduce((s, c) => s + (c.value || 0), 0)
          return (
            <div
              key={col.key}
              className={'kcol' + (overCol === col.key ? ' is-over' : '')}
              style={{ '--accent': col.accent }}
              onDragOver={(e) => {
                e.preventDefault()
                if (overCol !== col.key) setOverCol(col.key)
              }}
              onDragLeave={(e) => {
                if (e.currentTarget === e.target) setOverCol(null)
              }}
              onDrop={() => onDrop(col.key)}
            >
              <div className="kcol__head">
                <span className="kcol__label">{col.label}</span>
                <span className="kcount">{board.filter((c) => c.col === col.key).length}</span>
              </div>
              <div className="kcol__total">{pesoCompact(colTotal)}</div>

              <div className="kcol__body">
                {cards.map((c) => (
                  <article
                    key={c.id}
                    className="kcard"
                    draggable
                    onDragStart={() => (dragId.current = c.id)}
                    onDragEnd={() => {
                      dragId.current = null
                      setOverCol(null)
                    }}
                  >
                    <div className="kcard__top">
                      <span className="kcard__name">{c.name}</span>
                      <span className="kcard__handle" aria-hidden>⋮⋮</span>
                    </div>
                    <div className="kcard__meta">
                      {c.ciudad} · {c.bot} · {c.ocasion}
                    </div>
                    <div className="kcard__val" style={{ color: col.accent }}>
                      {pesoCompact(c.value)}
                    </div>
                  </article>
                ))}
                <div className="kcol__drop">soltar aquí</div>
              </div>
            </div>
          )
        })}
      </div>

      <div className="kanban-foot">
        <span className="foot-live">
          <span className="dot-live" />
          sync · wa.api
        </span>
        <span className="muted" style={{ fontSize: 11.5 }}>
          {board.length} oportunidades · arrastra para mover de etapa
        </span>
      </div>
    </section>
  )
}
