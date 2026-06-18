import { useMemo, useState } from 'react'
import { leads, stages, reactivationStage, peso } from '../data/circulo.js'

const stageLabel = (s) =>
  s === 'reactivacion' ? reactivationStage.label : stages.find((x) => x.n === s)?.label || '—'

function StageChip({ s, dias }) {
  if (s === 'reactivacion') return <span className="chip chip--stage chip--react">Reactivación</span>
  const idle = dias >= 5
  return (
    <span className={'chip chip--stage' + (idle ? ' chip--idle' : '')}>
      E{s} · {stageLabel(s)}
    </span>
  )
}

const filters = [
  { key: 'todos', label: 'Todos', test: () => true },
  { key: 'mkt', label: 'En marketing', test: (l) => l.responsable.includes('mkt') && l.stage !== 'reactivacion' },
  { key: 'ventas', label: 'En ventas', test: (l) => l.responsable.includes('ventas') },
  { key: 'idle', label: 'Sin movimiento +5d', test: (l) => typeof l.dias === 'number' && l.dias >= 5 && l.stage !== 'reactivacion' },
  { key: 'react', label: 'Reactivación', test: (l) => l.stage === 'reactivacion' },
]

export default function Leads({ query = '' }) {
  const [filter, setFilter] = useState('todos')

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase()
    const f = filters.find((x) => x.key === filter)
    return leads
      .filter((l) => f.test(l))
      .filter((l) =>
        !q
          ? true
          : [l.nombre, l.empresa, l.canal, l.ciudad, l.id, l.proposito, stageLabel(l.stage)]
              .join(' ')
              .toLowerCase()
              .includes(q),
      )
  }, [query, filter])

  const total = leads.length
  const enVentas = leads.filter((l) => l.responsable.includes('ventas')).length
  const idle = leads.filter((l) => typeof l.dias === 'number' && l.dias >= 7).length
  const react = leads.filter((l) => l.stage === 'reactivacion').length

  return (
    <section>
      <div className="section-head">
        <div>
          <div className="eyebrow">Sección 02</div>
          <h1 className="headline">Jardín de leads</h1>
          <p className="subhead">
            Cada oportunidad viva: en qué etapa está, quién la tiene, su última interacción, el tiempo
            sin movimiento y el próximo paso. La fuente única que hoy vive repartida entre WhatsApp y
            hojas de cálculo.
          </p>
        </div>
      </div>

      <div className="kpis">
        <div className="kpi">
          <div className="kpi__label">Leads activos</div>
          <div className="kpi__value">{total}</div>
          <div className="kpi__note">en el embudo ahora</div>
        </div>
        <div className="kpi">
          <div className="kpi__label">En manos de ventas</div>
          <div className="kpi__value">{enVentas}</div>
          <div className="kpi__note">transferidos a comercial</div>
        </div>
        <div className="kpi">
          <div className="kpi__label">Sin movimiento +7d</div>
          <div className="kpi__value" style={{ color: idle ? 'var(--red)' : undefined }}>{idle}</div>
          <div className="kpi__note">riesgo de enfriarse</div>
        </div>
        <div className="kpi">
          <div className="kpi__label">En reactivación</div>
          <div className="kpi__value" style={{ color: 'var(--gold)' }}>{react}</div>
          <div className="kpi__note">recuperables con seguimiento</div>
        </div>
      </div>

      <div className="card">
        <div className="card__head" style={{ marginBottom: 18, justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {filters.map((f) => (
              <button
                key={f.key}
                className={'chip' + (filter === f.key ? ' chip--idle' : '')}
                onClick={() => setFilter(f.key)}
              >
                {f.label}
              </button>
            ))}
          </div>
          {query && <span className="muted" style={{ fontSize: 12 }}>filtrando: “{query}”</span>}
        </div>

        {rows.length === 0 ? (
          <div className="empty">Sin leads que coincidan con la búsqueda.</div>
        ) : (
          <table className="lead-table">
            <thead>
              <tr>
                <th>Lead</th>
                <th>Etapa</th>
                <th>Canal</th>
                <th>Responsable</th>
                <th>Sin mov.</th>
                <th>Próximo paso</th>
                <th style={{ textAlign: 'right' }}>Valor est.</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((l) => (
                <tr key={l.id}>
                  <td>
                    <div className="lead-name">{l.nombre}</div>
                    <div className="lead-emp">{l.empresa} · {l.ciudad}</div>
                    <div className="lead-id">{l.id}</div>
                  </td>
                  <td><StageChip s={l.stage} dias={l.dias} /></td>
                  <td><span className="lead-resp">{l.canal}</span></td>
                  <td><span className="lead-resp">{l.responsable}</span></td>
                  <td>
                    <span className={'days' + (l.dias >= 7 ? ' hot' : '')}>{l.dias}d</span>
                    <div className="lead-resp" style={{ fontSize: 10.5 }}>{l.ultima}</div>
                  </td>
                  <td><div className={'lead-next' + (l.proximo.startsWith('⚠') ? ' warn' : '')}>{l.proximo}</div></td>
                  <td style={{ textAlign: 'right' }}>
                    <span className="lead-name" style={{ fontVariantNumeric: 'tabular-nums' }}>{peso(l.valor)}</span>
                    {l.botellas && <div className="lead-resp" style={{ fontSize: 10.5 }}>{l.botellas} × {l.formato}</div>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </section>
  )
}
