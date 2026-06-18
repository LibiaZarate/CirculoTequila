import { useEffect, useRef, useState } from 'react'
import { brand, nav, leads } from './data/circulo.js'
import Panel from './sections/Panel.jsx'
import Leads from './sections/Leads.jsx'
import Agente from './sections/Agente.jsx'
import Seguimientos from './sections/Seguimientos.jsx'
import Canales from './sections/Canales.jsx'
import Conversion from './sections/Conversion.jsx'
import Tendencias from './sections/Tendencias.jsx'

function exportLeadsCSV() {
  const cols = ['id', 'nombre', 'empresa', 'canal', 'ciudad', 'stage', 'responsable', 'ultima', 'dias', 'proximo', 'botellas', 'valor']
  const head = cols.join(',')
  const rows = leads.map((l) =>
    cols
      .map((c) => {
        const v = l[c] == null ? '' : String(l[c]).replace(/"/g, '""')
        return /[",\n]/.test(v) ? `"${v}"` : v
      })
      .join(','),
  )
  const blob = new Blob(['﻿' + [head, ...rows].join('\n')], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `circulo-leads-${new Date().toISOString().slice(0, 10)}.csv`
  a.click()
  URL.revokeObjectURL(url)
}

export default function App() {
  const [section, setSection] = useState('panel')
  const [period, setPeriod] = useState('mes')
  const [query, setQuery] = useState('')
  const searchRef = useRef(null)

  // ⌘K / Ctrl+K para enfocar la búsqueda
  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        searchRef.current?.focus()
      }
      if (e.key === 'Escape') {
        setQuery('')
        searchRef.current?.blur()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const onSearch = (v) => {
    setQuery(v)
    if (v && section !== 'leads' && section !== 'seguimientos') setSection('leads')
  }

  const sections = {
    panel: <Panel period={period} setPeriod={setPeriod} goTo={setSection} />,
    leads: <Leads query={query} />,
    agente: <Agente />,
    seguimientos: <Seguimientos />,
    canales: <Canales />,
    conversion: <Conversion />,
    tendencias: <Tendencias />,
  }

  return (
    <div className="app">
      <aside className="sidebar">
        <div className="brand">
          <div className="brand__edition">{brand.edition}</div>
          <div className="brand__name">
            {brand.name}
            <span className="reg">®</span>
          </div>
          <div className="brand__sub">{brand.sub}</div>
          <div className="brand__tag">{brand.tagline}</div>
        </div>

        <nav className="nav">
          {nav.map((item) => (
            <button
              key={item.key}
              className={'nav__item' + (section === item.key ? ' is-active' : '')}
              onClick={() => {
                setSection(item.key)
                if (item.key !== 'leads' && item.key !== 'seguimientos') setQuery('')
              }}
            >
              <span className="nav__num">{item.n}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="sidebar__foot">
          <span className="foot-live">
            <span className="dot-live" />
            datos en vivo · hace 4 min
          </span>
          <span className="foot-ref">
            {brand.ref} · {brand.geo}
          </span>
        </div>
      </aside>

      <main className="main">
        <div className="topbar">
          <label className="search">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="7" />
              <path d="m21 21-4.3-4.3" strokeLinecap="round" />
            </svg>
            <input
              ref={searchRef}
              value={query}
              onChange={(e) => onSearch(e.target.value)}
              placeholder="Preguntar al sistema de Círculo… (busca leads, empresas, canales)"
            />
            <span className="search__kbd">⌘K</span>
          </label>

          <span className="pill-live">
            <span className="dot-live" />
            datos en vivo
          </span>

          <button className="btn-export" onClick={exportLeadsCSV} title="Exportar leads a CSV">
            Exportar
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
              <path d="M7 17 17 7M9 7h8v8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>

        <div key={section} className="fade-in">
          {sections[section]}
        </div>
      </main>
    </div>
  )
}
