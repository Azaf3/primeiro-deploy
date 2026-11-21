import { Link } from 'react-router-dom'
import { useAuth } from '../lib/auth'
import { useProgress } from '../lib/progress'

export function Trilha() {
  const { user } = useAuth()
  const { completed, loading, error, track, githubChoice } = useProgress()
  const { lessons: allLessons, modules } = track

  const done = allLessons.filter((l) => completed.has(l.id)).length
  const pct = Math.round((done / allLessons.length) * 100)
  const next = allLessons.find((l) => !completed.has(l.id))

  if (loading) {
    return (
      <div className="trilha">
        <div className="skeleton tall" />
        <div className="skeleton" />
        <div className="skeleton" />
      </div>
    )
  }

  return (
    <div className="trilha">
      {error && (
        <p className="form-error" role="alert">
          {error}
        </p>
      )}

      <section className="progress-hero">
        <div>
          <p className="eyebrow">Olá, {user?.name}</p>
          <h1>{done === 0 ? 'Bora começar?' : next ? 'Continue de onde parou' : 'Trilha concluída!'}</h1>
          <p className="muted">
            {done} de {allLessons.length} aulas concluídas
          </p>
        </div>
        <div className="progress-side">
          <div
            className="progress-ring"
            style={{ ['--pct' as string]: `${pct}` }}
            role="img"
            aria-label={`${pct}% concluído`}
          >
            <span>{pct}%</span>
          </div>
          {next ? (
            <Link to={`/aula/${next.id}`} className="btn primary">
              {done === 0 ? 'Começar primeira aula' : `Continuar: ${next.title}`}
            </Link>
          ) : (
            <Link to="/certificado" className="btn primary">
              Ver meu certificado 🎓
            </Link>
          )}
        </div>
      </section>

      {!next && (
        <section className="trilha-cert">
          <p>
            <strong>Você concluiu a trilha inteira!</strong> Seu certificado está pronto.
          </p>
          <Link to="/certificado" className="btn primary">
            Ver meu certificado 🎓
          </Link>
        </section>
      )}

      {modules.map((m, mi) => {
        const mDone = m.lessons.filter((l) => completed.has(l.id)).length
        return (
          <section key={m.id} className="module">
            <header className="module-head">
              <span className="module-n">0{mi + 1}/</span>
              <div>
                <h2>{m.title}</h2>
                <p className="muted">{m.description}</p>
              </div>
              <span className="module-count">
                {mDone}/{m.lessons.length}
              </span>
            </header>
            <div className="bar" aria-hidden>
              <div className="bar-fill" style={{ width: `${(mDone / m.lessons.length) * 100}%` }} />
            </div>
            <ol className="lesson-cards">
              {m.lessons.map((l, li) => {
                const isDone = completed.has(l.id)
                const isNext = next?.id === l.id
                return (
                  <li key={l.id}>
                    <Link
                      to={`/aula/${l.id}`}
                      className={`lesson-card ${isDone ? 'done' : ''} ${isNext ? 'next' : ''}`}
                    >
                      <span className="lesson-check" aria-hidden>
                        {isDone ? '✓' : ''}
                      </span>
                      <span className="lesson-card-body">
                        <span className="lesson-idx">
                          {String(mi + 1).padStart(2, '0')}.{String(li + 1).padStart(2, '0')}
                        </span>
                        <strong>{l.title}</strong>
                        <span className="muted small">{l.summary}</span>
                      </span>
                      <span className="muted small nowrap">
                        {isDone ? <span className="sr-only">Concluída. </span> : null}
                        {l.minutes} min
                      </span>
                    </Link>
                  </li>
                )
              })}
            </ol>
          </section>
        )
      })}
      <p className="trilha-foot muted small">
        {githubChoice === 'nao' ? 'Sua trilha inclui a aula extra de GitHub.' : 'Sua trilha não inclui a aula extra de GitHub.'}{' '}
        <Link to="/comecar">Mudar resposta</Link>
      </p>
    </div>
  )
}
