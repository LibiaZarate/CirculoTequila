import { handoff, lossReasons, peso, periods } from '../data/circulo.js'

export default function Conversion() {
  const maxLoss = Math.max(...lossReasons.map((r) => r.value))
  const totalLost = lossReasons.reduce((s, r) => s + r.value, 0)
  const won = handoff.segments.find((s) => s.label === 'Ganadas')?.value || 0
  const winRate = Math.round((won / handoff.total) * 100)

  return (
    <section>
      <div className="section-head">
        <div>
          <div className="eyebrow">Sección 06</div>
          <h1 className="headline">Conversión comercial</h1>
          <p className="subhead">
            El punto ciego de hoy: qué pasa después de transferir al área comercial. Ganadas, abiertas,
            perdidas y — sobre todo — por qué se perdieron.
          </p>
        </div>
      </div>

      <div className="callout" style={{ marginBottom: 24 }}>
        Hoy esto es una <b>caja negra</b>: una vez que el lead pasa a ventas no hay visibilidad clara
        de su estado ni de su resultado. Esta sección la convierte en números.
      </div>

      <div className="kpis">
        <div className="kpi">
          <div className="kpi__label">Enviadas a ventas</div>
          <div className="kpi__value">{handoff.total}</div>
          <div className="kpi__note">cohorte del mes</div>
        </div>
        <div className="kpi">
          <div className="kpi__label">Ganadas</div>
          <div className="kpi__value tone-green">{won}</div>
          <div className="kpi__note">{winRate}% win rate</div>
        </div>
        <div className="kpi">
          <div className="kpi__label">Tiempo de cierre</div>
          <div className="kpi__value">{handoff.closeDays}d</div>
          <div className="kpi__note">promedio</div>
        </div>
        <div className="kpi">
          <div className="kpi__label">Ventas del mes</div>
          <div className="kpi__value tone-gold" style={{ fontSize: 24 }}>{peso(periods.mes.revenue)}</div>
          <div className="kpi__note">ticket prom. {peso(periods.mes.ticket)}</div>
        </div>
      </div>

      <div className="grid grid--2">
        <div className="card">
          <h3 className="section-title">Estado de las oportunidades</h3>
          <div className="stackbar" style={{ height: 14 }}>
            {handoff.segments.map((s) => (
              <span key={s.label} className={'bg-' + s.tone} style={{ width: (s.value / handoff.total) * 100 + '%' }} />
            ))}
          </div>
          <div className="legend" style={{ marginTop: 18 }}>
            {handoff.segments.map((s) => (
              <div className="legend__row" key={s.label}>
                <span className="l">
                  <span className={'dot-mini bg-' + s.tone} />
                  {s.label}
                </span>
                <b>
                  {s.value} <span className="muted" style={{ fontWeight: 400 }}>· {Math.round((s.value / handoff.total) * 100)}%</span>
                </b>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <h3 className="section-title">Motivos de pérdida · últimos 90 días</h3>
          <div className="bars">
            {lossReasons.map((r) => (
              <div key={r.reason}>
                <div className="bar__top">
                  <div className="bar__name" style={{ fontSize: 13 }}>{r.reason}</div>
                  <div className="bar__pct" style={{ fontSize: 14 }}>{r.value}</div>
                </div>
                <div className="bar__track">
                  <div
                    className={'bar__fill ' + (r.reason.includes('seguimiento') ? 'fill-red' : 'fill-golddim')}
                    style={{ width: (r.value / maxLoss) * 100 + '%' }}
                  />
                </div>
              </div>
            ))}
          </div>
          <p className="bar__meta" style={{ marginLeft: 0, marginTop: 16, lineHeight: 1.5 }}>
            La causa #1 ({lossReasons[0].value} de {totalLost}) es <b style={{ color: 'var(--red)' }}>falta de
            seguimiento</b> — exactamente lo que la cola de Seguimientos ataca.
          </p>
        </div>
      </div>
    </section>
  )
}
