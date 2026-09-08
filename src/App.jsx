import { useState } from 'react'
import varsityData from '../data/varsity.json'
import './App.css'

function Logo() {
  return (
    <img
      className="logo"
      src="/VALOR_V_SWOOP.png"
      alt="Valor"
    />
  )
}

function Coaches({ coaches }) {
  return (
    <div className="coaches-bar">
      {(coaches ?? []).map((c) => (
        <div className="coach-item" key={`${c.role}-${c.name}`}>
          <strong>{c.role}</strong>
          {c.name}
        </div>
      ))}
    </div>
  )
}

function Roster({ team }) {
  return (
    <table className="roster-table">
      <tbody>
        {(team.roster ?? []).map((p, i) => (
          <tr key={`${p.number}-${p.name}-${i}`}>
            <td className="num">{p.number}</td>
            <td className="player-name">
              {p.name} <span className="year-badge">{p.year}</span>
            </td>
            <td className="parents">{p.parents}</td>
          </tr>
        ))}
      </tbody>
    </table>
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
    <span style={{ color: '#111111', fontSize: '0.8rem' }}>—</span>
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
              <td className="date-col" style={g.playoff ? { color: '#111111' } : undefined}>
                {g.date}
              </td>
              <td className="day-col">{g.day}</td>
              <td
                className="opp-col"
                style={g.playoff ? { color: '#111111' } : undefined}
              >
                {opponentCell(g)}
              </td>
              <td className="time-col">
                <span style={{ color: '#111111', whiteSpace: 'nowrap' }}>
                  {g.time}
                </span>
              </td>
              <td className="score-col" style={g.playoff ? { color: '#111111' } : undefined}>
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
        <Coaches coaches={varsityData.coaches} />
      </div>
    </>
  )
}

export default App
