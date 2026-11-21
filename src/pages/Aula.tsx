import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { allLessons, findLesson, requiredChecks } from '../content'
import { BlockView } from '../components/Blocks'
import { useProgress } from '../lib/progress'
import { useAuth } from '../lib/auth'
import { readJSON, writeJSON } from '../lib/storage'
import { NotFound } from './NotFound'

export function Aula() {
  const { id = '' } = useParams()
  const lesson = findLesson(id)
  const { user } = useAuth()
  const { completed, markComplete, markIncomplete } = useProgress()
  const checksKey = `pd:checks:${user?.id ?? 'anon'}:${id}`
  const [passed, setPassed] = useState<Set<string>>(() => new Set(readJSON<string[]>(checksKey, [])))
  const [saving, setSaving] = useState(false)
  const [saveError, setSaveError] = useState<string | null>(null)

  // Ao trocar de aula, recarrega os testes já passados e volta pro topo
  useEffect(() => {
    setPassed(new Set(readJSON<string[]>(checksKey, [])))
    setSaveError(null)
    window.scrollTo({ top: 0 })
  }, [checksKey])

  if (!lesson) return <NotFound />

  const isDone = completed.has(lesson.id)
  const required = requiredChecks(lesson)
  const effectivePassed = isDone ? new Set(required) : passed
  const remaining = required.filter((c) => !effectivePassed.has(c)).length
  const prev = allLessons[lesson.index - 1]
  const next = allLessons[lesson.index + 1]

  function onPass(checkId: string) {
    setPassed((prevSet) => {
      const nextSet = new Set(prevSet).add(checkId)
      writeJSON(checksKey, [...nextSet])
      return nextSet
    })
  }

  async function toggleDone() {
    setSaving(true)
    setSaveError(null)
    try {
      if (isDone) await markIncomplete(lesson!.id)
      else await markComplete(lesson!.id)
    } catch (e) {
      setSaveError(e instanceof Error ? e.message : 'Não foi possível salvar.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <article className="aula">
      <nav className="breadcrumb" aria-label="Você está em">
        <Link to="/trilha">Trilha</Link>
        <span aria-hidden>/</span>
        <span>{lesson.moduleTitle}</span>
      </nav>

      <header className="aula-head">
        <p className="eyebrow">
          Aula {lesson.index + 1} de {allLessons.length} · {lesson.minutes} min
        </p>
        <h1>{lesson.title}</h1>
        <p className="lead">{lesson.summary}</p>
      </header>

      <div className="aula-body">
        {lesson.blocks.map((b, i) => (
          <BlockView key={`${lesson.id}-${i}`} block={b} passed={effectivePassed} onPass={onPass} />
        ))}
      </div>

      <section className={`complete-box ${isDone ? 'done' : ''}`}>
        {isDone ? (
          <p>
            <strong>Aula concluída.</strong> Seu progresso está salvo.
          </p>
        ) : remaining > 0 ? (
          <p>
            Faça {remaining === 1 ? 'o teste' : `os ${remaining} testes/exercícios`} acima pra concluir esta aula.
          </p>
        ) : (
          <p>Tudo certo por aqui. Marque como concluída pra salvar seu progresso.</p>
        )}
        <div className="row">
          <button
            className={`btn ${isDone ? 'ghost' : 'primary'}`}
            onClick={toggleDone}
            disabled={saving || (!isDone && remaining > 0)}
          >
            {saving ? 'Salvando...' : isDone ? 'Desmarcar conclusão' : 'Concluir aula'}
          </button>
          {saveError && (
            <span className="field-error" role="alert">
              {saveError}
            </span>
          )}
        </div>
      </section>

      <nav className="pager" aria-label="Navegação entre aulas">
        {prev ? (
          <Link to={`/aula/${prev.id}`} className="pager-link">
            <span className="muted small">Anterior</span>
            {prev.title}
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link to={`/aula/${next.id}`} className="pager-link right">
            <span className="muted small">Próxima</span>
            {next.title}
          </Link>
        ) : (
          <Link to="/trilha" className="pager-link right">
            <span className="muted small">Fim da trilha</span>
            Voltar pra trilha
          </Link>
        )}
      </nav>
    </article>
  )
}
