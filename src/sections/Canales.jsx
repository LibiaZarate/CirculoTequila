import { channels, channelsCaption } from '../data/circulo.js'

export default function Canales() {
  const totalLeads = channels.reduce((s, c) => s + c.leads, 0)
  const best = [...channels].sort((a, b) => b.pct - a.pct)[0]
  const volume = [...channels].sort((a, b) => b.leads - a.leads)[0]

  return (
    <section>
      <div className="section-head">
        <div>
          <div className="eyebrow">Sección 05</div>
          <h1 className="headline">Rendimiento por canal</h1>
          <p className="subhead">
            No todo lo que trae volumen trae clientes. Aquí se separa quién llena la bandeja de quién
            llena el pipeline — para decidir dónde invertir.
          </p>
        </div>
      </div>

      <div className="kpis">
        <div className="kpi">
          <div className="kpi__label">Leads del mes</div>
          <div className="kpi__value">{totalLeads}</div>
          <div className="kpi__note">todos los canales</div>
        </div>
        <div className="kpi">
          <div className="kpi__label">Mejor conversión</div>
          <div className="kpi__value tone-green">{best.pct}%</div>
          <div className="kpi__note">{best.name}</div>
        </div>
        <div className="kpi">
          <div className="kpi__label">Mayor volumen</div>
          <div className="kpi__value tone-gold">{volume.leads}</div>
          <div className="kpi__note">{volume.name}</div>
        </div>
        <div className="kpi">
          <div className="kpi__label">Canales activos</div>
          <div className="kpi__value">{channels.length}</div>
          <div className="kpi__note">Meta, web, referidos, eventos, mailing</div>
        </div>
      </div>

      <div className="card" style={{ marginBottom: 18 }}>
        <h3 className="section-title">Conversión a cliente por canal</h3>
        <div className="bars">
          {channels.map((c) => (
            <div key={c.name}>
              <div className="bar__top">
                <div>
                  <div className="bar__name">
                    <span className={'dot-mini bg-' + c.tone} />
                    {c.name}
                  </div>
                  <div className="bar__meta">{c.leads} leads · calidad {c.quality}</div>
                </div>
                <div className={'bar__pct tone-' + c.tone}>{c.pct}%</div>
              </div>
              <div className="bar__track">
                <div className={'bar__fill fill-' + c.tone} style={{ width: c.pct * 2.6 + '%' }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="callout">
        {channelsCaption} <b>Meta Ads</b> aporta {volume.leads} de {totalLeads} leads pero convierte al{' '}
        {volume.pct}%; <b>{best.name}</b> casi no traen volumen pero convierten al {best.pct}%. La
        palanca de 90 días: calificar mejor el volumen de Meta y pedir más referidos.
      </div>
    </section>
  )
}
