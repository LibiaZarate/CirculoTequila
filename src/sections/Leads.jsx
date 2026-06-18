import { useRef, useState } from 'react'
import { kanbanColumns, leadContext, gateFields, arquitectura, pesoCompact, peso } from '../data/circulo.js'

const colLabel = (key) => kanbanColumns.find((c) => c.key === key)?.label || key
const objLabel = (cat) => arquitectura.objeciones.find((o) => o.cat === cat)

function Field({ label, children }) {
  return (
    <div className="ctx-field">
      <span className="ctx-field__l">{label}</span>
      <span className="ctx-field__v">{children}</span>
    </div>
  )
}

function LeadDrawer({ card, onClose }) {
  if (!card) return null
  const ctx = leadContext[card.id]
  const accent = kanbanColumns.find((c) => c.key === card.col)?.accent || '#e9b65d'

  // handoff_completeness · % de campos clave de la compuerta presentes
  const checks = gateFields.map((f) => {
    if (f === 'ciudad') return { f, ok: !!card.ciudad, val: card.ciudad }
    if (f === 'volumen') return { f, ok: (ctx?.volumen || 0) >= 12, val: ctx?.volumen ? ctx.volumen + ' bot' : '—' }
    return { f, ok: !!ctx?.[f], val: ctx?.[f] || '—' }
  })
  const completeness = Math.round((checks.filter((c) => c.ok).length / checks.length) * 100)
  const obj = ctx?.objecion ? objLabel(ctx.objecion) : null

  return (
    <div className="drawer-wrap" onClick={onClose}>
      <aside className="drawer" style={{ '--accent': accent }} onClick={(e) => e.stopPropagation()}>
        <div className="drawer__head">
          <span className="chip chip--stage" style={{ color: accent, borderColor: accent + '55' }}>
            {colLabel(card.col)}
          </span>
          <button className="drawer__close" onClick={onClose} aria-label="Cerrar">✕</button>
        </div>

        <div className="drawer__title">{card.name}</div>
        <div className="drawer__sub">
          {ctx?.empresa && ctx.empresa !== card.name ? ctx.empresa + ' · ' : ''}
          {card.ciudad} · <span className="lead-id">{card.id}</span>
        </div>
        <div className="drawer__value" style={{ color: accent }}>
          {pesoCompact(card.value)} <span className="muted" style={{ fontSize: 12, fontWeight: 400 }}>· {card.bot} · {card.ocasion}</span>
        </div>

        {!ctx ? (
          <div className="empty" style={{ padding: 28 }}>
            Sin contexto recopilado todavía. El agente lo construye en la conversación.
          </div>
        ) : (
          <>
            <div className="drawer__section">
              <div className="drawer__label">Contexto que viaja</div>
              <div className="ctx-grid">
                <Field label="Línea de negocio"><span className="chip">{ctx.linea}</span></Field>
                <Field label="Propósito">{ctx.proposito}</Field>
                <Field label="Fecha objetivo">{ctx.fechaObjetivo || '— por definir'}</Field>
                <Field label="Canal preferido">{ctx.canalPreferido}</Field>
                <Field label="Presupuesto"><span className={'tag-budget tag-' + ctx.budget}>{ctx.budget}</span></Field>
                <Field label="ICP fit">
                  <span className="icp"><span className="icp__bar"><i style={{ width: ctx.icpFit + '%', background: accent }} /></span>{ctx.icpFit}</span>
                </Field>
                <Field label="Autoridad">{ctx.authority}</Field>
                <Field label="Stakeholders">{ctx.stakeholders.length ? ctx.stakeholders.join(' · ') : '—'}</Field>
              </div>
            </div>

            <div className="drawer__section">
              <div className="drawer__label">Última promesa</div>
              <div className="promise">
                <span>{ctx.ultimaPromesa || 'Ninguna registrada'}</span>
                {ctx.promesaStatus && (
                  <span className={'chip ' + (ctx.promesaStatus === 'pendiente' ? 'chip--idle' : 'chip--ok')}>
                    {ctx.promesaStatus}
                  </span>
                )}
              </div>
              <div className="next-action">
                <span className="drawer__label" style={{ marginBottom: 6 }}>Próxima acción</span>
                {ctx.nextAction}
                {ctx.touches > 0 && <span className="touches">· {ctx.touches} toque(s) sin respuesta</span>}
              </div>
            </div>

            {obj && (
              <div className="drawer__section">
                <div className="drawer__label">Objeción abierta</div>
                <div className="objection">
                  <span className="chip chip--react">{obj.tipica}</span>
                  <p className="muted" style={{ fontSize: 12.5, lineHeight: 1.5, marginTop: 8 }}>{obj.marco}</p>
                </div>
              </div>
            )}

            <div className="drawer__section">
              <div className="drawer__label">
                Compuerta · calificación
                <span className="gate-pct" style={{ color: completeness >= 80 ? 'var(--green)' : completeness >= 50 ? 'var(--gold)' : 'var(--red)' }}>
                  {completeness}% completo
                </span>
              </div>
              <div className="gate-list">
                {checks.map((c) => (
                  <div className="gate-item" key={c.f}>
                    <span className={'gate-dot' + (c.ok ? ' ok' : '')}>{c.ok ? '✓' : '○'}</span>
                    <span className="gate-name">{c.f === 'fechaObjetivo' ? 'fecha objetivo' : c.f}</span>
                    <span className="gate-val">{String(c.val)}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="drawer__section">
              <div className="drawer__label">Línea de tiempo · eventos</div>
              <div className="timeline">
                {ctx.events.map((ev, i) => (
                  <div className="tl-row" key={i}>
                    <span className="tl-dot" style={{ background: accent }} />
                    <span className="tl-e">{ev.e}</span>
                    <span className="tl-t">{ev.t}</span>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </aside>
    </div>
  )
}

export default function Leads({ board, setBoard, query = '' }) {
  const dragId = useRef(null)
  const draggedRef = useRef(false)
  const [overCol, setOverCol] = useState(null)
  const [selected, setSelected] = useState(null)

  const q = query.trim().toLowerCase()
  const match = (c) => !q || [c.name, c.ciudad, c.ocasion, c.bot].join(' ').toLowerCase().includes(q)

  const pipeline = board.filter((c) => c.col !== 'cerrado').reduce((s, c) => s + (c.value || 0), 0)
  const cerrado = board.filter((c) => c.col === 'cerrado').reduce((s, c) => s + (c.value || 0), 0)

  const onDrop = (colKey) => {
    const id = dragId.current
    setOverCol(null)
    dragId.current = null
    if (!id) return
    setBoard((prev) => prev.map((c) => (c.id === id ? { ...c, col: colKey } : c)))
  }

  const openCard = (c) => {
    if (draggedRef.current) {
      draggedRef.current = false
      return
    }
    setSelected(c)
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
            Arrastra una tarjeta entre columnas — el pipeline se recalcula y persiste. Toca cualquier
            lead para abrir su <b style={{ color: 'var(--ink)' }}>contexto que viaja</b>: qué pidió, qué
            objetó, qué se le prometió y en qué etapa está.
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
          const colTotal = board.filter((c) => c.col === col.key).reduce((s, c) => s + (c.value || 0), 0)
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
                    onDragStart={() => {
                      dragId.current = c.id
                      draggedRef.current = true
                    }}
                    onDragEnd={() => {
                      dragId.current = null
                      setOverCol(null)
                    }}
                    onClick={() => openCard(c)}
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
          {board.length} oportunidades · arrastra para mover · toca para ver contexto
        </span>
      </div>

      <LeadDrawer card={selected} onClose={() => setSelected(null)} />
    </section>
  )
}
