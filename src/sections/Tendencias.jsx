import { trends } from '../data/circulo.js'
import { TrendLine, Sparkline } from '../components/Charts.jsx'

const order = ['leads', 'conversion', 'calidad', 'sinMovimiento', 'cierre']
const tones = {
  leads: '#e6b35a',
  conversion: '#62cf86',
  calidad: '#46c9a0',
  sinMovimiento: '#7aa7d8',
  cierre: '#e6b35a',
}

const fmt = (v, unit) => (Number.isInteger(v) ? v : v.toFixed(unit === '' ? 2 : 1)) + unit

export default function Tendencias() {
  return (
    <section>
      <div className="section-head">
        <div>
          <div className="eyebrow">Sección 07</div>
          <h1 className="headline">Tendencias</h1>
          <p className="subhead">
            La fotografía del momento es útil; la película es la que decide. Seis semanas de evolución
            para ver qué está mejorando y qué se está estancando.
          </p>
        </div>
      </div>

      <div className="card" style={{ marginBottom: 18 }}>
        <div className="card__head">
          <span className="card__title">§ leads generados · 6 semanas</span>
        </div>
        <TrendLine data={trends.series.leads.data} color="#e6b35a" height={190} />
        <div className="trend-x">
          {trends.weekLabels.map((w) => (
            <span key={w}>{w}</span>
          ))}
        </div>
      </div>

      <div className="grid grid--2">
        {order.slice(1).map((key) => {
          const s = trends.series[key]
          const first = s.data[0]
          const last = s.data[s.data.length - 1]
          const goodDown = key === 'sinMovimiento' || key === 'cierre'
          const improved = goodDown ? last < first : last > first
          return (
            <div className="card" key={key} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 18 }}>
              <div>
                <div className="kpi__label">{s.label}</div>
                <div className="kpi__value" style={{ marginTop: 10 }}>{fmt(last, s.unit)}</div>
                <div className={'delta ' + (improved ? 'up' : 'down')} style={{ fontSize: 12.5, marginTop: 6 }}>
                  <span className="tri">{improved ? '▲' : '▼'}</span>
                  desde {fmt(first, s.unit)} hace 6 sem
                </div>
              </div>
              <Sparkline data={s.data} color={tones[key]} width={150} height={56} />
            </div>
          )
        })}
      </div>

      <div className="callout" style={{ marginTop: 18 }}>
        Lectura de la semana: la conversión global sube <b>+3.1 pts</b>, la calidad de lead pasa de{' '}
        <b>0.61 a 0.72</b> y el tiempo sin movimiento baja <b>1.4 días</b>. El embudo se está volviendo
        más limpio y más rápido.
      </div>
    </section>
  )
}
