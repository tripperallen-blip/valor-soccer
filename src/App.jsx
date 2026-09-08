import { useState } from 'react'
import varsityData from '../data/varsity.json'
import './App.css'

const GRADE_LABELS = {
  FR: 'Freshman',
  SO: 'Sophomore',
  JR: 'Junior',
  SR: 'Senior',
}

function Logo() {
  return (
    <svg className="logo" viewBox="0 0 100 120" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M50 4L8 22V62C8 86 26 106 50 116C74 106 92 86 92 62V22L50 4Z" fill="#2a4a8a" stroke="#5a8ac8" strokeWidth="2" />
      <path d="M50 14L16 29V62C16 82 31 99 50 108C69 99 84 82 84 62V29L50 14Z" fill="#1b2a5e" />
      <rect x="46" y="24" width="8" height="28" rx="2" fill="white" />
      <rect x="36" y="32" width="28" height="8" rx="2" fill="white" />
      <circle cx="50" cy="76" r="14" fill="#3a5a90" stroke="#7aaad0" strokeWidth="1.5" />
      <path d="M50 64 L44 70 L46 78 L54 78 L56 70 Z" fill="white" opacity="0.7" />
      <path d="M28 54 H72 L68 62 H32 Z" fill="#5a8ac8" />
      <text x="50" y="61" textAnchor="middle" fill="#ffffff" fontSize="7" fontFamily="Helvetica, Arial, sans-serif" fontWeight="normal">VALOR</text>
    </svg>
  )
}

function Roster({ team }) {
  return (
    <>
      <div className="coaches-bar">
        {(team.coaches ?? []).map((c) => (
          <div className="coach-item" key={`${c.role}-${c.name}`}>
            <strong>{c.role}</strong>
            {c.name}
          </div>
        ))}
      </div>
      <table className="roster-table">
        <tbody>
          {(team.roster ?? []).map((p, i) => (
            <tr key={`${p.number}-${p.name}-${i}`}>
              <td className="num">{p.number}</td>
              <td className="player-name">
                <span className="player-name-text">{p.name}</span>
                <strong className="year-badge">{GRADE_LABELS[p.year] ?? p.year}</strong>
              </td>
              <td className="parents">{p.parents}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}

function opponentCell(game) {
  if (game.home === null) return game.opponent
  if (game.home) {
    return (
      <>
        <span className="home-badge">H</span>
        {game.opponent}
      </>
    )
  }
  return <span className="away">@ {game.opponent}</span>
}

function scoreCell(game) {
  if (game.result) {
    const cls = game.result.toLowerCase()
    return (
      <div className={`result-badge result-${cls}`}>
        <span>{game.score}</span>
        <span className={`result-letter ${cls}`}>{game.result}</span>
      </div>
    )
  }
  return (
    <span style={{ color: '#333', fontSize: '0.8rem' }}>—</span>
  )
}

function Schedule({ team }) {
  const schedule = team.schedule ?? []
  let w = 0
  let l = 0
  let tie = 0
  schedule.forEach((g) => {
    if (g.result === 'W') w++
    else if (g.result === 'L') l++
    else if (g.result === 'T') tie++
  })
  const hasResults = w + l + tie > 0

  return (
    <>
      {hasResults && (
        <div className="record-bar">
          <span>Record</span>
          <span className="record-val">
            <span className="record-w">{w}W</span>
            {' – '}
            <span className="record-l">{l}L</span>
            {tie > 0 && (
              <>
                {' – '}
                <span className="record-t">{tie}T</span>
              </>
            )}
          </span>
        </div>
      )}
      <table className="schedule-table">
        <tbody>
          {schedule.map((g, i) => (
            <tr key={`${g.date}-${g.opponent}-${i}`} className={g.playoff ? 'playoff-row' : undefined}>
              <td className="date-col" style={g.playoff ? { color: '#333' } : undefined}>
                {g.date}
              </td>
              <td className="day-col">{g.day}</td>
              <td
                className="opp-col"
                style={g.playoff ? { color: '#333' } : undefined}
              >
                {opponentCell(g)}
              </td>
              <td className="time-col">
                <span style={{ color: '#333', whiteSpace: 'nowrap' }}>
                  {g.time}
                </span>
              </td>
              <td className="score-col" style={g.playoff ? { color: '#333' } : undefined}>
                {scoreCell(g)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}

function App() {
  const [activeView, setActiveView] = useState('roster')

  return (
    <>
      <div className="header">
        <div className="header-top">
          <Logo />
          <div className="header-title">
            <h1>2025 Boys Soccer</h1>
            <p>Valor Christian High School</p>
          </div>
        </div>
      </div>

      <div id="team-varsity" className="panel active">
        <div className="view-tabs">
          <button
            className={`view-tab${activeView === 'roster' ? ' active' : ''}`}
            onClick={() => setActiveView('roster')}
          >
            Roster
          </button>
          <button
            className={`view-tab${activeView === 'schedule' ? ' active' : ''}`}
            onClick={() => setActiveView('schedule')}
          >
            Schedule
          </button>
        </div>
        <div id="varsity-roster" className={`panel${activeView === 'roster' ? ' active' : ''}`}>
          <Roster team={varsityData} />
        </div>
        <div id="varsity-schedule" className={`panel${activeView === 'schedule' ? ' active' : ''}`}>
          <Schedule team={varsityData} />
        </div>
      </div>
    </>
  )
}

export default App
