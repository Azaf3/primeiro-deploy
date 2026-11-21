import { useEffect, useRef, useState, type KeyboardEvent } from 'react'
import type { ExerciseTest } from '../content/types'
import { runExercise, type RunResult } from '../lib/runner'
import { readJSON, writeJSON } from '../lib/storage'
import { useAuth } from '../lib/auth'
import { Inline } from './Inline'
import { Highlight } from './Highlight'

type Props = {
  id: string
  title: string
  instructions: string
  starter: string
  tests: ExerciseTest[]
  hint?: string
  solution?: string
  alreadyDone: boolean
  onPass: () => void
}

export function CodeExercise({ id, title, instructions, starter, tests, hint, solution, alreadyDone, onPass }: Props) {
  const { user } = useAuth()
  const draftKey = `pd:draft:${user?.id ?? 'anon'}:${id}`
  const [code, setCode] = useState(() => readJSON<string>(draftKey, starter))
  const [result, setResult] = useState<RunResult | null>(null)
  const [running, setRunning] = useState(false)
  const [showHint, setShowHint] = useState(false)
  const [showSolution, setShowSolution] = useState(false)
  const [confirmingReset, setConfirmingReset] = useState(false)
  const textRef = useRef<HTMLTextAreaElement>(null)
  const hlRef = useRef<HTMLPreElement>(null)

  // Salva rascunho com um pequeno atraso
  useEffect(() => {
    const t = setTimeout(() => writeJSON(draftKey, code), 400)
    return () => clearTimeout(t)
  }, [code, draftKey])

  async function run() {
    setRunning(true)
    const r = await runExercise(code, tests)
    setResult(r)
    setRunning(false)
    if (r.status === 'ok' && r.results.every((t) => t.passed)) onPass()
  }

  function onKeyDown(e: KeyboardEvent<HTMLTextAreaElement>) {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault()
      run()
      return
    }
    // Tab insere 2 espaços (Esc + Tab continua navegando, padrão de acessibilidade)
    if (e.key === 'Tab' && !e.shiftKey) {
      e.preventDefault()
      const el = e.currentTarget
      const { selectionStart: s, selectionEnd: end } = el
      const next = code.slice(0, s) + '  ' + code.slice(end)
      setCode(next)
      requestAnimationFrame(() => {
        el.selectionStart = el.selectionEnd = s + 2
      })
    }
  }

  const passedCount = result?.status === 'ok' ? result.results.filter((r) => r.passed).length : 0
  const allPassed = result?.status === 'ok' && passedCount === tests.length

  return (
    <section className="block exercise">
      <div className="block-label">
        Exercício de código {alreadyDone && <span className="badge ok">feito</span>}
      </div>
      <h3 className="exercise-title">{title}</h3>
      <p>
        <Inline text={instructions} />
      </p>

      <label className="sr-only" htmlFor={`code-${id}`}>
        Editor de código
      </label>
      <div className="editor-wrap">
        <div className="editor-bar" aria-hidden>
          <span className="win-dots">
            <i />
            <i />
            <i />
          </span>
          <span>{id}.js</span>
        </div>
        <div className="editor-stack">
          <pre className="editor-hl" ref={hlRef} aria-hidden>
            <Highlight code={code + '\n'} />
          </pre>
          <textarea
        id={`code-${id}`}
        wrap="off"
        onScroll={(e) => {
          if (hlRef.current) {
            hlRef.current.scrollTop = e.currentTarget.scrollTop
            hlRef.current.scrollLeft = e.currentTarget.scrollLeft
          }
        }}
        ref={textRef}
        className="editor"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        onKeyDown={onKeyDown}
        spellCheck={false}
        autoCapitalize="off"
        autoComplete="off"
        autoCorrect="off"
        rows={Math.max(6, code.split('\n').length + 1)}
          />
        </div>
      </div>

      <div className="row">
        <button className="btn primary" onClick={run} disabled={running}>
          {running ? 'Rodando...' : 'Rodar testes'}
        </button>
        <span className="muted small kbd-hint">Ctrl + Enter</span>
        <span className="spacer" />
        {hint && (
          <button className="btn ghost" onClick={() => setShowHint((v) => !v)}>
            {showHint ? 'Esconder dica' : 'Dica'}
          </button>
        )}
        {confirmingReset ? (
          <>
            <span className="small muted">Apagar seu código?</span>
            <button
              className="btn small"
              onClick={() => {
                setCode(starter)
                setResult(null)
                setConfirmingReset(false)
              }}
            >
              Sim, recomeçar
            </button>
            <button className="btn ghost small" onClick={() => setConfirmingReset(false)}>
              Cancelar
            </button>
          </>
        ) : (
          <button className="btn ghost" onClick={() => setConfirmingReset(true)}>
            Recomeçar
          </button>
        )}
      </div>

      {showHint && hint && (
        <p className="tip info">
          <Inline text={hint} />
        </p>
      )}

      {result && (
        <div className="results" role="status" aria-live="polite">
          {result.status === 'timeout' && (
            <p className="result-msg wrong">
              Seu código demorou demais (mais de 2 segundos). Provavelmente tem um loop que nunca termina.
            </p>
          )}
          {result.status === 'error' && (
            <p className="result-msg wrong">
              Erro ao rodar: <code>{result.message}</code>
            </p>
          )}
          {result.status === 'ok' && (
            <>
              <p className={`result-msg ${allPassed ? 'right' : ''}`}>
                {allPassed ? 'Todos os testes passaram!' : `${passedCount} de ${tests.length} testes passaram.`}
              </p>
              <ul className="test-list">
                {result.results.map((r, i) => (
                  <li key={i} className={r.passed ? 'pass' : 'fail'}>
                    <span className="test-icon" aria-hidden>
                      {r.passed ? '✓' : '✕'}
                    </span>
                    <span>
                      {r.desc}
                      {!r.passed && (
                        <span className="test-detail">
                          {r.error ? (
                            <>Erro: {r.error}</>
                          ) : (
                            <>
                              Esperado <code>{r.expected}</code>, veio <code>{r.got}</code>
                            </>
                          )}
                        </span>
                      )}
                    </span>
                  </li>
                ))}
              </ul>
            </>
          )}
          {result.logs.length > 0 && (
            <div className="console">
              <div className="console-label">console.log</div>
              <pre>{result.logs.join('\n')}</pre>
            </div>
          )}
        </div>
      )}

      {solution && (result || alreadyDone) && (
        <div className="solution">
          <button className="link-btn" onClick={() => setShowSolution((v) => !v)}>
            {showSolution ? 'Esconder solução' : 'Ver uma solução possível'}
          </button>
          {showSolution && (
            <pre className="code-block">
              <Highlight code={solution} />
            </pre>
          )}
        </div>
      )}
    </section>
  )
}
