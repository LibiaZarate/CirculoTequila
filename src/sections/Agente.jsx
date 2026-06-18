import { useState } from 'react'
import { agent, pricing, peso } from '../data/circulo.js'

export default function Agente() {
  const [open, setOpen] = useState(null)

  return (
    <section>
      <div className="section-head">
        <div>
          <div className="eyebrow">Sección 03</div>
          <h1 className="headline">Agente IA</h1>
          <p className="subhead">{agent.intro}</p>
        </div>
      </div>

      <div className="stack">
        {/* Puede / No puede */}
        <div className="grid grid--2">
          <div className="card">
            <h3 className="section-title">Qué puede hacer</h3>
            <ul className="list-check">
              {agent.canDo.map((t, i) => (
                <li key={i}>{t}</li>
              ))}
            </ul>
          </div>
          <div className="card">
            <h3 className="section-title">Qué nunca promete</h3>
            <ul className="list-x">
              {agent.cannot.map((t, i) => (
                <li key={i}>{t}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Escalamiento */}
        <div className="card">
          <h3 className="section-title">Escala a un humano cuando…</h3>
          <div className="grid grid--2" style={{ gap: '10px 28px' }}>
            <ul className="list-check" style={{ gap: 11 }}>
              {agent.escalation.slice(0, 4).map((t, i) => (
                <li key={i} style={{ color: 'var(--ink-soft)' }}>
                  <span style={{ color: 'var(--gold)', fontWeight: 700 }}>↗</span> {t}
                </li>
              ))}
            </ul>
            <ul className="list-check" style={{ gap: 11 }}>
              {agent.escalation.slice(4).map((t, i) => (
                <li key={i} style={{ color: 'var(--ink-soft)' }}>
                  <span style={{ color: 'var(--gold)', fontWeight: 700 }}>↗</span> {t}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Valores */}
        <div className="card">
          <h3 className="section-title">Valores no negociables</h3>
          <div className="grid grid--3">
            {agent.values.map((v) => (
              <div className="value-card" key={v.title}>
                <h4>{v.title}</h4>
                <p>{v.body}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Precios */}
        <div className="grid grid--2">
          <div className="card">
            <h3 className="section-title">Precios · línea regular</h3>
            <table className="price-table">
              <thead>
                <tr>
                  <th>Producto</th>
                  <th>Presentación</th>
                  <th>Precio MXN</th>
                </tr>
              </thead>
              <tbody>
                {pricing.linea.map((r, i) => (
                  <tr key={i}>
                    <td>{r.producto}</td>
                    <td>{r.ml}</td>
                    <td>{peso(r.precio)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <h3 className="section-title" style={{ margin: '24px 0 12px' }}>
              Ediciones empresariales
            </h3>
            <table className="price-table">
              <tbody>
                {pricing.empresarial.map((r, i) => (
                  <tr key={i}>
                    <td>{r.producto}</td>
                    <td>{r.ml}</td>
                    <td>{peso(r.precio)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="card">
            <h3 className="section-title">Reglas que no se rompen</h3>
            <ul className="list-check" style={{ marginBottom: 22 }}>
              {pricing.reglas.map((r, i) => (
                <li key={i}>{r}</li>
              ))}
            </ul>
            <div className="callout">
              Material para enviar al prospecto:{' '}
              <a href={agent.materials} target="_blank" rel="noreferrer">
                carpeta de Drive ↗
              </a>
            </div>
          </div>
        </div>

        {/* Guiones */}
        <div className="card">
          <h3 className="section-title">Guiones del agente</h3>
          <div className="grid grid--3">
            {agent.scripts.map((s) => (
              <div className="script" key={s.n}>
                <div className="script__n">MENSAJE {s.n}</div>
                <div className="script__title">{s.title}</div>
                <div className="script__body">{s.body}</div>
              </div>
            ))}
          </div>
        </div>

        {/* FAQs */}
        <div className="card">
          <h3 className="section-title">Preguntas frecuentes</h3>
          {agent.faqs.map((f, i) => (
            <div className={'faq' + (open === i ? ' open' : '')} key={i}>
              <button className="faq__q" onClick={() => setOpen(open === i ? null : i)}>
                {f.q}
                <span className="plus">+</span>
              </button>
              <div className="faq__a">{f.a}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
