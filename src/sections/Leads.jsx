import { useRef, useState } from 'react'
import { stages, stageAccents, leadContext, gateFields, arquitectura, pesoCompact } from '../data/circulo.js'

const stageLabel = (n) => stages.find((s) => s.n === n)?.label || '—'
const accentOf = (n) => stageAccents[n] || '#e9b65d'
const objLabel = (cat) => arquitectura.objeciones.find((o) => o.cat === cat)

const marketing = stages.filter((s) => s.n <= 4)
const comercial = stages.filter((s) => s.n >= 5)

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
  const accent = accentOf(card.stage)

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
            Etapa {card.stage} · {stageLabel(card.stage)}
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
        {card.tags?.length > 0 && (
          <div className="kcard__tags" style={{ marginTop: 12 }}>
            {card.tags.map((t) => (
              <span key={t} className={'ktag' + (t === 'reactivación' ? ' ktag--react' : '')}>{t}</span>
            ))}
          </div>
        )}

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

function Column({ stage, board, match, overStage, setOverStage, onDrop, openCard }) {
  const accent = accentOf(stage.n)
  const cards = board.filter((c) => c.stage === stage.n && match(c))
  const colTotal = board.filter((c) => c.stage === stage.n).reduce((s, c) => s + (c.value || 0), 0)
  return (
    <div
      className={'kcol' + (overStage === stage.n ? ' is-over' : '')}
      style={{ '--accent': accent }}
      onDragOver={(e) => {
        e.preventDefault()
        if (overStage !== stage.n) setOverStage(stage.n)
      }}
      onDragLeave={(e) => {
        if (e.currentTarget === e.target) setOverStage(null)
      }}
      onDrop={() => onDrop(stage.n)}
    >
      <div className="kcol__head">
        <span className="kcol__num" style={{ background: accent }}>{stage.n}</span>
        <span className="kcol__label">{stage.label}</span>
        <span className="kcount">{board.filter((c) => c.stage === stage.n).length}</span>
      </div>
      <div className="kcol__total">{colTotal ? pesoCompact(colTotal) : '—'}</div>
      <div className="kcol__body">
        {cards.map((c) => (
          <article
            key={c.id}
            className="kcard"
            draggable
            onDragStart={(e) => {
              e.dataTransfer.setData('text/plain', c.id)
              openCard.drag.current = true
              openCard.id.current = c.id
            }}
            onDragEnd={() => {
              openCard.id.current = null
              setOverStage(null)
            }}
            onClick={() => openCard.click(c)}
          >
            <div className="kcard__top">
              <span className="kcard__name">{c.name}</span>
              <span className="kcard__handle" aria-hidden>⋮⋮</span>
            </div>
            <div className="kcard__meta">{c.ciudad} · {c.bot} · {c.ocasion}</div>
            <div className="kcard__val" style={{ color: accent }}>{pesoCompact(c.value)}</div>
            {c.tags?.length > 0 && (
              <div className="kcard__tags">
                {c.tags.map((t) => (
                  <span key={t} className={'ktag' + (t === 'reactivación' ? ' ktag--react' : '')}>{t}</span>
                ))}
              </div>
            )}
          </article>
        ))}
        <div className="kcol__drop">soltar aquí</div>
      </div>
    </div>
  )
}

export default function Leads({ board, setBoard, query = '' }) {
  const dragId = useRef(null)
  const draggedRef = useRef(false)
  const [overStage, setOverStage] = useState(null)
  const [selected, setSelected] = useState(null)

  const q = query.trim().toLowerCase()
  const match = (c) => !q || [c.name, c.ciudad, c.ocasion, ...(c.tags || [])].join(' ').toLowerCase().includes(q)

  const pipeline = board.filter((c) => c.stage >= 3 && c.stage < 10).reduce((s, c) => s + (c.value || 0), 0)
  const entregado = board.filter((c) => c.stage === 10).reduce((s, c) => s + (c.value || 0), 0)

  const onDrop = (stageN) => {
    const id = dragId.current
    setOverStage(null)
    dragId.current = null
    if (!id) return
    setBoard((prev) => prev.map((c) => (c.id === id ? { ...c, stage: stageN } : c)))
  }

  const openCard = {
    drag: draggedRef,
    id: dragId,
    click: (c) => {
      if (draggedRef.current) {
        draggedRef.current = false
        return
      }
      setSelected(c)
    },
  }

  return (
    <section>
      <div className="section-head">
        <div>
          <div className="eyebrow">Leads · mapa de proceso</div>
          <h1 className="headline">
            Pipeline <span className="gold">vivo.</span>
          </h1>
          <p className="subhead">
            La trazabilidad real: las 10 etapas del proceso, de marketing a comercial, con la compuerta
            MQL→SQL en medio. Arrastra para mover de etapa; toca un lead para abrir su{' '}
            <b style={{ color: 'var(--ink)' }}>contexto que viaja</b>.
          </p>
        </div>
        <div className="pipeline-badge">
          <span className="pipeline-badge__label">pipeline_calificado</span>
          <span className="pipeline-badge__value">{pesoCompact(pipeline)}</span>
          <span className="pipeline-badge__sub">entregado {pesoCompact(entregado)}</span>
        </div>
      </div>

      <div className="pipeline">
        <div className="pzones">
          <div className="pzone tone-teal" style={{ gridColumn: '1 / 5' }}>
            <span className="dot-mini bg-teal" /> Zona marketing · nutrición
          </div>
          <div style={{ gridColumn: '5 / 6' }} />
          <div className="pzone tone-gold" style={{ gridColumn: '6 / 12' }}>
            <span className="dot-mini bg-gold" /> Zona comercial · cierre
          </div>
        </div>

        <div className="kanban">
          {marketing.map((s) => (
            <Column key={s.n} stage={s} board={board} match={match} overStage={overStage} setOverStage={setOverStage} onDrop={onDrop} openCard={openCard} />
          ))}
          <div className="pgate" aria-hidden>
            <span className="pgate__line" />
            <span className="pgate__label">compuerta · MQL → SQL</span>
          </div>
          {comercial.map((s) => (
            <Column key={s.n} stage={s} board={board} match={match} overStage={overStage} setOverStage={setOverStage} onDrop={onDrop} openCard={openCard} />
          ))}
        </div>
      </div>

      <div className="kanban-foot">
        <span className="foot-live">
          <span className="dot-live" />
          sync · wa.api
        </span>
        <span className="muted" style={{ fontSize: 11.5 }}>
          {board.length} oportunidades · arrastra para mover de etapa · toca para ver contexto
        </span>
      </div>

      <LeadDrawer card={selected} onClose={() => setSelected(null)} />
    </section>
  )
}
