import { useEffect, useState } from 'react'
import { brand } from '../data/circulo.js'

// El momento de marca: el orbe concéntrico de Círculo floreciendo sobre negro
// puro — en clave de invitación Apple. Toca para entrar (o se desvanece solo).
export default function Splash({ onDone }) {
  const [leaving, setLeaving] = useState(false)

  const leave = () => {
    if (leaving) return
    setLeaving(true)
    setTimeout(onDone, 650)
  }

  useEffect(() => {
    const t = setTimeout(leave, 3200)
    return () => clearTimeout(t)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className={'splash' + (leaving ? ' is-leaving' : '')} onClick={leave} role="button" tabIndex={0}>
      <div className="orb" aria-hidden>
        <span className="orb__l orb__halo" />
        <span className="orb__l orb__a" />
        <span className="orb__l orb__b" />
        <span className="orb__l orb__c" />
        <span className="orb__l orb__core" />
        {[0, 1, 2, 3, 4].map((i) => (
          <span
            key={i}
            className="orb__ripple"
            style={{ '--i': i, '--o': (0.42 - i * 0.08).toFixed(2) }}
          />
        ))}
        <span className="orb__ring" />
      </div>
      <div className="splash__brand">
        {brand.name} <span>{brand.sub}</span>
      </div>
      <h1 className="splash__title">
        Una sola <span>verdad.</span>
      </h1>
      <p className="splash__sub">De marketing a ventas.</p>
      <span className="splash__hint">toca para entrar</span>
    </div>
  )
}
